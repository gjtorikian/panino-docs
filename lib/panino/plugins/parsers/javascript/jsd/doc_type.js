var _ = require('underscore');

// Detects the type of documentation object: class, method, cfg, etc

// Given parsed documentation and code, returns the tagname for
// documentation item.
//
// @param docs Result from DocParser
// @param code Result from Ast#detect or CssParser#parse
// @returns One of: :class, :method, :event, :cfg, :property, :css_var, :css_mixin
//
exports.detect = function(docs, code) {
  var doc_map = build_doc_map(docs);

  if (doc_map["class"])
    return "class";

  else if (doc_map["event"])
    return "event";

  else if (doc_map["method"])
    return "method";

  else if (doc_map["attribute"])
    return "attribute";

  else if (doc_map["property"] || doc_map["type"])
    return "property";

  else if (doc_map["css_var"])
    return "css_var";

  else if (doc_map["cfg"] && doc_map["cfg"].length == 1)  // When just one @cfg, avoid treating it as @class
    return "cfg";

  else if (code["tagname"] == "class")
    return "class";

  else if (code["tagname"] == "css_mixin")
    return "css_mixin";

  else if (doc_map["cfg"])
    return "cfg";

  else if (doc_map["Constructor"]) // argh! "constructor" is a reserved word in JS, so let's capitalize the C
    return "method";

  else if (doc_map["param"] || doc_map["return"])
    return "method";

  else
    return code["tagname"];
}

// Build map of at-tags for quick lookup
function build_doc_map(docs) {
  var map = {};
  _.each(docs, function(tag) {
    if (map[tag["tagname"]])
      map[tag["tagname"]].push(tag);
    else
      map[tag["tagname"]] = new Array(tag);
  });
  return map;
}