var _ = require('underscore');
require("colors");

// All possible node types in Esprima-created abstract syntax tree
//
// Each node type maps to list of properties of that node into
// which we can recurse for further parsing.
var NODE_TYPES = {
  "Program" : ["body"],

  "BlockStatement" : ["body"],
  "BreakStatement" : [],
  "ContinueStatement" : [],
  "DoWhileStatement" : ["body", "test"],
  "DebuggerStatement" : [],
  "EmptyStatement" : [],
  "ExpressionStatement" : ["expression"],
  "ForStatement" : ["init", "test", "update", "body"],
  "ForInStatement" : ["left", "right", "body"],
  "IfStatement" : ["test", "consequent", "alternate"],
  "LabeledStatement" : ["body"],
  "ReturnStatement" : ["argument"],
  "SwitchStatement" : ["discriminant", "cases"],
  "SwitchCase" : ["test", "consequent"],
  "ThrowStatement" : ["argument"],
  "TryStatement" : ["block", "handlers", "finalizer"],
  "CatchClause" : ["param", "body"],
  "WhileStatement" : ["test", "body"],
  "WithStatement" : ["object", "body"],

  "FunctionDeclaration" : ["id", "params", "body"],
  "VariableDeclaration" : ["declarations"],
  "VariableDeclarator" : ["id", "init"],

  "AssignmentExpression" : ["left", "right"],
  "ArrayExpression" : ["elements"],
  "BinaryExpression" : ["left", "right"],
  "CallExpression" : ["callee", "arguments"],
  "ConditionalExpression" : ["test", "consequent", "alternate"],
  "FunctionExpression" : ["body"],

  "LogicalExpression" : ["left", "right"],
  "MemberExpression" : ["object", "property"],
  "NewExpression" : ["callee", "arguments"],
  "ObjectExpression" : ["properties"],
  "Property" : ["key", "value"],

  "SequenceExpression" : ["expressions"],
  "ThisExpression" : [],
  "UnaryExpression" : ["argument"],
  "UpdateExpression" : ["argument"],

  "Identifier" : [],
  "Literal" : []
}

var start_index = 0, start_linenr = 1;

exports.parse = function(ast, source) {
    ast["comments"] = merge_comments(ast["comments"], source);

    return locate_comments(ast, source);
};

function merge_comments(original_comments, source) {
  var result = [], 
      i = 0, 
      comment = original_comments[0];

  while (comment) {
    i++;
    var next_comment = original_comments[i];

    if (next_comment && mergeable(comment, next_comment, source)) {
      // Merge next comment to current one
      comment["value"] += "\n" + next_comment["value"];
      comment["range"][1] = next_comment["range"][1];

    }
    else {
      // Create a link and continue with next comment
      comment["next"] = next_comment;
      result.push(comment);
      comment = next_comment;
    }
  }

  return result;
}

/*
  Two comments can be merged if they are both line-comments and
  they are separated only by whitespace (only one newline at the
  end of the first comment is allowed)
*/
function mergeable(c1, c2, source) {
  if (c1["type"] == "Line" && c2["type"] == "Line") {
    var x = /^(\r\n|\n|\r)?[ \t]*$/.test(source.slice(c1["range"][1], c2["range"][0]));
    return x;
  }
  else
    return false;
}

function locate_comments(ast, source) {
  return ast["comments"].map(function(comment) {
    // Detect comment type and strip * at the beginning of doc-comment
    var value = comment["value"];
    var type = "";

    if (comment["type"] == "Block" && /^\*/.test(value)) {
      type = "doc_comment";
      value = value.slice(1, value.length);
    }
    else {
      type = "plain_comment";
    }

    return {"comment": value, "code": stuff_after(comment, ast), "linenr": line_number(comment["range"][0], source), "type": type}
  });
}

// Given index inside input string, returns the corresponding line number
function line_number(index, source) {
  // To speed things up, remember the index until which we counted,
  // then next time just begin counting from there.  This way we
  // only count each line once.
  var i = start_index;
  var count = 0;
  while (i < index) {
    if (source[i] === "\n") {
      count++;
    }
    i++;
  }

  start_linenr = count + start_linenr;
  start_index = index;

  return start_linenr;
}

// Sees if there is some code following the comment.
// Returns the code found.  But if the comment is instead
// followed by another comment, returns an empty string.
function stuff_after(comment, ast) { 
  var code = code_after(comment["range"], ast);

  if (code && comment["next"])
    return code["range"][0] < comment["next"]["range"][0] ? code : "";
  else
    return code;
}


// Looks for code following the given range.
//
// The second argument is the parent node within which we perform
// our search.
function code_after(range, parent) {
  // Look through all child nodes of parent...
  var children = child_nodes(parent);
  for (var i = 0; i < children.length; i++) {
    if (less(range, children[i]["range"])) {
      // If node is after our range, then that's it.  There could
      // be comments in our way, but that's taken care of in
      // #stuff_after method.
      return children[i];
    }
    else if (within(range, children[i]["range"])) {
      // Our range is within the node --> recurse
      return code_after(range, children[i])
    }
  }
  return;
}

// True if range A is less than range B
function less(a, b) {
  return a[1] < b[0];
}

// True if range A is greater than range B
function greater(a, b) {
  return a[0] > b[1];
}

// True if range A is within range B
function within(a, b) {
  return b[0] < a[0] && a[1] < b[1];
}

// Returns array of child nodes of given node
function child_nodes(node) {
  var properties = NODE_TYPES[node["type"]];

  if (properties === undefined) {
    console.error("FATAL".red + ": Unknown node type: " + node["type"]);
    console.trace();
    process.exit(1);
  }

   var x = properties.map(function(p) {
     return node[p];
   });

   return _.flatten(_.compact(x));
}