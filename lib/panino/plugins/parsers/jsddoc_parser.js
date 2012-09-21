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
  var nodes, ast, list = {}, tree, parted, sections, children;
  doc_ast = new DocAst();

  try {
    ast = esprima.parse(source, {comment: true, range: true, raw: true});
  } catch (err) {
    callback(err);
    return;
  }

  var docs = JSParser.parse(ast, source);
  docs = new ASTEsprima(docs, options).detect_all();

  var expanded = _.map(docs, function(docset) {
    return expand(docset);
  });

  expanded = _.flatten(expanded);

  //console.log(expanded)  
  var merged = _.map(expanded, function (docset) {
    return merge(docset);
  });
     
  //console.log(merged)  
/*
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

*/
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

////////////////////////////////////////////////////////////////////////////////


module.exports = function (PaninoArg, args) {
  if (!args || !args.registered) { // for horrendous markdown support
    //if (args) console.log(args);
    PaninoArg.registerParser('.js', parse_javascript);
  }
  else {
    // console.log(args.source);
    process_javascript(args.source, args.file, args.options, args.callback);
  }
};
