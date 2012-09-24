var _ = require('underscore');

// Converts AST node into a value.
//
// - String literals become Ruby strings
// - Number literals become Ruby numbers
// - Regex literals become :regexp symbols
// - Array expressions become Ruby arrays
// - etc
//
// For anything it doesn't know how to evaluate (like a function
// expression) it throws exception.
//

var to_value = exports.to_value = function(ast) {
  switch (ast["type"]) {
      case "ArrayExpression":
        return _.map(ast["elements"], function(e) {to_value(e) });
      case "ObjectExpression":
        var h = {};
        _.each(ast["properties"], function(p) {
          var key = key_value(p["key"]);
          var value = to_value(p["value"]);
          h[key] = value;
        });
        return h;
      case "BinaryExpression":
        if (ast["operator"] == "+")
          return to_value(ast["left"]) + to_value(ast["right"]);
        else
          throw new Error("Unable to handle operator: ", ast["operator"]);
      case "MemberExpression":
        if (base_css_prefix(ast)) 
          return "x-";
        else
          throw new Error("Unable to handle this MemberExpression");
      case "Literal":
        if (/^\//.test(ast["raw"]))
          return "regexp";
        else
          return ast["value"];
      default:
        throw new Error("Unknown node type: ", ast["type"]);
  }
}

// Turns object property key into string value
var key_value = exports.key_value = function(key) {
  return key["type"] == "Identifier" ? key["name"] : key["value"];
}

// True case MemberExpression == Ext.baseCSSPrefix::
function base_css_prefix(ast) {
  return ast["computed"] == false &&
    ast["object"]["type"] == "Identifier" &&
    ast["object"]["name"] == "Ext" &&
    ast["property"]["type"] == "Identifier" &&
    ast["property"]["name"] == "baseCSSPrefix"
}