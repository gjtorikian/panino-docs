var _ = require('underscore');

// Takes data from comment and code that follows it and combines
// these two pieces of information into one.  The code comes from
// JsDuck:"Ast" and comment from JsDuck:"DocAst".
//
// The main method merge() produces a hash as a result.


// Takes a docset and merges the "comment" and "code" inside it,
// producing hash as a result.
exports.merge = function (docset) {
  var docs = docset["comment"];
  var code = docset["code"];
  var result = "";

  switch (docset["tagname"]) {
      case "class":
        result = merge_class(docs, code);
        break;
      case "method":
      case "event":
      case "attribute":
      case "css_mixin":
        result = merge_like_method(docs, code);
        break;
      case "cfg":
      case "property":
      case "css_var":
        result = merge_like_property(docs, code);
        break;
  }
  result["linenr"] = docset["linenr"];

  return result;
}

function merge_class(docs, code) {
  var h = do_merge(docs, code, {
    "mixins" : [],
    "alternateClassNames" : [],
    "requires" : [],
    "uses" : [],
    "singleton" : false
  });

  // Ignore extending of the Object class
  if ( h["extends"] == "Object")
    h["extends"] = null;

  h["aliases"] = build_aliases_hash(h["aliases"] || []);

  // Used by Aggregator to determine if we're dealing with Ext4 code
  if (code["code_type"])
    h["code_type"] = code["code_type"];

  h["members"] = [];

  return h;
}

function merge_like_method(docs, code) {
  var h = do_merge(docs, code);

  h["params"] = merge_params(docs, code);
  
  if (code["chainable"]) {
    h["meta"]["chainable"] = code["chainable"];
  }

  return h;
}

function merge_like_property(docs, code) {
  var h = do_merge(docs, code);
  h["type"] = merge_if_code_matches("type", docs, code);
  
  if (h["type"] === undefined)
    h["type"] = code["tagname"] == "method" ? "Function" : "Object";

  h["default"] = merge_if_code_matches("default", docs, code);
  
  return h;
}

// --- helpers ---

function do_merge(docs, code, defaults) {
  var h = {}, defaults = defaults || {};

  _.each(docs, function(value, key) {
    h[key] = docs[key] || code[key] || defaults[key];
  });

  h["name"] = merge_name(docs, code);
  //h["id"] = "TODO"; JsDuck:"Class".member_id(h) not really relevant

  if (h["meta"] === undefined)
    h["meta"] = {};

  // Copy private to meta
  if (h["private"])
    h ["meta"]["private"] = h["private"];

  // Copy "static" and "inheritable" flags from code if present
  if (code["meta"] && code["meta"]["static"])
    h["meta"]["static"] = true;
  if (code["inheritable"])
    h["inheritable"] = true;

  // Remember auto-detection info
  if (code["autodetected"])
    h["autodetected"] = code["autodetected"];

  return h;
}

// Given array of full alias names like "foo.bar", "foo.baz"
// build hash like {"foo" : ["bar", "baz"]}
function build_aliases_hash(aliases) {
  var hash={};
  _.each(aliases, function(a) {
    var m;
    if ( (m = a.match(/^([^.]+)\.(.+)$/)) ) {
      if (hash[m[1]])
        hash[m[1]].push(m[2]);
      else
        hash[m[1]] = [m[2]];
    }
  });
  
  return hash;
}

function merge_params(docs, code) {
  var explicit = docs["params"] || [];
  var implicit = code_matches_doc(docs, code) ? (code["params"] || []) : [];
  // Override implicit parameters with explicit ones
  // But if explicit ones exist, don't append the implicit ones.
  var params = [];
  
  _.times((explicit.length > 0 ? explicit.length : implicit.length), function(i) {
    var im = implicit[i] || {};
    var ex = explicit[i] || {};
    params.push({
      "type" : ex["type"] || im["type"] || "Object",
      "name" : ex["name"] || im["name"] || "",
      "doc" : ex["doc"] || im["doc"] || "",
      "optional" : ex["optional"] || false,
      "default" : ex["default"],
      "properties" : ex["properties"] || []
    })
  });
  
  return params;
}

function merge_name(docs, code) {
  if (docs["name"])
    return docs["name"];
  else if (code["name"]) {
    if (docs["tagname"] == "class")
      return code["name"];
    else
      return _.last(code["name"].split(/\./));
  }
  else
    return "";
}

function merge_if_code_matches(key, docs, code, def) {
  def = def || null;
  if (docs[key])
    return docs[key];
  else if (code[key] && code_matches_doc(docs, code))
    return code[key];
  else
    return def;
}

// True if the name detected from code matches with explicitly documented name.
// Also true when no explicit name documented.
function code_matches_doc(docs, code) {
  return docs["name"] == null || docs["name"] == code["name"];
}