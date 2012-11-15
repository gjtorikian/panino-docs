/** internal, section: Plugins
/** internal, section: Plugins
 *  Renderers.json(Panino) -> Void
 *
 *  Registers JSON renderer as `json`.
 *
 *
 *  ##### Example
 *
 *      Panino.render('json', ast, options, function (err) {
 *        // ...
 *      });
 *
 *
 *  ##### Options
 *
 *  - **output** (String): File where to output rendered documentation.
 *  - **title** (String): Page title template. You can use `{package.*}`
 *    variables here.
 *    Default: `'{package.name} {package.version} API documentation'`
 **/


'use strict';


// stdlib
var fs = require('fs');
var path = require('path');

var wrench = require('wrench');

module.exports = function (Panino) {
  Panino.registerRenderer('json', function render_json(ast, options, callback) {
    
    if (!options.keepOutDir) {
      wrench.rmdirSyncRecursive(options.output, true);
    }
    wrench.mkdirSyncRecursive(options.output, "0755");
    
    if (options.formatJSON) {
      fs.writeFile(path.join(options.output, path.basename(options.output).replace("/", "").replace("\\", "") + ".json"), JSON.stringify({
        title: options.title,
        date: (new Date()).toUTCString(),
        tree: ast.tree
      }, null, "    "), callback);
    }
    else {
      fs.writeFile(path.join(options.output, path.basename(options.output).replace("/", "").replace("\\", "") + ".json"), JSON.stringify({
        title: options.title,
        date: (new Date()).toUTCString(),
        tree: ast.tree
      }), callback);
    }
  });
};
