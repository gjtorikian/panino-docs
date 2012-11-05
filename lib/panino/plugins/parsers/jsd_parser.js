/** internal, section: Plugins
 *  Parsers.panino(Panino) -> Void
 *
 *  Registers Panino parser as `panino`.
 *
 *
 *  ##### Example
 *
 *      Panino.parse(files, options, function (err, ast) {
 *        // ...
 *      });
 **/


'use strict';


// stdlib
var fs = require('fs');
var util = require('util');

// 3rd-party
var _ = require('underscore');
var esprima = require('esprima');
var functionExtractor = require("function-extractor");

// internal
var Panino = require(__dirname + '/../../../panino');
var JSParser = require("./javascript/jsd/js_parser");
var ASTEsprima = require("./javascript/jsd/ast_esprima");
var DocParser = require("./javascript/jsd/doc_parser");
var DocType = require("./javascript/jsd/doc_type");
var DocExpander = require("./javascript/jsd/doc_expander");
var DocAst = require("./javascript/jsd/doc_ast");
var Merger = require("./javascript/jsd/merger");

var doc_ast;

////////////////////////////////////////////////////////////////////////////////

function parse_javascript(file, options, callback) { 
  fs.readFile(file, 'utf8', function (err, source) {
    if (err) {
      callback(err);
      return;
    }
    process_jsd(source, file, options, callback);
  });
}

var process_jsd = function(source, file, options, callback) {
  var nodes = {}, remainingNodes, ast, docs, expanded, merged, classPrefix, list = {}, tree, parted, sections, children;
  doc_ast = new DocAst();

  // start parsing a la JSDuck
  //try {
  ast = esprima.parse(source, {comment: true, range: true, raw: true, loc: true});

  //var functions = functionExtractor.interpret(source, ast);

  docs = JSParser.parse(ast, source);
  
  docs = new ASTEsprima(docs, options).detect_all();

  merged = _.chain(docs).map(function(docset) {
    return expand(docset, options.customTags);
  }).flatten().map(function (docset) {
    return merge(docset, options.customTags);
  }).value();

  //} catch (err) {
  //  console.error("FATAL".red + ": problem parsing", file, err);
  //  callback(err);
  //  return;
  //}

  // various APF members are split across various files
  // so, apply members to whatever class is above them, unless they have
  // an "original_name" that indicates specifically where they go
  if (options.splitByClass) {
    while (merged.length > 0) {
      var classList = [merged.shift()];

      while (merged[0] && merged[0].tagname !== "class") {
        classList.push(merged.shift());
      }

      formatNodes(classList);
    }
  }
  else {
    formatNodes(merged);
  }
  // start formatting to match "classic" ndoc/panino style; if I were smarter I
  // would just do this above, during the parsing

  function formatNodes(merged) {
    // grab the class name out (if it exists)
    remainingNodes = _.reject(merged, function(i) {
      if (i["tagname"] === "class") {
        classPrefix = i["name"];
        nodes[classPrefix] = createBasicTranslation(classPrefix, "class", i, options);

        if (i["inherits"] !== undefined && i["inherits"].length > 0) 
          nodes[classPrefix]["inherits"] = i["inherits"];

        if (i["allowchild"] !== undefined) 
          nodes[classPrefix]["allowchild"] = i["allowchild"].doc;

        return true;
      }
    });

    // esprima parsing is good--too good! remove nodes that just don't have doc,
    // or, remove nodes that just contain "@todo" in the beginning
    remainingNodes = _.map(remainingNodes, function(n) {
      if (n["doc"] === undefined || /^@todo/i.test(n["doc"]))
        n.incomplete = true;

      return n;
    });

    remainingNodes = _.reject(remainingNodes, function(i) {
      var isEvent = i["tagname"] == "event";
      var isConstructor = i["tagname"] == "constructor";
      var joinChar = isEvent ? "@" : ".";

      if (classPrefix === undefined && options.globalNS) 
        classPrefix = options.globalNS;

      var memberName;
      if (new RegExp("^" + options.globalNS + joinChar + i["name"]).test(i["original_name"])) {
        memberName = [options.globalNS, i["name"]].join(joinChar);
      }
      else
        memberName = [classPrefix, i["name"]].join(joinChar);

      if (memberName.lastIndexOf(".") === memberName.length - 1 && i["inheritdoc"] === undefined) {
        console.error(i);    
        console.error("FATAL".red + ": this object doesn't have a proper name. Check that your comment is written correctly. Typically, his happens when: ");
        console.error("   * A statement above is missing a semicolon--including closing function tags--see this bug: " + "http://code.google.com/p/esprima/issues/detail?id=347&thanks=347&ts=1348621099".cyan);
        console.error("   * The line above a comment is a single line comment--see this bug: " + "https://github.com/senchalabs/jsduck/issues/247".cyan);
        process.exit(1)
      }
      
      if (isConstructor)
        memberName = classPrefix + ".new";
        
      if (i["tagname"] === "method" || i["tagname"] === "constructor" || isEvent) {
        nodes[memberName] = createBasicTranslation(memberName, i["tagname"], i, options);
        nodes[memberName]["signatures"] = [];
        var ret = {};

        // these next blocks don't yet handle alternate signatures...
        // but are written as if they will :)
        if (i["params"] !== undefined) {
            var sig = { "arguments": [] };
            nodes[memberName]["arguments"] = [];

            _.each(i["params"], function(p) {
              // construct the args object
              var args = {};
              args.name = p["name"];
              args.description = p["doc"];
              args.default_value = p["default"];

              args.types = [];

              // types could be multiple
              if (p["type"].indexOf("|") >= 0) {
                p["type"].split("|").forEach(function(t) {
                  args.types.push(trim(t));
                });
              }
              else if (p["type"].indexOf(",") >= 0) {
                console.warn("Warning".yellow + ": you're using ',' to separate types in " + memberName + ", use '|' instead.");
              }
              else {
                args.types.push(p["type"]);
              }

              args.optional = p["optional"];

              sig.arguments.push(args);

              // there are args on "signatures" and a separate arguments property
              nodes[memberName]["arguments"].push(args);
            });
        }

        if (i["return"] !== undefined && i["return"].type !== undefined) {
          if (i["return"].type.indexOf("[") == 0) { // TODO: probably not best to do this here
            ret.type = i["return"].type.substr(1, i["return"].type.length - 2);
            ret.isArray = true;
          }
          else {
            ret.type = i["return"].type;
          }

          ret.description = i["return"].doc;

          // there are returns on "signatures" and a separate returns property
          //nodes[memberName]["returns"].push(ret);
        }

        var pushedObj = { };

        if (_.size(nodes[memberName]["arguments"]) > 0)    
          pushedObj["arguments"] = nodes[memberName]["arguments"];

        if (_.size(ret) > 0 && ret.type !== "undefined")
          pushedObj["returns"] = [ret];

        nodes[memberName]["signatures"].push(pushedObj);

        if (isEvent) {
          if (i["cancelable"] !== undefined)
            nodes[memberName]["cancelable"] = i["cancelable"];
          if (i["bubbles"] !== undefined)
            nodes[memberName]["bubbles"] = i["bubbles"];
        }
        return true;
      }

      else if (i["tagname"] === "property") {
        nodes[memberName] = createBasicTranslation(memberName, "property", i, options);
        nodes[memberName]["signatures"] = [ { arguments: undefined, returns: [ { type: i["type"], default_value: i["default"] } ] } ];
        return true;
      }

      else if (i["tagname"] === "attribute") {
        nodes[memberName] = createBasicTranslation(memberName, "attribute", i, options);

        var returnsArray = [];

        if (i["default"] !== undefined && i["default"] !== null)
          nodes[memberName]["defaults"] = i["default"];

        if (i["type"]) {
          var types = i["type"].split("|");

          _.each(types, function(t) {
            returnsArray.push({type: trim(t)});
          });
        }

        nodes[memberName]["signatures"] = [ { arguments: undefined, returns: returnsArray } ];
        return true;
      }

      else if (i["tagname"] === "binding") {
        nodes[memberName] = createBasicTranslation(memberName, "binding", i, options);
        nodes[memberName]["signatures"] = [ { arguments: undefined, returns: [ { type: i["type"] } ] } ];
        return true;
      }

      else {
        console.warn("Warning".yellow + ": I don't know what " + i["tagname"] + " is supposed to do in " + file);
        return true;
      }
    });

    // do pre-distribute early work
    _.each(nodes, function (node, id) {
      var clone;

      // assign hierarchy helpers
      node.aliases  = [];
      node.children = [];

      // set source file of the node
      node.file = file;

      if ('class' === node.type) {
        node.subclasses = [];
      }

      // collect sections
      if ('section' === node.type) {
        list[node.id] = node;
        return;
      }

      // elements with undefined section get '' section,
      // and will be resolved later, when we'll have full
      // element list
      list[(node.section || '') + '.' + node.id] = node;

      // bound methods produce two methods with the same description but different signatures
      // E.g. Element.foo(@element, a, b) becomes
      // Element.foo(element, a, b) and Element#foo(a, b)
      if ('method' === node.type && node.bound) {
        clone = _.clone(node);
        clone.id = node.id.replace(/(.+)\.(.+)$/, '$1#$2');

        // link to methods
        node.bound = clone.id;
        clone.bound = node.id;

        // insert bound method clone
        list[(node.section || '') + '.' + clone.id] = clone;
      }
    });
  }
  // TODO: section.related_to should mark related element as belonging to the section
  //_.each(list, function (node, id) {
  //  var ref_id = '.' + node.related_to, ref;
  //  if ('section' === node.type && node.related_to && list[ref_id]) {
  //    ref = list[ref_id];
  //    ref.id = node.id + '.' + node.related_to;
  //    delete list[ref_id];
  //    list[ref.id] = ref;
  //  }
  //});

  callback(null, list);
}

// Parses the docs, detects tagname and expands class docset
function expand(docset, customTags) {
    docset["comment"] = DocParser.parse(docset["comment"], customTags);
    docset["tagname"] = DocType.detect(docset["comment"], docset["code"]);

    if (docset["tagname"] == "class")
      return DocExpander.expand(docset);
    else
      return docset;
}

// Merges comment and code parts of docset
function merge(docset, customTags) {
  doc_ast.linenr = docset["linenr"];

  // useful for applying global NS items to the proper NS
  docset["original_name"] = docset["code"].name;
  docset["comment"] = doc_ast.detect(docset["tagname"], docset["comment"], customTags);
  
  return Merger.merge(docset);
}

// creates types for nodes that can be anything
function createBasicTranslation(memberName, type, i, options) {
  var node = {};

  node["id"] = memberName;
  node["type"] = type;

  if (i["inheritdoc"] !== undefined) {
    node["inheritdoc"] = i["inheritdoc"].src;
  }
  else if (i["doc"] !== undefined) {
    node["description"] = i["doc"];
    // short description lasts until the first empty line
    node["short_description"] = node["description"].replace(/\n\n[\s\S]*$/, '\n');
  }
  else {
    node["incomplete"] = true;
  }

  node["line"] = i["linenr"];

  if (i["private"] !== undefined)
    node["private"] = i["private"];

  if (i["experimental"] !== undefined)
    node["experimental"] = i["experimental"];

  if (i["chainable"] !== undefined)
    node["chainable"] = i["chainable"];

  if (i["see"] !== undefined)
    node["related_to"] = i["see"].name;

  if (i["author"] !== undefined && i["author"].length > 0)
    node["author"] = i["author"].doc;
  
  if (i["version"] !== undefined)
    node["version"] = i["version"].doc;
  
  if (i["since"] !== undefined)
    node["since"] = i["since"].doc;

  if (i["author"] !== undefined)
    node["author"] = i["author"];

  if (i["related"] !== undefined)
    node["related"] = i["related"].name;

  if (options.customTags) {
    _.each(options.customTags, function(tag) {
      if (i[tag] !== undefined)
        node[tag] = i[tag];
    });
  }

  return node;
}

function trim (str) {
  return str.replace(/^ +| +$/g, '');
}

////////////////////////////////////////////////////////////////////////////////


module.exports = function (PaninoArg, args) {
  PaninoArg.registerParser('.js', parse_javascript);
};
