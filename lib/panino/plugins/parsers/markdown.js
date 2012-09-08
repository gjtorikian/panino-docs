/** internal, section: Plugins
 *  Parsers.panino(Panino) -> Void
 *
 *  Registers Panino parser as `panino`.
 *
 *
 *  ##### Example
 *
 *      Panino.parse(files, options, function (err, ast) {
 *        // ...
 *      });
 **/


'use strict';


// stdlib
var fs = require('fs');


// 3rd-party
var _ = require('underscore');


// internal
var js_parser = require("./javascript");

////////////////////////////////////////////////////////////////////////////////

// this is horrible and i am ashamed
function parse_markdown(file, options, callback) { 
  fs.readFile(file, 'utf8', function (err, source) {
    if (err) {
      callback(err);
      return;
    }
    var sourceLines = source.split("\n");
    var metaExpr = /\(metadata\s*:\s*([^=]+):([^\-]+)\)\n*/g;
    var metaString;

    var firstClass = {
        found: false,
        name: ""
    };
    var re;

    if (re = sourceLines[0].match(/^\#{1}\s+(.+)/)) { // if #, it's a title
        var metaString = sourceLines[1].match(metaExpr);

        if (!metaString) {
            console.error("In " + file + " you started with #, but provided no context--that's bad.");
            process.exit(0);
        }

        metaString = metaString[0].replace("(", "{").replace(")", "}").replace("metadata", '"metadata"');
        var metaJson = JSON.parse(metaString);

        if (metaJson.metadata.type == 'misc') {
            var title = sourceLines[0].substr(2).replace(/(\w) /g, "$1");
            sourceLines[0] = "/** section: " + title + "\n";
            sourceLines[1] = "* class " + title;

            for (l = 2; l < sourceLines.length; l++) {
                sourceLines[l] = "* " + sourceLines[l];
            }
            sourceLines.push("**/");
            return js_parser("", {registered: true, source: sourceLines.join("\n"), file: file, options: options, callback: callback});
        }
        else {
            console.error("In " + file + " I did not understand the type '" + metaJson.type + "'");
        }
    }
    else if (re = sourceLines[0].match(/^\#{2}\s+(.+)/)) { // if ##, it's a class
        if (!firstClass.found) {
            firstClass.found = true;
            firstClass.name = re[1];
            sourceLines[0] = "/**\n* " + "class " + firstClass.name;
            if ( (metaString = sourceLines[1].match(metaExpr) ) ) {
                var metaString = metaString[0].replace("(", "").replace(")", "");
                sourceLines[0] = "/** " + metaString + "\n* " + "class " + firstClass.name;
                sourceLines[1] = "* ";
            }
            else
                sourceLines[1] = "* ";
        }
    }
    else {
        console.error("First line in " + file + " is neither # or ##--that's bad.");
        process.exit(1);
    }

    for (var l = 2; l < sourceLines.length; l++) {
        if (re = sourceLines[l].match(/^\#{2}\s+(.+)/)) { // if ##, it's a class
            if (!firstClass.found) {
                firstClass.found = true;
                firstClass.name = re[1];
                sourceLines[l] = "/**\n* " + sourceLines[l].replace("##", "class " + firstClass.name);
            }
            else {
                if (re[1].indexOf("<") < 0) sourceLines[l] = "**/\n\n/**\n* " + "class " + re[1] + " < " + firstClass.name;
            }
        }
        else if (sourceLines[l].match(/^\#{3}\s+/)) { // if ###, it's a member
            var startingDefPos = l;
            sourceLines[l] = "**/\n\n/**\n* " + sourceLines[l].replace("###", "");
            var n = l + 1;

            while (sourceLines[n].match(/^\#{3}\s+/)) { // it has aliases
                sourceLines[n] = " " + sourceLines[n].replace("###", "");
                n++;
            }

            var tagRE = sourceLines[n].match(/^(\((.+)\))$/);
            if (tagRE) { // if it's got tags, add them appropriately to the starting /**
                sourceLines[l] = sourceLines[l].replace("/**", "/** " + tagRE[2]);
                sourceLines[n] = "";
                n++;
            }
           // while (sourceLines[n].match(/[-|*|+]\s*.+?\s*{.+?}\s*/)) {
             //   sourceLines[n] = sourceLines[n].replace("{", "(").replace("}", "):");
             /*   n++;
            } */
        }
        else { // catch tags after param lists
            var tagRE = sourceLines[l].match(/^(\((.+)\))$/);
            var indentedParam = sourceLines[l].match(/^\s+[*|-]/);
            
            if (tagRE) { // if it's got tags, add them appropriately to the starting /**
                sourceLines[startingDefPos] = sourceLines[startingDefPos].replace("/**", "/** " + tagRE[2]);
                sourceLines[l] = "";
            }
            else if (indentedParam) {
                // noop
            }
            else { // everything else just prefix with a "*"
                 sourceLines[l] = "*" + sourceLines[l];
            }
        }
    }

    sourceLines.push("**/");

    js_parser("", {registered: true, source: sourceLines.join("\n"), file: file, options: options, callback: callback});
  });
}


////////////////////////////////////////////////////////////////////////////////


module.exports = function (Panino) {
  Panino.registerParser('.md', parse_markdown);
  Panino.registerParser('.markdown', parse_markdown);
};
