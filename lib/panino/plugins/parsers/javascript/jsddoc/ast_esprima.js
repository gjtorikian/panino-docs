var _ = require('underscore');
require("colors");

var Serializer = require("./serializer");
var Evaluator = require ("./evaluator");
var FunctionAST = require ("./function_ast");
var utils = require("./utils");

// Analyzes the AST produced by EsprimaParser.

var ext_define_patterns;
var docs = [];

// Should be initialized with EsprimaParser#parse result.
var ASTEsprima = function(docArray, options) {
  ext_define_patterns = build_ext_define_patterns(options["namespace"] || ["apf"]);
  docs = docArray;
}


// Given Array of alternate Ext namespaces builds list of patterns
// for detecting Ext.define:
//
// ["Ext","Foo"] --> ["Ext.define", "Ext.ClassManager.create", 
//                    "Foo.define", "Foo.ClassManager.create"]
function build_ext_define_patterns(namespaces) {
  var mappedNamespaced = _.map(namespaces, function(ns) {
    [ns + ".define", ns + ".ClassManager.create"]
  });
  return _.flatten(mappedNamespaced);
}


ASTEsprima.prototype = {
  // Performs the detection of code in all docsets.
  //
  // @returns the processed array of docsets. (But it does it
  // destructively by modifying the passed-in docsets.)
  //
  detect_all: function() {
    // First deal only with doc-comments
    doc_comments = _.filter(docs, function(d) {
      return d["type"] == "doc_comment";
    });

    // Detect code in each docset.  Sometimes a docset has already
    // been detected as part of detecting some previous docset (like
    // Class detecting all of its configs) - in such case, skip.
    _.each(doc_comments, function(docset) {
      code = docset["code"];
      if ( !(code && code["tagname"]) )
        docset["code"] = detect(code);
      else
        docset["code"] = "";
    });

    // Return all doc-comments + other comments for which related
    // code was detected.
    return _.filter(docs, function(d) {
      return d["type"] == "doc_comment" || d["code"] && d["code"]["tagname"];
    });
  }
};

// Given Esprima-produced syntax tree, detects documentation data.
//
// This method is exposed for testing purposes only, JSDuck itself
// only calls the above #detect_all method.
//
// @param ast :code from Result of EsprimaParser
// @returns Hash consisting of the detected :tagname, :name, and
// other properties relative to the tag.  Like so:
//
//     { :tagname => :method, :name => "foo", ... }
//
function detect(ast) {
  ast = ast || {};

  exp = isExpression(ast) ? ast["expression"] : null;
  var variable = isVariable(ast) ? ast["declarations"][0] : null;

  // Ext.define("Class", {})
  if (exp && isExtDefine(exp))
    return make_class(to_value(exp["arguments"][0]), exp);

  // foo = Ext.extend("Parent", {})
  else if (exp && isAssignment(exp) && isExtExtend(exp["right"]))
    return make_class(to_s(exp["left"]), exp["right"]);

  // Foo = ...
  else if (exp && isAssignment(exp) && class_name(to_s(exp["left"])))
    return make_class(to_s(exp["left"]), exp["right"]);
 
  // var foo = Ext.extend("Parent", {})
  else if (variable && variable["init"] && isExtExtend(variable["init"]))
    return make_class(to_s(variable["id"]), variable["init"]);

  // var Foo = ...
  else if (variable && class_name(to_s(variable["id"])))
    return make_class(to_s(variable["id"]), variable["right"]);

  // function Foo() {}
  else if (isFn(ast) && class_name(to_s(ast["id"])))
    return make_class(to_s(ast["id"]));

  // function foo() {}
  else if (isFn(ast))
    return make_method(to_s(ast["id"]), ast);

  // foo = function() {}
  else if (exp && isAssignment(exp) && isFn(exp["right"]))
    return make_method(to_s(exp["left"]), exp["right"]);

  // var foo = function() {}
  else if (variable && variable["init"] && isFn(variable["init"]))
    return make_method(to_s(variable["id"]), variable["init"]);

  // (function() {})
  else if (exp && isFn(exp))
    return make_method(exp["id"] ? to_s(exp["id"]) : "", exp);

  // foo: function() {}
  else if (isProperty(ast) && isFn(ast["value"]))
    return make_method(key_value(ast["key"]), ast["value"]);

  // foo = ...
  else if (exp && isAssignment(exp))
    return make_property(to_s(exp["left"]), exp["right"]);

  // var foo = ...
  else if (variable)
    return make_property(to_s(variable["id"]), variable["init"]);

  // foo: ...
  else if (isProperty(ast))
    return make_property(key_value(ast["key"]), ast["value"]);

  // foo;
  else if (exp && isIdent(exp))
    return make_property(to_s(exp));

  // "foo"  (inside some expression)
  else if (isString(ast))
    return make_property(to_value(ast));

  // "foo";  (as a statement of it's own)
  else if (exp && isString(exp))
    return make_property(to_value(exp));

  else
    return make_property();
}

function isExpression(ast) {
  return ast["type"] == "ExpressionStatement";
}

function isCall(ast) {
  return ast["type"] == "CallExpression";
}

function isAssignment(ast) {
  return ast["type"] == "AssignmentExpression";
}

function isExtDefine(ast) {
  return isCall(ast) && _.include(ext_define_patterns, to_s(ast["callee"]));
}

function isExtExtend(ast) {
  return isCall(ast) && to_s(ast["callee"]) == "Ext.extend";
}

function isFn(ast) {
  return ast["type"] == "FunctionDeclaration" || ast["type"] == "FunctionExpression" || isEmptyFn(ast);
}

function isEmptyFn(ast) {
  return ast["type"] == "MemberExpression" && to_s(ast) == "Ext.emptyFn";
}

function isVariable(ast) {
  return ast["type"] == "VariableDeclaration";
}

function isProperty(ast) {
  return ast["type"] == "Property";
}

function isIdent(ast) {
  return ast["type"] == "Identifier";
}

function isString(ast) {
  return ast["type"] == "Literal" &&  _.isString(ast["value"]);
}

// Class name begins with upcase char
function class_name(name) {
  return /^[A-Z]/.test(_.last(name.split(/\./)));
}

function make_class(name, ast) {
  cls = {
    "tagname" : "class",
    "name" : name
  }

  ast = ast || null;
  
  // apply information from Ext.extend, Ext.define, or {}
  if (ast) {
    if (isExtExtend(ast)) {
      args = ast["arguments"];
      cls["extends"] = to_s(args[0]);
      if (args.length == 2 && args[1]["type"] == "ObjectExpression")
        detect_class_members_from_object(cls, args[1]);
    }
    else if (isExtDefine(ast))
      detect_ext_define(cls, ast);
    else if (ast["type"] == "ObjectExpression")
      detect_class_members_from_object(cls, ast);
    else if (ast["type"] == "ArrayExpression")
      detect_class_members_from_array(cls, ast);
  }

  return cls;
}

// Inspects Ext.define() and copies detected properties over to the
// given cls Hash
function detect_ext_define(cls, ast) {
  // defaults
  cls["extends"] = "Ext.Base";
  cls["requires"] = [];
  cls["uses"] = [];
  cls["alternateClassNames"] = [];
  cls["mixins"] = [];
  cls["aliases"] = [];
  cls["members"] = [];
  cls["code_type"] = "ext_define";
  
  each_pair_in_object_expression(ast["arguments"][1], function(key, value, pair) {
    switch (key) {
     case "extend":
        cls["extends"] = make_string(value);
        break;
     case "override":
        cls["override"] = make_string(value);
        break;
     case "requires":
        cls["requires"] = make_string_list(value);
        break;
     case "uses":
        cls["uses"] = make_string_list(value);
        break;
     case "alternateClassName":
        cls["alternateClassNames"] = make_string_list(value);
        break;
     case "mixins":
        cls["mixins"] = make_mixins(value);
        break;
     case "singleton":
        cls["singleton"] = make_singleton(value);
        break;
     case "alias":
        cls["aliases"] += make_string_list(value);
        break;
     case "xtype":
        cls["aliases"] += _.map(make_string_list(value), function(xtype) { return "widget."+xtype });
        break;
     case "config":
        cls["members"] += make_configs(value, {"accessor": true});
        break;
     case "cachedConfig":
        cls["members"] += make_configs(value, {"accessor": true});
        break;
     case "eventedConfig":
        cls["members"] += make_configs(value, {"accessor": true, "evented": true});
        break;
     case "statics":
        cls["members"] += make_statics(value);
        break;
     case "inheritableStatics":
        cls["members"] += make_statics(value, {"inheritable": true});
        break;
     default:
        detect_method_or_property(cls, key, value, pair);
        break;
    }
  });
}

// Detects class members from object literal
function detect_class_members_from_object(cls, ast) {
  cls["members"] = []
  return each_pair_in_object_expression(ast, function(key, value, pair) {
    detect_method_or_property(cls, key, value, pair);
  });
}

// Detects class members from array literal
function detect_class_members_from_array(cls, ast) {
  cls["members"] = [];
  return _.each(ast["elements"], function(el) {
    detect_method_or_property(cls, key_value(el), el, el);
  });
}

// Detects item in object literal either as method or property
function detect_method_or_property(cls, key, value, pair) {
  if (isFn(value)) {
    var m = make_method(key, value);
    if (apply_autodetected(m, pair))
        return cls["members"].push(m); 
  }
  else {
    var p = make_property(key, value);
    if (apply_autodetected(p, pair))
        return cls["members"].push(p);
  }
}

function make_string(cfg_value) {
  if (!cfg_value)
    return null;
    
  var parent = to_value(cfg_value);

  return _.isString(parent) ? parent : null;
}

function make_string_list(cfg_value) {
  if (!cfg_value)
  return [];

  classes = new Array(to_value(cfg_value));

  var allStrings = _.all(classes, function(c) {
      return _.isString(c);
  });
  
  return allStrings ? classes : [];
}

function make_mixins(cfg_value) {
  if (!cfg_value)
    return [];
    
  var v = to_value(cfg_value);
  var classes = v.constructor === Object ? _.values(v) : Array(v); // literally, a {} object

  var allStrings = _.all(classes, function(c) {
      return _.isString(c);
  });
  
  return allStrings ? classes : [];
}

function make_singleton(cfg_value) {
  return cfg_value && to_value(cfg_value) == true;
}

function make_configs(ast, defaults) {
  var configs = [], defaults = defaults || {};

  each_pair_in_object_expression(ast, function(name, value, pair) {
    var cfg = make_property(name, value, "cfg");
    cfg = utils.merge(cfg, defaults);
    if (apply_autodetected(cfg, pair))
        configs.push(cfg);
  });

  return configs;
}

function make_statics(ast, defaults) {
  var statics = [], defaults = defaults || {};

  each_pair_in_object_expression(ast, function(name, value, pair) {
    var s = {};
    
    if (isFn(value))
      s = make_method(name, value);
    else
      s = make_property(name, value);

    s["meta"] = {"static": true};
    s = utils.merge(s, defaults);

    if (apply_autodetected(s, pair, defaults["inheritable"]))
        statics.push(s);
  });

  return statics;
}

// Sets auto-detection related properties :autodetected and
// :inheritdoc on the given member Hash.

// When member has a comment, adds code to the related docset and
// returns false.

// Otherwise detects the line number of member and returns true.
function apply_autodetected(m, ast, inheritable) {
  docset = find_docset(ast);
  var inheritable = inheritable || true;
  
  if (!docset || docset["type"] != "doc_comment") {
    if (inheritable)
      m["inheritdoc"] = {};
    else
      m["private"] = true;
      
    m["autodetected"] = true;
  }

  if (docset) {
    docset["code"] = m;
    return false;
  }
  else {
    // Get line number from third place at range array.
    // This third item exists in forked EsprimaJS at
    // https://github.com/nene/esprima/tree/linenr-in-range
    m["linenr"] = ast["range"][2];
    return true;
  }
}

// Looks up docset associated with given AST node.
// A dead-stupid and -slow implementation, but works.
function find_docset(ast) {
  return _.find(docs, function(docset) {
    return docset["code"] == ast;
  });
}

function make_method(name, ast) {
  return {
    "tagname": "method",
    "name": name,
    "params": make_params(ast || null),
    "chainable": chainable(ast || null) && name != "Constructor"
  }
}

function make_params(ast) {
  if (ast && !isEmptyFn(ast)) {
    return _.map(ast["params"], function(p) {
        return { "name" : to_s(p) };
    });
  }
  else {
    return [];
  }
}

function chainable(ast) {
  return FunctionAST.chainable(ast);
}

function make_property(name, ast, tagname) {
  return {
    "tagname": tagname || "property",
    "name": name || null,
    "type": make_value_type(ast || null),
    "default": make_default(ast || null)
  }
}

function make_default(ast) {
  return ast && (to_value(ast) != null ? to_s(ast) : null);
}

function make_value_type(ast) {
  if (ast) {
    var v = to_value(ast);
    
    if ( _.isString(v) )
      return "String";
    else if ( _.isNumber(v) )
      return "Number";
    else if ( _.isBoolean(v) )
      return "Boolean";
    else if ( _.isArray(v) )
      return "Array";
    else if ( v && v.constructor === Object )
      return "Object";
    else if (_.isRegExp(v) || v == "regexp")
      return "RegExp";
    else
      return null;
  }
  else
    return null;
}

// -- various helper methods --

// Iterates over keys and values in ObjectExpression.  The keys
// are turned into strings, but values are left as is for further
// processing.
function each_pair_in_object_expression(ast, func) {
  if (! (ast && ast["type"] == "ObjectExpression")) {
    return;
  }

  return _.each(ast["properties"], function(p) {
    isFn(key_value(p["key"]), p["value"], p);
  });
}

// Converts object expression property key to string value
function key_value(key) {
  return Evaluator.key_value(key);
}

// Fully serializes the node
function to_s(ast) {
  return Serializer.to_s(ast);
}

// Converts AST node into a value.
function to_value(ast) {
  try {
    return Evaluator.to_value(ast);
  }
  catch (e) {
    //console.warn("Warning".yellow + ": " + e);
    return null;
  }
}

module.exports = ASTEsprima;