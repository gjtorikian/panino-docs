var _ = require('underscore');

// Transforms Esprima AST into string

var to_s = exports.to_s = function(ast) {
  switch (ast["type"]) {
    case "Program":
        return _.map(ast["body"], function(s) {
            return to_s(s);
        }).join();
        
    // Statements
    
    case "BlockStatement": 
        return "{" + _.map(ast["body"], function(s) { to_s(s) }).join() + "}";

    case "BreakStatement":
        return "break" + (ast["label"] ? " " + to_s(ast["label"]) : "") + ";";

    case "ContinueStatement":
        return "continue" + (ast["label"] ? " " + to_s(ast["label"]) : "") + ";";

    case "DoWhileStatement":
        return "do " + to_s(ast["body"]) + " while (" + to_s(ast["test"]) + ");";

    case "DebuggerStatement":
        return "debugger;";

    case "EmptyStatement":
        return ";";

    case "ExpressionStatement":
        return to_s(ast["expression"]) + ";";

    case "ForStatement":
        var init = ast["init"] ? to_s(ast["init"]).replace(/;$/, "") : ""
        var test = ast["test"] ? to_s(ast["test"]) : "";
        var update = ast["update"] ? to_s(ast["update"]) : "";
        return "for (" + init + "; " + test + "; " + update + ") " + to_s(ast["body"]);

    case "ForInStatement":
        var left = to_s(ast["left"]).replace(/;$/, "");
        var right = to_s(ast["right"]);
        return "for (" + left + " in " + right + ") " + to_s(ast["body"]);

    case "IfStatement":
        var alternate = ast["alternate"] ? " else " + to_s(ast["alternate"]) : "";
        return "if (" + to_s(ast["test"]) + ") " + to_s(ast["consequent"]) + alternate;

    case "LabeledStatement":
        return to_s(ast["label"]) + ": " + to_s(ast["body"]);

    case "ReturnStatement":
        var arg = ast["argument"] ? to_s(ast["argument"]) : "";
        return "return " + arg + ";";

    case "SwitchStatement":
        return "switch (" + to_s(ast["discriminant"]) + ") {" + _.map(ast["cases"], function(c) { to_s(c) }).join() + "}";

    case "SwitchCase":
        var test = ast["test"] ? "case " + to_s(ast["test"]) : "default";
        return test + ": " + _.map(ast["consequent"], function(c) { to_s(c) }).join();

    case "ThrowStatement":
        return "throw " + to_s(ast["argument"]) + ";";

    case "TryStatement":
        var handlers = _.map(ast["handlers"], function(h) { to_s(h) }).join();
        var finalizer = ast["finalizer"] ? " finally " + to_s(ast["finalizer"]) : "";
        return "try " + to_s(ast["block"]) + handlers + finalizer;

    case "CatchClause":
        var param = ast["param"] ? to_s(ast["param"]) : "";
        return " catch (" + param + ") " + to_s(ast["body"]);

    case "WhileStatement":
        return "while (" + to_s(ast["test"]) + ") " + to_s(ast["body"]);

    case "WithStatement":
        return "with (" + to_s(ast["object"]) + ") " + to_s(ast["body"]);

    // Declarations

    case "FunctionDeclaration":
        return func(ast);

    case "VariableDeclaration":
        return ast["kind"] + " " + list(ast["declarations"]) + ";";

    case "VariableDeclarator":
        if (ast["init"])
          return to_s(ast["id"]) + " = " + to_s(ast["init"]);
        else
          return to_s(ast["id"]);

    // Expressions

    case "AssignmentExpression":
        return parens(ast, ast["left"]) + " " + ast["operator"] + " " + to_s(ast["right"]);

    case "ArrayExpression":
        return "[" + list(ast["elements"]) + "]";

    case "BinaryExpression":
        return binary(ast);

    case "CallExpression":
        return serializeCall(ast);

    case "ConditionalExpression":
        return parens(ast, ast["test"]) + " ? " + to_s(ast["consequent"]) + " : " + to_s(ast["alternate"]);

    case "FunctionExpression":
        return func(ast);

    case "LogicalExpression":
        return binary(ast);

    case "MemberExpression":
        if (ast["computed"])
          return parens(ast, ast["object"]) + "[" + to_s(ast["property"]) + "]";
        else 
          return parens(ast, ast["object"]) + "." + to_s(ast["property"]);

    case "NewExpression":
        return "new " + serializeCall(ast);

    case "ObjectExpression":
        return "{" + list(ast["properties"]) + "}";

    case "Property":
        return to_s(ast["key"]) + ": " + to_s(ast["value"]);

    case "SequenceExpression":
        return list(ast["expressions"]);

    case "ThisExpression":
        return "this";

    case "UnaryExpression":
        return ast["operator"] + parens(ast, ast["argument"]);

    case "UpdateExpression":
        if (ast["prefix"])
          return ast["operator"] + parens(ast, ast["argument"]);
        else
          return parens(ast, ast["argument"]) + ast["operator"];

    // Basics

    case "Identifier":
        return ast["name"];

    case "Literal":
        return ast["raw"];

    default:
        throw new Error("Unknown node type: ", ast["type"]);
  }
}

// serializes function declaration or expression
function func(ast) {
  var params = list(ast["params"])
  var id = ast["id"] ? to_s(ast["id"]) : ""
  return "function " + id + "(" + params + ") " + to_s(ast["body"])
}

// serializes list of comma-separated items
function list(array) {
  return _.map(array, function(x) { to_s(x) }).join(", ");
}

// serializes call- and new-expression
function serializeCall(ast) {
  return parens(ast, ast["callee"]) + "(" + list(ast["arguments"]) + ")";
}

// Handles both binary- and logical-expression
function binary(ast) {
  return parens(ast, ast["left"]) + " " + ast["operator"] + " " + parens(ast, ast["right"]);
}

// serializes child node and wraps it inside parenthesis if the
// precedence rules compared to parent node would require so.
function parens(parent, child) {
  if (precedence(parent) >= precedence(child))
    return to_s(child);
  else
    return "(" + to_s(child) + ")";
}

// Returns the precedence of operator represented by given AST node
function precedence(ast) {
  var p = PRECEDENCE[ast["type"]];
  if ( _.isNumber(p) ) // represents Fixnum? I'm so sorry.
    return p;
  else if ( p && p.constructor === Object )
    return p[ast["operator"]];
  else
    return 0;
}

// Precedence rules of JavaScript operators.
//
// Taken from: https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
//
var PRECEDENCE = {
  "SequenceExpression" : 17,
  "AssignmentExpression" : 16,
  "ConditionalExpression" : 15,
  "LogicalExpression" : {
    "||" : 14,
    "&&" : 13,
  },
  "BinaryExpression" : {
    "|" : 12,
    "^" : 11,
    "&" : 10,

    "==" : 9,
    "!=" : 9,
    "===" : 9,
    "!==" : 9,

    "<" : 8,
    "<=" : 8,
    ">" : 8,
    ">=" : 8,
    "in" : 8,
    "instanceof" : 8,

    "<<" : 7,
    ">>" : 7,
    ">>>" : 7,

    "+" : 6,
    "-" : 6,

    "*" : 5,
    "/" : 5,
    "%" : 5,
  },
  "UnaryExpression" : 4,
  "UpdateExpression" : 3,
  "CallExpression" : 2,
  "MemberExpression" : 1,
  "NewExpression" : 1,
}