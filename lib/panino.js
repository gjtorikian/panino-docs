/**
 * class Panino
 *
 * Handles documentation tree.
 **/


'use strict';


// Node < 0.8 shims
if (!require('fs').exists) {
  require('fs').exists = require('path').exists;
}
if (!require('fs').existsSync) {
  require('fs').existsSync = require('path').existsSync;
}


// stdlib
var path = require('path');
var fs = require('fs');
var util = require('util');

// 3rd-party
var _     = require('underscore');
var async = require('async');
var wrench = require("wrench");
// internal
var template    = require('./panino/common').template;
var renderers   = require('./panino/renderers');
var parsers     = require('./panino/parsers');

var Panino = module.exports = {};

// parse all files and prepare a "raw list of nodes
function parse_files(files, options, callback) {
  var nodes = {
    // root section node
    '': {
      id: '',
      type: 'section',
      children: [],
      description: '',
      short_description: '',
      href: '#',
      root: true,
      file: '',
      line: 0
    }
  };

  async.forEachSeries(files, function (file, next_file) {
    var fn = parsers[path.extname(file)];

    if (!fn) {
      next_file();
      return;
    }

    console.info('Parsing file: ' + file);
    fn(file, options, function (err, file_nodes) {
      // TODO:  fail on name clash here as well -- as we might get name clash
      //        from different parsers, or even different files
      _.extend(nodes, file_nodes);
      next_file(err);
    });
  }, function (err) {
    callback(err, nodes);
  });
}


function build_tree(files, nodes, options) {
  var tree, parted, sections, children;
  
  //
  // for each element with undefined section try to guess the section
  // E.g. for ".Ajax.Updater" we try to find "SECTION.Ajax" element.
  // If found, rename ".Ajax.Updater" to "SECTION.Ajax.Updater"
  //

  // prepare nodes of sections
  // N.B. starting with 1 we skip "" section
  parted = _.keys(nodes).sort().slice(1).map(function (id) {
    return {id: id, parted: id.split(/[.#@]/), node: nodes[id]};
  });

  _.each(parted, function (data) {
    var found;

    // leave only ids without defined section
    if ('' !== data.parted[0]) {
      return;
    }

    found = _.find(parted, function (other) {
      return !!other.parted[0] && other.parted[1] === data.parted[1];
    });

    if (found) {
      delete nodes[data.id];

      data.node.id    = found.parted[0] + data.id;
      data.parted[0]  = found.parted[0];

      nodes[data.node.id] = data.node;
    }
  });

  // sort elements in case-insensitive manner
  tree = {};

  sections = _.keys(nodes).sort(function (a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a === b ? 0 : a < b ? -1 : 1;
  });

  sections.forEach(function (id) {
    tree[id] = nodes[id];
  });

  // rebuild the tree from the end to beginning.
  // N.B. since the nodes we iterate over is sorted, we can determine precisely
  // the parent of any element.
  _.each(sections.slice(0).reverse(), function (id) {
    var idx, parent;

    // parent name is this element's name without portion after
    // the last '.' for class member, last '#' for instance member,
    // or first '@' for events
    // first check for event, because event name can contain '.', '#' and '@'
    idx = id.indexOf('@');

    if (idx === -1) {
      idx = Math.max(id.lastIndexOf('.'), id.lastIndexOf('#'));
    }

    // get parent element
    parent = tree[id.substring(0, idx)];

    // no '.' or '#' or '@' found or no parent? -- top level section. skip it
    if (-1 === idx || !parent) {
      return;
    }

    // parent element found. move this element to parent's children nodes,
    // maintaing order
    parent.children.unshift(tree[id]);

    delete tree[id];
  });

  // cleanup nodes, reassign right ids after we resolved
  // to which sections every element belongs
  _.each(nodes, function (node, id) {
    delete nodes[id];

    // compose new id
    node.id = id.replace(/^[^.]*\./, '');

    // First check for event, because event name can contain '.' and '#'
    var idx = node.id.indexOf('@'); // get position of @event start

    // Otherwise get property/method delimiter position
    if (idx === -1) {
      idx = Math.max(node.id.lastIndexOf('.'), node.id.lastIndexOf('#'));
    }

    if (-1 === idx) {
      node.name =  node.id;
    } else {
      node.name = node.id.substring(idx + 1);
      node.name_prefix = node.id.substring(0, idx + 1);
    }

    // sections have lowercased ids, to not clash with other elements
    if ('section' === node.type) {
      node.id = node.id.toLowerCase();
    }

    // prototype members have different paths
    node.path = node.id.replace(/#/g, '.prototype.');

    // events have different paths as well, but only first '@' separates event name
    node.path = node.path.replace(/@/, '.event.');

    delete node.section;

    // prune sections from nodes
    if ('section' !== node.type) {
      nodes[node.id] = node;
    }

    // sometimes, members can be defined across other files
    // put them in the right place in the full tree
    if (node.extension === true) {
        var srcId = node.id.slice(0,  0 - node.name.length - 1); // is this safe to assume?
        // HACK: some maths is wrong somewhere and I continue to get an invalid object, unless I add "."
        var srcObj = nodes[srcId] || nodes["." + srcId]; 
        
        if (srcObj !== undefined) {
            node.originalFile = node.file;
            node.file = srcObj.file;
        }
    }
    else if (options.splitByClass) {
      node.originalFile = node.file;

      if (node.type === "class")
        node.file =  node["name"];
      else if (node.type !=='section') {
        node.file = node["name_prefix"].slice(0, -1);
      }
    }
  });

  // assign aliases, subclasses, constructors
  // correct method types (class or entity)
  _.each(nodes, function (node, id) {
    function convertToHierarchy(inheritArray, inheritedMembers)
    {
        // Build the node structure
        var rootNode = [];
        _.each(inheritArray, function(path) {
            rootNode.push(buildNodeRecursive(rootNode, path, inheritedMembers));
        });

        return rootNode;
    }

    function addInheritedFrom(id, children) {
      // construct children list, indicating where they're from (easier for Jade template)
      return _.map(children, function(c) {
        return _.extend(c, {inheritedFrom: id});
      });
    }

    function buildNodeRecursive(node, path, inheritedMembers)
    {
        // keep going up
        if (nodes[path] !== undefined && nodes[path].inherits) {
          var h = {};
          h.id = path;

          inheritedMembers.push({id: path, children: addInheritedFrom(path, nodes[path].children)});
          h.parents = convertToHierarchy(nodes[path].inherits, inheritedMembers);
          return h;
        }
        // as far as she goes--get the kids!
        else {
          var h = {};
          h.id = path;
          if (nodes[path] === undefined) {
            console.error("ERROR".red + ": you're trying to inherit from an object which does not exist:", path);
          }
          else {
            h.children =  addInheritedFrom(path, nodes[path].children);
          }
          
          inheritedMembers.push(h);

          delete h.children;
          return h;
        }
    }

    // aliases
    if (node.alias_of && nodes[node.alias_of]) {
      nodes[node.alias_of].aliases.push(node.id);
    }

    if (node.inheritdoc) {
      // copy over everything from the source, but keep some items
      node = _.extend(node, nodes[node.inheritdoc], {id: node.id, line: node.line, file: node.file});
    }

    var outFile = node.file.toLowerCase();
    node.outFile = path.basename(node.file, path.extname(outFile));

    if (options.splitByClass)
      node.outFile = outFile;
    if (options.suffix)
      node.outFile += options.suffix;
    if (options.prefix)
      node.outFile = options.prefix + outFile;

    // classes hierarchy
    if ('class' === node.type) {
      node.outFile += ".html";
      //if (d.superclass) console.log('SUPER', id, d.superclass)
      if (node.superclass && nodes[node.superclass]) {
        nodes[node.superclass].subclasses.push(node.id);
        nodes[node.superclass].children.push(nodes[node.id]); // HACK: find out why.
      }

      // inheritance hierarchy (for APF)
      if (node.inherits) {
        node.inheritedMembers = [];
        node.hierarchy = convertToHierarchy(_.uniq(node.inherits), node.inheritedMembers);

        var mergedKids = [];
        _.each(node.inheritedMembers, function(i) {
          mergedKids = _.union(mergedKids, node.children, i.children);
        });

        if (mergedKids.length > 0) {
          node.children = _.sortBy(_.compact(mergedKids), "name");
        }

        delete node.inheritedMembers;
      }
        
      return;
    }

    node.outFile = node.outFile + ".html#" + node.path;
    
    if ('constructor' === node.type) {
      node.id = 'new ' + node.id.replace(/\.new$/, '');
      return;
    }

    // methods and properties
    if ('method' === node.type || 'property' === node.type) {
      // FIXME: shouldn't it be assigned by parser?

      if (node.id.match(/^\$/)) {
        node.type = 'utility';
        return;
      }

      // first check for event, because event name can contain '.' and '#'
      if (node.id.indexOf('@') >= 0) {
        node.type = 'event';
        return;
      }

      if (node.id.indexOf('#') >= 0) {
        node.type = 'instance ' + node.type;
        return;
      }

      if (node.id.indexOf('.') >= 0) {
        node.type = 'class ' + node.type;
        return;
      }
    }
  });

  // tree is hash of sections.
  // convert sections to uniform children array of tree top level
  children = [];

  _.each(tree, function (node, id) {
    if (id === '') {
      children = children.concat(node.children);
    } else {
      children.push(node);
    }

    delete tree[id];
  });

  // basically, we have similar sounding namespaces--apf.Class, apf.crypto
  // but we want these apf.* items into their own segments, not grouped as subclasses
  // under apf
  if (options.splitFromNS) {
    var grandchildren = children[0]; // TODO: not sure if this is always true

    children[0].children = _.filter(grandchildren.children, function (c) {
      if (c.type === "class") {
        children.push(c);
        return false;
      }
      return true;
    });
  }
  
  tree.children = children;

  return {files: files, list: nodes, tree: tree};
}

/**
 *  Panino.parse(files, options, callback) -> Void
 *  - files (Array): Files to be parsed
 *  - options (Object): Parser options
 *  - callback (Function): Notifies parsing is finished with `callback(err, ast)`
 *
 *  Execute `name` parser against `files` with given options.
 *
 *
 *  ##### Options
 *
 *  - **linkFormat**: Format for link to source file. This can have variables:
 *    - `{file}`: Current file
 *    - `{line}`: Current line
 *    - `{package.*}`: Any package.json variable
 **/
Panino.parse = function parse(paths, buildOptions, callback) {

  var options = Panino.cli.parseArgs(paths);

  for (var key in buildOptions) {
    if (buildOptions.hasOwnProperty(key)) {
      options[key] = buildOptions[key];
    }
  }

  if (options.parseType == "jsd")
    Panino.use(require(__dirname + '/panino/plugins/parsers/jsd_parser'));
  else 
    Panino.use(require(__dirname + '/panino/plugins/parsers/pdoc_parser'));
  
  Panino.use(require(__dirname + '/panino/plugins/parsers/markdown'));

  //
  // Process aliases
  //

  options.aliases.forEach(function (pair) {
    Panino.extensionAlias.apply(null, pair.split(':'));
  });

  Panino.cli.findFiles(options.paths, options.exclude, function(err, files) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    parse_files(files, options, function (err, nodes) {
      callback(err, build_tree(files, nodes, options));
    });
  });
};

/**
 *  Panino.render(name, ast, buildOptions, callback) -> Void
 *  - name (String): Renderer name
 *  - ast (Object): Parsed AST (should consist of `list` and `tree`)
 *  - buildOptions (Object): Renderer options
 *  - callback (Function): Notifies rendering is finished with `callback(err)`
 *
 *  Execute `name` renderer for `ast` with given options.
 **/
Panino.render = function render(name, ast, buildOptions, callback) {
  if (!renderers[name]) {
    callback("Unknown renderer: " + name);
    return;
  }

  var options = Panino.cli.parseArgs(["blank"]);

  for (var key in buildOptions) {
    if (buildOptions.hasOwnProperty(key)) {
      options[key] = buildOptions[key];
    }
  }

  renderers[name](ast, options, callback);
};


/**
 *  Panino.cli -> cli
 **/
Panino.cli = require('./panino/cli');

/**
 *  Panino.VERSION -> String
 *
 *  Panino version.
 **/
Panino.VERSION = require('./panino/version');


/**
 *  Panino.use(plugin) -> Void
 *  - plugin (Function): Infection `plugin(PaninoClass)`
 *
 *  Runs given `plugin` against Panino base class.
 *
 *
 *  ##### Examples
 *
 *      Panino.use(require('my-renderer'));
 **/
Panino.use = function use(plugin) {
  plugin(this);
};


/**
 *  Panino.registerRenderer(name, func) -> Void
 *  - name (String): Name of the renderer, e.g. `'html'`
 *  - func (Function): Renderer function `func(ast, options, callback)`
 *
 *  Registers given function as `name` renderer.
 **/
Panino.registerRenderer = function (name, func) {
  renderers[name] = func;
};


/**
 *  Panino.registerParser(extension, func) -> Void
 *  - extension (String): Extension suitable for the parser, e.g. `'js'`
 *  - func (Function): Parser function `func(source, options, callback)`
 *
 *  Registers given function as `name` renderer.
 **/
Panino.registerParser = function (extension, func) {
  extension = path.extname('name.' + extension);

  Object.defineProperty(parsers, extension, {
    get: function () { return func; },
    configurable: true
  });
};

Panino.setParsingRules = function(options, parser) {
  // set default parse rules
  // TODO: these seem complicated to set up...

  var failed = false, parseOptionsJSON = {};
  if (options.parseOptions !== undefined && options.parseOptions !== null) {
      try {
          parseOptionsJSON = JSON.parse(fs.readFileSync(options.parseOptions));
      }
      catch (e) {
          console.error("Trouble parsing " + options.parseOptions + "!\n\n" + e + "\n\nI'm not adding these...");
          failed = true;
      }
  }
  else if (options.parseOptions === undefined || failed) {
      parseOptionsJSON = JSON.parse(fs.readFileSync(__dirname + "/panino/plugins/parsers/javascript/pdoc/defaultParseRules.json"));
  }

  if (parseOptionsJSON.useAsterisk === true || parseOptionsJSON.useDash === true || (parseOptionsJSON.useAsterisk === undefined && parseOptionsJSON.useDash === undefined)) {
      parser.yy.useDash = true;
      parser.yy.useAsterisk = false;
  }
  else {
      parser.yy.useDash = false;
      parser.yy.useAsterisk = true;
  }

  if (parseOptionsJSON.useArrow === true || parseOptionsJSON.useComma === false || (parseOptionsJSON.useArrow === undefined && parseOptionsJSON.useComma === undefined)) {
      parser.yy.useArrow = true;
      parser.yy.useComma = false;

  }
  else {
      parser.yy.useArrow = false;
      parser.yy.useComma = true;

  }                 

  if (parseOptionsJSON.useParentheses === true || parseOptionsJSON.useCurlies === false || (parseOptionsJSON.useParentheses === undefined && parseOptionsJSON.useCurlies === undefined)) {
      parser.yy.useParentheses = true;
      parser.yy.useCurlies = false;
  }
  else {
      parser.yy.useParentheses = false;
      parser.yy.useCurlies = true;
  }

  return parser;
}

/**
 *  Panino.extensionAlias(alias, extension) -> Void
 *  - alias (String): Extension as for the parser, e.g. `'cc'`
 *  - extension (String): Extension as for the parser, e.g. `'js'`
 *
 *  Registers `alias` of the `extension` parser.
 *
 *
 *  ##### Example
 *
 *  Parse all `*.cc` files with parser registered for `*.js`
 *
 *  ``` javascript
 *  panino.extensionAlias('cc', 'js');
 *  ```
 *
 *
 *  ##### See Also
 *
 *  - [[Panino.registerParser]]
 **/
Panino.extensionAlias = function (alias, extension) {
  alias     = path.extname('name.' + alias);
  extension = path.extname('name.' + extension);

  Object.defineProperty(parsers, alias, {
    get: function () { return parsers[extension]; },
    configurable: true
  });
};


//
// require base plugins
//
Panino.use(require(__dirname + '/panino/plugins/renderers/html'));
Panino.use(require(__dirname + '/panino/plugins/renderers/json'));
Panino.use(require(__dirname + '/panino/plugins/renderers/c9ac'));