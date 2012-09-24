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

// internal
var Panino = require(__dirname + '/../../../panino');
var JSParser = require("./javascript/jsddoc/js_parser");
var ASTEsprima = require("./javascript/jsddoc/ast_esprima");
var DocParser = require("./javascript/jsddoc/doc_parser");
var DocType = require("./javascript/jsddoc/doc_type");
var DocExpander = require("./javascript/jsddoc/doc_expander");
var DocAst = require("./javascript/jsddoc/doc_ast");
var Merger = require("./javascript/jsddoc/merger");

var doc_ast;

////////////////////////////////////////////////////////////////////////////////

function parse_javascript(file, options, callback) { 
  fs.readFile(file, 'utf8', function (err, source) {
    if (err) {
      callback(err);
      return;
    }
    process_jsddoc(source, file, options, callback);
  });
}

var process_jsddoc = function(source, file, options, callback) {
  var nodes = {}, remainingNodes, ast, docs, expanded, merged, classPrefix, list = {}, tree, parted, sections, children;
  doc_ast = new DocAst();

  // start parsing a la JSDuck
  try {
    ast = esprima.parse(source, {comment: true, range: true, raw: true});
  
    docs = JSParser.parse(ast, source);
    docs = new ASTEsprima(docs, options).detect_all();

    merged = _.chain(docs).map(function(docset) {
      return expand(docset);
    }).flatten().map(function (docset) {
      return merge(docset);
    }).value();

  } catch (err) {
    callback(err);
    return;
  }

  // start formatting to match "classic" ndoc/panino style; if I were smarter I
  // would just do this above

  // grab the class name out
  remainingNodes = _.reject(merged, function(i) {
    if (i["tagname"] === "class") {
      classPrefix = i["name"];
      nodes[classPrefix] = createBasicTranslation(classPrefix, "class", i);
      return true;
    }
  });

  if (merged.length === remainingNodes.length) {
    console.error("Error".red + ": there's no class in this file: " + file);
  }

  remainingNodes = _.reject(remainingNodes, function(i) {
    var isEvent = i["tagname"] == "event";
    var joinChar = isEvent ? "@" : ".";
    var memberName = [classPrefix, i["name"]].join(joinChar);

    if (i["tagname"] === "method" || isEvent) {
      nodes[memberName] = createBasicTranslation(memberName, isEvent ? "event": "method", i);
      nodes[memberName]["signatures"] = [];
      var ret = {};

      // these next blocks don't yet handle alternate signatures...
      // but are written as if they will :)
      if (i["params"] !== undefined) {
          var sig = {"arguments": [] };
          nodes[memberName]["arguments"] = [];

          _.each(i["params"], function(p) {
            // construct the args object
            var args = {};
            args.name = p["name"];
            args.description = p["doc"];
            args.types = [];
            args.types.push(p["type"]);
            args.optional = p["optional"];

            sig.arguments.push(args);

            // somewhat confusing...there are args on "signatures" and a separate arguments property
            nodes[memberName]["arguments"].push(args);
          });
      }

      if (i["return"] !== undefined) {
        ret.type = i["return"].type;
        ret.description = i["return"].description;
        // ret.isArray: null // ???
      }

      nodes[memberName]["signatures"].push({"arguments": nodes[memberName]["arguments"]}, {"return": ret});

      if (isEvent) {
        if (i["cancelable"] !== undefined)
          nodes[memberName]["cancelable"] = i["cancelable"];
        if (i["bubbles"] !== undefined)
          nodes[memberName]["bubbles"] = i["bubbles"];
      }
      return true;
    }

    else if (i["tagname"] === "property") {
      nodes[memberName] = createBasicTranslation(memberName, "property", i);
      nodes[memberName]["signatures"] = [ { arguments: undefined, returns: [ { type: i["type"] } ] } ];
      return true;
    }

    else if (i["tagname"] === "attribute") {
      nodes[memberName] = createBasicTranslation(memberName, "attribute", i);
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
function expand(docset) {
    docset["comment"] = DocParser.parse(docset["comment"]);
    docset["tagname"] = DocType.detect(docset["comment"], docset["code"]);
  
    if (docset["tagname"] == "class")
      return DocExpander.expand(docset);
    else
      return docset;
}

// Merges comment and code parts of docset
function merge(docset) {
  doc_ast.linenr = docset["linenr"];
  docset["comment"] = doc_ast.detect(docset["tagname"], docset["comment"]);

  return Merger.merge(docset);
}

function createBasicTranslation(memberName, type, i) {
  var node = {};

  node["id"] = memberName;
  node["type"] = type;

  node["description"] = i["doc"];

  // short description lasts until the first empty line
  if (node["description"] !== undefined)
    node["short_description"] = node["description"].replace(/\n\n[\s\S]*$/, '\n');
  
  node["line"] = i["linenr"];

  if (i["private"] !== undefined)
    node["private"] = i["private"];

  if (i["see"] !== undefined)
    node["related_to"] = i["see"].name;

  if (i["author"] !== undefined)
    node["author"] = i["author"].doc;

  if (i["version"] !== undefined)
    node["version"] = i["version"].doc;

  return node
}

// should be in underscore core, but at the moment, it's not in the npm version...
// Return a copy of the object without the blacklisted properties.
function exclude(obj) {
  var slice = Array.prototype.slice;
  var blacklist = _.flatten(slice.call(arguments, 1));
  return _.pick(obj, _.difference(_.keys(obj), blacklist));
};

////////////////////////////////////////////////////////////////////////////////


module.exports = function (PaninoArg, args) {
  PaninoArg.registerParser('.js', parse_javascript);
};
