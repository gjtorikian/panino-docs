/** internal, section: Plugins
 *  Renderers.html(Panino) -> Void
 *
 *  Registers HTML renderer as `html`.
 *
 *
 *  ##### Example
 *
 *      Panino.render('html', ast, options, function (err) {
 *        // ...
 *      });
 *
 *
 **/


'use strict';

module.exports = function html(Panino) {
  Panino.registerRenderer('html', require("render-html-from-ast"));
};