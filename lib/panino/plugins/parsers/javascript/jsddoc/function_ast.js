var _ = require('underscore');

var Serializer = require("./serializer");
var Evaluator = require("./evaluator");
var utils = require("./utils");

// Analyzes the AST of a FunctionDeclaration or FunctionExpression.

// True when function always finishes by returning this.  False
// doesn't neccessarily mean that the function doesn't return this
// - rather it means our static analyzes wasn't able to determine
// what the function returns.
exports.chainable = function(ast) {
  if (ast && func(ast))
    return body_returns(ast["body"]["body"]);
  else
    return false;
}

function func(ast) {
  return ast["type"] == "FunctionDeclaration" || ast["type"] == "FunctionExpression";
}

function body_returns(body) {
  body = skip_returnless_statements(body);

  return body.length > 0 && return_this(body[0]);
}

function return_this(ast) {
  return isRet(ast) && !!ast["argument"] && isThisObj(ast["argument"]);
}

function isRet(ast) {
  return ast["type"] == "ReturnStatement";
}

function isThisObj(ast) {
  return ast["type"] == "ThisExpression";
}

function skip_returnless_statements(statements) {
  var i = utils.findIndex(statements, function(s) { return contains_return(s); });
  if (i >= 0)
    return statements.slice(i, statements.length);
  else
    return [];
}

function contains_return(ast) {
  if (isRet(ast))
    return true;
  else if (isControlFlow(ast))
    return _.any(extract_body(ast), function(s) { return contains_return(s); });
  else
    return false;
}

function isControlFlow(ast) {
  return CONTROL_FLOW[ast["type"]];
}

function extract_body(ast) {
  var body = [];
  
  _.each(CONTROL_FLOW[ast["type"]], function(name) {
    var statements = ast[name];
    if ( statements && statements.constructor === Object )
      body.push(statements);
    else if (statements)
      body = body.concat(statements);
  });

  return body;
}

var CONTROL_FLOW = {
  "IfStatement" : ["consequent", "alternate"],
  "SwitchStatement" : ["cases"],
  "SwitchCase" : ["consequent"],
  "ForStatement" : ["body"],
  "ForInStatement" : ["body"],
  "WhileStatement" : ["body"],
  "DoWhileStatement" : ["body"],
  "TryStatement" : ["block", "handlers", "finalizer"],
  "CatchClause" : ["body"],
  "WithStatement" : ["body"],
  "LabeledStatement" : ["body"],
  "BlockStatement" : ["body"]
}