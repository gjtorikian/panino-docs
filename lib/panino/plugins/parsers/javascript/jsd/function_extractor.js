(function() {  
  var util = require('util');
  var esprima, getFunctions, traverse;

  esprima = require('esprima');

  traverse = function(object, visitor, master) {
    var parent;
    parent = master === 'undefined' ? [] : master;
    if (visitor.call(null, object, parent) === false) {
      return;
    }
    return Object.keys(object).forEach(function(key) {
      var child, path;
      child = object[key];
      path = [object];
      path.push(parent);
      if (typeof child === 'object' && child !== null) {
        return traverse(child, visitor, path);
      }
    });
  };

  getFunctions = function(tree, code) {
    var matched = false, list = [];
    traverse(tree, function(node, path) {
      var parent;
      if (node.type === 'FunctionDeclaration') {
        return list.push({
          name: node.id.name,
          params: node.params,
          range: node.range,
          blockStart: node.body.range[0],
          end: node.body.range[1]
        });
      } else if (node.type === 'FunctionExpression') {
        parent = path[0];
        if (parent.type === 'AssignmentExpression') {
          if (typeof parent.left.range !== 'undefined') {
            if (parent.left.type === "MemberExpression") {

              // for: foo.doSomething = function
              if (parent.left.object.name !== undefined) {
                var namespace = parent.left.object.name;

                if (parent.left.property.name !== undefined) {
                  var memberName = parent.left.property.name;
                  matched = true;
                }

                // for: foo["doSomething"] = function()
                else if (parent.left.property && parent.left.property.type === "Literal") {
                  var namespace = parent.left.object.name;
                  var memberName = parent.left.property.value;
                  matched = true;
                }
              }

              // for: this.doSomething = function
              else if (parent.left.object.type === "ThisExpression") {
                var namespace = "thiz";
                if (parent.left.property.name !== undefined) {
                  var memberName = parent.left.property.name;
                  matched = true;
                }

                // for this[variable] = function()
                else if (parent.left.property.type === "CallExpression") {
                  // no op
                  matched = true;
                }
              }

              // for: Function.prototype.doSomething = function()
              else if (parent.left.object.object !== undefined && parent.left.object.object.type === "Identifier") {
                var namespace = parent.left.object.object.type;
                var memberName = parent.left.property.name;
                var isPrototype = true;
                var prototyping = "prototype";
                matched = true;
              }

              // for: this.htmlElement.onmouseover = function()
              else if (parent.left.type === "MemberExpression" && parent.left.object.type === "MemberExpression") {
                var namespace ="thiz";  
                var memberName = parent.left.property.name;

                var isPrototype = true;
                var prototyping = parent.left.object.property.name;
                matched = true;
              }

              // for: (boolType ? "name" : "name2").doSomething = function()
              else if (parent.left.object !== undefined && parent.left.object.type === "ConditionalExpression") {
                // no op
                matched = true;
              }
            }
            else if (parent.left.type === "Identifier") {
              var memberName = parent.left.name;
              matched = true;
            }

            if (!matched) {
              console.error("Never found a matching arrangement!");
              console.error(util.inspect(parent.left, null, 5));
            }
            else {
              return list.push({
                namespace: namespace,
                name: memberName, 
                isPrototype: isPrototype,
                prototyping: prototyping,
                params: node.params,
                range: node.range,
                blockStart: node.body.range[0],
                end: node.body.range[1]
              });
            }
          }
        } else if (parent.type === 'VariableDeclarator') {
          return list.push({
            name: parent.id.name,
            params: node.params,
            range: node.range,
            blockStart: node.body.range[0],
            end: node.body.range[1]
          });
        } else if (parent.type === 'CallExpression') {
          return list.push({
            name: parent.id ? parent.id.name : '[Anonymous]',
            params: node.params,
            range: node.range,
            blockStart: node.body.range[0],
            end: node.body.range[1]
          });
        } else if (typeof parent.length === 'number') {
          return list.push({
            name: parent.id ? parent.id.name : '[Anonymous]',
            params: node.params,
            range: node.range,
            blockStart: node.body.range[0],
            end: node.body.range[1]
          });
        } else if (typeof parent.key !== 'undefined') {
          if (parent.key.type === 'Identifier') {
            if (parent.value === node && parent.key.name) {
              return list.push({
                name: parent.key.name,
                params: node.params,
                range: node.range,
                blockStart: node.body.range[0],
                end: node.body.range[1]
              });
            }
          }
        }
      }
    });
    return list;
  };

  exports.parse = function(code) {
    var functions, tree;
    tree = esprima.parse(code, {
      loc: true,
      range: true
    });
    functions = getFunctions(tree, code);

    functions = functions.filter(function(fn) {
      return fn.name !== '[Anonymous]';
    });

    return functions;
  };

  exports.interpret = function(code, tree) {
    var functions;

    functions = getFunctions(tree, code);

    functions = functions.filter(function(fn) {
      return fn.name !== '[Anonymous]';
    });

    return functions;
  };
}).call(this);