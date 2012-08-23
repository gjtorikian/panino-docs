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


// 3rd-party
var _ = require('underscore');


// internal
var parser = require('./javascript/parser');
var Panino = require(__dirname + '/../../../panino');

////////////////////////////////////////////////////////////////////////////////


function parse_javascript(file, options, callback) { 
  fs.readFile(file, 'utf8', function (err, source) {
    if (err) {
      callback(err);
      return;
    }
    process_javascript(source, file, options, callback);
  });
}

var process_javascript = function(source, file, options, callback) {
  var nodes, list = {}, tree, parted, sections, children;

  // TODO: These rules are being set on every file read
  parser.parser = Panino.setParsingRules(options, parser.parser);

  // TODO: consider amending failing document inplace.
  // Say, if it doesn't parse, insert a fake '*' line at failing `line` and retry

  try {
    nodes = parser.parse(source);
  } catch (err) {
    callback(err);
    return;
  }

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

////////////////////////////////////////////////////////////////////////////////


module.exports = function (PaninoArg, args) {
  if (!args || !args.registered) { // for horrendous markdown support
    if (args) console.log(args);
    PaninoArg.registerParser('.js', parse_javascript);
  }
  else {
    // console.log(args.source);
    process_javascript(args.source, args.file, args.options, args.callback);
  }
};
