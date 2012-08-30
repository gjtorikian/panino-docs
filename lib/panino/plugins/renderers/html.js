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
 *  ##### Options
 *
 *  - **output** (String): Directory where to output rendered documentation.
 *  - **title** (String): Page title template. You can use `{package.*}`
 *    variables here.
 *    Default: `'{package.name} {package.version} API documentation'`
 *  - **index** (String): Intro text.
 *  - **github** (String): URL to a project on GitHub. If given, a nice ribbon
 *    with link to given URL will be added. You can use `{package.*}`
 *    variables here.
 *    Default: `Null`
 *  - **brokenLinks** (show|hide|throw): What to do if broken link occurred.
 *    Default: `'show'`
 **/


'use strict';


// stdlib
var fs   = require('fs');
var path = require('path');
var util = require('util');

// 3rd-party
var _       = require('underscore');
var FsTools = require('fs-tools');
var Jade    = require('jade');
var namp    = require('namp');
var wrench = require("wrench");
var md_conrefs = require('markdown_conrefs');
var funcDocs = require('functional-docs');

// internal
var template  = require('../../common').template;

var additionalObjsJSON;

var extendedObjs = {};

function render_html(panino, options, callback) {
  var file, str, fn, list, id, obj;

  md_conrefs.init(panino.files);

  // prepare rendering function
  // TODO: store it for further reuse, and get rid of jade dependency?
  file = path.join(options.skin);
  str = fs.readFileSync(file, 'utf8');
  fn = Jade.compile(str, {
    filename: file,
    pretty: false
  });

  options.github = template(options.github || '', {package: options.package});

  if (options.additionalObjs !== undefined) {
      try {
          additionalObjsJSON = JSON.parse(fs.readFileSync(options.additionalObjs));
      }
      catch (e) {
          console.error("Trouble parsing " + options.additionalObjs + "! I'm not adding these...");
      }
  }

  // it's illegal to have slashes in HTML elements ids.
  // replace them with dashes
  list = panino.list;

  for (id in list) {
    if (list.hasOwnProperty(id)) {
      obj = list[id];
      // path should be HTML valid id
      obj.path = obj.path.replace(/\//g, '-');
    }
  }

  // render link
  // text can be a reference to an id--or for globals, a string itself
  // N.B. logic is way tricky to move to templates.
  // beside, this function is used as parameter in some Array#map() operations
  function link(text, classes, short) {
      if (typeof text === 'object') {
        if (text.id  && text.id.indexOf("new") == 0) {
          text.id = text.id.substring(text.id.indexOf(" ") + 1) + ".new"; // constructor
        }
        else if (text.name) {
          // no-op; it's a global (i.e. 'string'), do stuff below
        }
      }

      // 'text' has manipulation based on if statements above
      var obj = list[text.id] || list[text] || {id: text};
      obj.name = text.name;
      //var obj = fullList[text.id] || fullList[text] || text;
      //obj.name = text.name;

      // HACK
      if (obj.id == "Void") {
        return "Void";
      }

      // might be global or from somewhere else
      if (obj.file === undefined) {
          if (additionalObjsJSON !== undefined) {
              var url = additionalObjsJSON[text];

              if (url === undefined) {
                  var id = text.id || text.globalId;  // not sure why, markdown nonce needs specific id

                  url = additionalObjsJSON[id];

                  if (url === undefined) {
                      console.error(util.inspect(text) + " has no valid link! (classes: " + classes + ")");
                      console.trace();
                      process.exit(1);
                  }
              }

              if (text.name)
                text = text.name;

              obj = {file: url, id: text, name: text, isAdditional: true};
          }
      }

      if (obj.file === undefined) {
          console.error("While trying to make a link, I do not know what this is: " + util.inspect(obj) +  " (classes: " + classes + ")");
          console.trace();
          process.exit(1);
      }
         
      var linkFile = obj.file;

      if (options.split) {
        // outFile: the file where I am;
        // linkFile: the file I am going to
        var hrefRE = new RegExp("^" + outFile);
        var m;

        if (!obj.isAdditional) {
          linkFile = path.basename(linkFile, path.extname(linkFile));

          // if we're creating a link to the exact file we're in
          // just keep the '#' to avoid reloading the whole page
          if ( (m = linkFile.match(hrefRE) ) ) {
              linkFile = "#" + obj.id;
          }
          else {
            linkFile = linkFile + ".html#" + obj.id;
          }
        }
      }
      else {
        if (!obj.isAdditional) {
          linkFile = "index.html";
        }
      }

      if (classes === undefined)
          classes = "";

      // TODO: why do I have to do this?
      if (!obj.name) {
        var idx = obj.id.indexOf('@'); // get position of @event start

        // Otherwise get property/method delimiter position
        if (idx === -1) {
          idx = Math.max(obj.id.lastIndexOf('.'), obj.id.lastIndexOf('#'));
        }

        if (-1 === idx) {
          obj.name =  obj.id;
        } else {
          obj.name = obj.id.substring(idx + 1);
        }
      }

      if (obj.extension) {
        var srcId = obj.id.slice(0,  0 - obj.name.length - 1); // is this safe to assume?
        // HACK: some maths is wrong somewhere and I continue to get an invalid object, unless I add "."
        var srcObj = list[srcId] || list["." + srcId]; 

        if (srcObj !== undefined) {
          linkFile = linkFile.replace(/.+\.html/, srcId.toLowerCase() + ".html");
        }
      }

      var r = '<a href="' + linkFile.replace("@", ".") +
              '" class="' + classes +
              '" title="' + obj.id + (obj.type ? ' (' + obj.type + ')' : '') +
              '" data-id="' + obj.id + '">';
      r += short ? obj.name : obj.id;
      r += '</a>';

      return r;
    }

    // given signature object, recompose its textual representation
    function signature(obj, sig, classes) {
        if (typeof obj === 'string') {
            obj = list[obj];
        }
        var r;
        var id = obj.id;
        var type = obj.type;

        // oh, it's a constructor?
        if (obj.id.indexOf(".new") >= 0) {
            r = '<span class="constructorIdentifier">new </span>'; // if users want to hide or style this via CSS, they can
            r += '<span id="' + id + '" class="member-name ' + (classes || []).join(' ') + '">';
            r += obj.id.substring(0, obj.id.indexOf(".new")) + '</span>';
        }
        else if (type != "callback" && type != "event") { // method or property
            var className = obj.id.substring(0, obj.id.lastIndexOf("."));
            var memberName = obj.id.substring(obj.id.lastIndexOf(".") + 1);

            r = '<span id="' + id + '" class="member-name ' + (classes || []).join(' ') + '">'; // users can hide object name via CSS
            r += '<span class="sigClassName">' + className + '.</span><span class="sigMemberName">' + memberName + '</span></span>';
        }
        else if (type == "event") { // bah, an event !
            var parts = obj.id.split("@");

            var className = parts[0];
            var eventName = parts[1];

            r = '<span class="eventObjName">' + className + '</span><span class="eventListenerStart">.on("</span>';
            r += '<span id="' + id.replace("@", ".") + '" class="member-name eventMember ' + (classes || []).join(' ') + '">' + eventName + '</span>';
        }
        else {
            r = obj.id;
        }

        if (sig.arguments) {
            if (type != 'event') r += '(<span class="sigArgList">';
            else r += '<span class="eventListenerClose">", </span><span class="eventFunctionOpen">function(</span>'

            sig.arguments.forEach(function (sigArg, sigIdx, sigArgs) {
                var skip_first, a, value;
                // skip the first bound argument for prototype methods
                skip_first = obj.bound && obj.id.indexOf('#') >= 0;

                // turns the argument types into links
                if (obj.arguments && obj.arguments[sigIdx]) {
                    var argLink = "";

                    var currArg = obj.arguments[sigIdx];

                    if (currArg.name != sigArg.name) // in the event of, say, multiple signatures
                    {
                        var s;
                        for (s = 0; s < obj.arguments.length; s++) {
                            if (obj.arguments[s].name == sigArg.name) {
                                //console.log("swaped arg!");
                                currArg = obj.arguments[s];
                                break;
                            }
                        }
                        if (s == obj.arguments.length) {
                            //console.error("Couldn't find suitable argument replacement for " + currArg.name + " around " + obj.id);
                        }
                    }

                    currArg.types.forEach(function (currArgType, currIdx, currArgs) {
                        argLink += link(currArgType, 'argument ' + (classes || []).join(' '));

                        if (currIdx < currArgs.length - 1) argLink += " | ";
                    });
                    a = argLink + " " + sigArg.name;
                }
                else a = sigArg.name;

                // argument can be callback
                if (sigArg.arguments) {
                    a = signature({
                        id: a,
                        type: "callback"
                    }, sigArg);
                }
                if (!sigIdx && skip_first) {
                    return; //a = '@' + a;
                }
                if (typeof sigArg.default_value !== 'undefined') {
                    // apply custom stringifier
                    value = JSON.stringify(sigArg.default_value, function (k, v) {
                        if (v instanceof RegExp) {
                            // FIXME: get rid of quotes, if possible
                            v = v.source;
                        }
                        else if (v === 'null') {
                            v = null;
                        }
                        return v;
                    });
                    a = a + ' = ' + value;
                }
                // compensate for possibly skipped first argument
                if (sigIdx > (skip_first ? 1 : 0)) {
                    a = ', ' + a;
                }
                if (sigArg.ellipsis) {
                    a += '...';
                }
                if (sigArg.optional) {
                    a = '[' + a + ']';
                }
                r += a;
            });
            if (type != "event") r += '</span>)';
            else r += '<span class="eventFunctionClose">))</span>';
        }

        return r;
    }

    function argumentTable(args, tableClasses, trClasses, tdClasses) {
        var r = '<table class="argumentTable ' + (tableClasses || []).join(' ') + '">';

        for (var a in args) {
            r += '<tr class="argumentRow ' + (trClasses || []).join(' ') + '">';
            r += '<td class="argName ' + (tdClasses || []).join(' ') + '">' + args[a].name + '</td>';

            var requiredText = args[a].optional ? "Optional. " : "Required. ";
            
            r += '<td class="argType" ' + (tdClasses || []).join(' ') + '">';
            
            for (var i = 0; i < args[a].types.length; i++) {
                if (i == args[a].types.length - 1)
                    r += link(args[a].types[i])
                else
                    r += link(args[a].types[i]) + " | ";
            }            
            
            r += '</td>';
            
            r += '<td class="argDescription ' + (tdClasses || []).join(' ') + '">' + markdown(requiredText + args[a].description) + '</td>';
            r += '</tr>';
        }

        r += '</table>';

        return r;
    }

    function returnLink(obj, ret, classes) {
        var non_link = (obj.type == 'constant' || ret.type == 'Void' || ret.type == 'null'|| ret.type == '`null`' || ret.type == 'undefined' || ret.type == '`undefined`' || ret.type === undefined);
        var text = "";
        var isGlobal = false;
        var linkText = ret.type;

        if (non_link)
            text = '<span class="returnType ' + (classes || []).join(' ') + '" title="' + obj.id + (obj.type ? ' (' + obj.type + ')' : '') + '">' + linkText + '</span>';
        else {
            text = link(ret.type, 'returnType ' + (classes || []).join(' '));         

            if (ret.ellipsis)
                text = text + '...';
            if (ret.array) {
                text = '[ ' + text + ' ]';
            }
        }

        return text;
    }

    function returnTable(returnVals, tableClasses, trClasses, tdClasses) {
        var r = '<table class="returnTable ' + (tableClasses || []).join(' ') + '">';

        for (var v in returnVals) {
            r += '<tr class=" ' + (trClasses || []).join(' ') + '">';

            var preText = "";
            var postText = "";

            if (returnVals[v].isArray === true) {
                preText = link("Array") + " of ";
                postText = "s";
            }
            
            r += '<td class="returnType ' + (tdClasses || []).join(' ') + '">' + preText + link(returnVals[v].type) + postText + '</td>';
            r += '<td class="returnDescription ' + (tdClasses || []).join(' ') + '">' + markdown(returnVals[v].description, true) + '</td>';
            r += '</tr>';
        }

        r += '</table>';

        return r;
    }

  // convert markdown to HTML
  function markdown(text, inline) {
    var r;

    r = md_conrefs.replaceConref(text);

    r = namp(r).html;

    // inline markdown means to strip enclosing tag, which in this case is <p>
    if (inline === true) {
        r = r.slice(3, -5);
    }

    // FIXME
    // desugar [[foo#bar]] tokens into local links
    // N.B. in order to not apply conversion in <code> blocks,
    // we first store replace code blocks with nonces
    var codes = {};
    r = r.replace(/(<code>[\s\S]*?<\/code>)/g, function (all, def) {
      var nonce = Math.random().toString().substring(2);
      codes[nonce] = def;
      return '@-=@=-@' + nonce + '@-=@=-@';
    });

    // convert [[link]] to links
    r = r.replace(/\[\[([\s\S]+?)\]\]/g, function (all, def) {
      def = def.split(/\s+/);
      id = def.shift();
      // invalid references don't produce links
      /*if (!list[id]) {// it's in a different file--list only refers to current page
          obj = fullList[id];

          if (obj === undefined) { // it might be global
              obj = {};
              obj.id = id;
          }
      }*/
      //else {
          obj = list[id];
      //}

      var obj = _.extend({name: def.join(' ') || id, globalId: id}, list[id]);
      obj.name = def.join(' ') || id;

      if (obj.type === undefined) {
        console.error("You tried to create a short link to an object that doesn't exist!");
        console.error(obj);
        process.exit(1);
      }
      
      // lame, but I'm tired of writing stuff like [[child_process.fork `child_process.fork()`]]
      // If I didn't do this, it'd come out as an unstyled link
      if (def.length == 0 && obj.type.indexOf("property") < 0) {
        obj.name = "<code>" + obj.name + "()</code>";
      }

      return link(obj, ['link-short'], true);
    });

    // restore code blocks, given previously stored nonces
    r = r.replace(/@-=@=-@(\d+)@-=@=-@/g, function (all, nonce) {
      return codes[nonce];
    });

    return r;
  }

  var vars, html;

  var outAssetsDirName = options.outputAssets || path.join(options.output, path.basename(options.assets));
  wrench.rmdirSyncRecursive(options.output, true);
  wrench.mkdirSyncRecursive(options.output, "0755");
  wrench.mkdirSyncRecursive(outAssetsDirName, "0755");

  vars = _.extend({}, options, {
    tree: panino.tree,
    date: (new Date()).toUTCString(),
    //--
    link:           link,
    markdown:       markdown,
    showInternals:  !!options.showInternals,
    signature:      signature,
    argumentTable: argumentTable,
    returnLink: returnLink,
    returnTable: returnTable,
    title: options.title,
    index: options.index,
    isIndex: false
  });

  if (options.split) {
    var keyMapping =  { };
    for (var k = 0; k < vars.tree.children.length; k++) {
      var id = vars.tree.children[k].id;
      keyMapping[id] = k;
    }

    vars.fullList = panino.tree;

    for (var key in list) {
      if (list.hasOwnProperty(key) && list[key].type === "class" && list[key].superclass === undefined) {
        var outFile = list[key].file;
        outFile = path.basename(list[key].file, path.extname(outFile));

        // collect context for rendering function
        vars = _.extend(vars, {
          list: list[key],
          fileName: list[key].file,
          classId: list[key].id,
          outFile: outFile
        });

        vars.tree = { };
        vars.tree.children = [panino.tree.children[keyMapping[key]]];

        console.log("Rendering " + outFile);

        // render HTML
        html = fn(vars);
        fs.writeFile(path.join(options.output, outFile + '.html'), html);
      }
    }

    if (options.index) {
        vars.isIndex = true;
        vars.fileName = options.index;
        vars.outFile = "index";

        var content = fs.readFileSync(options.index, "utf8");
        vars.content = markdown(content);

        html = fn(vars);

        fs.writeFileSync(path.join(options.output, vars.outFile + '.html'), html);
    }
    moveAssets(outAssetsDirName, options, callback);
  }
  else {
    vars = _.extend(vars, {
      list: panino.list
    });

    html = fn(vars);
    fs.writeFile(path.join(options.output, 'index.html'), html, function() {
      moveAssets(outAssetsDirName, options, callback);
    });
  }
}

function moveAssets(outAssetsDirName, options, callback) {
  if (options.assets) {
    console.log("Copying assets...", options.assets, outAssetsDirName);
    wrench.copyDirSyncRecursive(options.assets, outAssetsDirName, {
        preserve: true
    });
  }

  runTests(options, callback);
}

function runTests(options, callback) {
  if (!options.disableTests) {
    funcDocs.runTests([path.resolve(options.output)], {
        stopOnFail: false,
        ext: ".html"
    }, function (err) {
        if (err) console.error(err);
        callback(err);
    });
  }
  else {
    callback();
  }
}

module.exports = function html(Panino) {
  Panino.registerRenderer('html', render_html);
};
