'use strict';

var fs = require('fs');
var Path = require('path');
var util = require('util');

var parser = require('./parser').parser;
var md_conrefs = require('markdown_conrefs');

// keep a list of outside objects, so that we can link to proper documentation when required
var additionalObjsJSON;

//
// helpers
//
function extend(o, plus) {
    var r = {},
        i;
    for (i in o) {
        if (o.hasOwnProperty(i)) {
            r[i] = o[i];
        }
    }
    if (plus) {
        for (i in plus) {
            if (plus.hasOwnProperty(i)) {
                r[i] = plus[i];
            }
        }
    }
    return r;
}

/**
 * class Panino
 *
 * Handles documentation tree.
 **/

/**
 * new Panino(files, options)
 * - files (Array): array of source file paths
 * - options (Hash): controlling options
 *
 * Read source `files` and compose the documentation tree.
 **/
function Panino(files, options) {

    // options
    this.options = extend({}, options);

    // documentation tree consists of sections, which are populated with documents
    var list = {
        '': {
            id: '',
            type: 'section',
            children: [],
            description: '',
            short_description: '',
            ellipsis_description: ''
        },
    },
        t, parted, len, i, id, idx, p, pid, d, g, tree, children;

    if (options.isIndex === true) {
        this.indexContent = fs.readFileSync(files[0], "utf8");
    }
    
    // parse specified source files
    files.forEach(function (file) {
        if (options.silent !== true)
            console.log('Compiling file', file);

        var parentDir = file.split("/")[2];

        // parse file
        var text, panini, id, d, d1;
        try {
            text = fs.readFileSync(file, 'utf8');

            if (options.extension == 'md' || options.extension == 'markdown') {
                text = convertMD(file, text);
                //console.warn(text);
            }

            if (options.additionalObjs !== undefined) {
                try {
                    additionalObjsJSON = JSON.parse(fs.readFileSync(options.additionalObjs));
                }
                catch (e) {
                    console.error("Trouble parsing " + options.additionalObjs + "! I'm not adding these...");
                }
            }

            // set default parse rules
            // TODO: these seem complicated to set up...
            if (options.parseOptions !== undefined) {
                try {
                    var parseOptionsJSON = JSON.parse(fs.readFileSync(options.parseOptions));

                    if (parseOptionsJSON.useAsterisk === true) {
                        parser.yy.useAsterisk = true;
                        parser.yy.useDash = false;

                    }
                    else if (parseOptionsJSON.useDash === true) {
                        parser.yy.useAsterisk = false;
                        parser.yy.useDash = true;

                    }
                    else {
                        parser.yy.useAsterisk = false;
                        parser.yy.useDash = true;
                    }

                    if (parseOptionsJSON.useArrow === true) {
                        parser.yy.useArrow = true;
                        parser.yy.useComma = false;

                    }
                    else if (parseOptionsJSON.useComma === true) {
                        parser.yy.useArrow = false;
                        parser.yy.useComma = true;

                    }
                    else {
                        parser.yy.useArrow = true;
                        parser.yy.useComma = false;
                    }                    

                    // not yet in use
                   // parser.yy.useParentheses = parseOptionsJSON.useParentheses || true;
                   // parser.yy.useCurlies = parseOptionsJSON.useCurlies || false;
                }
                catch (e) {
                    console.error("Trouble parsing " + options.parseOptions + "! I'm not adding these...");
                }
            }

            // TODO: consider amending failing document inplace.
            // Say, if it doesn't parse, insert a fake '*' line at failing `line` and retry
            panini = parser.parse(text);

            //console.log(panini)
            // do pre-distribute early work
            for (id in panini) {

                if (panini.hasOwnProperty(id) && panini[id].hide !== true) {
                    d = panini[id];
                    // assign hierarchy helpers
                    d.aliases = [];
                    d.children = [];
                    
                    d.parentDir = parentDir;
                    d.fullPath = file;
                    d.fileName = Path.basename(file, Path.extname(file)); // can be used in templates
                    d.resultingFile =  d.fileName + ".html#" + d.id; // this is stupid

                    
                    if (d.type === 'class') {
                        d.subclasses = [];
                    }
                    // collect sections
                    if (d.type === 'section') {
                        list[d.id] = d;
                        // collect flat list
                    }
                    else {
                        // elements with undefined section get '' section,
                        // and will be resolved later, when we'll have full
                        // element list
                        list[(d.section || '') + '.' + d.id] = d;
                        // bound methods produce two methods with the same description but different signatures
                        // E.g. Element.foo(@element, a, b) becomes
                        // Element.foo(element, a, b) and Element#foo(a, b)
                        if (d.type === 'method') {
                            if (d.bound) {
                                d1 = extend(d);
                                d1.id = d.id.replace(/(.+)\.(.+)/, '$1#$2');
                                // link to methods
                                d.bound = d1.id;
                                d1.bound = d.id;
                                // insert bound method clone
                                list[(d.section || '') + '.' + d1.id] = d1;
                            }

                            // need to state optionality of arguments object here; cannot be done in parser
                            for (var sig in d.signatures) {
                                var args = d.signatures[sig].args;
                                for (var a in args) {
                                    if (args[a] !== undefined && args[a].optional === true) {
                                        for (var argument in d.arguments) {
                                            if (args[a].name === d.arguments[argument].name) {
                                                d.arguments[argument].optional = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // compose links to source files
                    if (options.formatLink) {
                        d.href = options.formatLink(file, d.line);
                    }
                }
            }
        }
        catch (err) {
            console.error('FATAL:', file, err.message || err);
            process.exit(1);
        }
    });


    // for each element with undefined section try to guess the section
    // E.g. for ".Ajax.Updater" we try to find "SECTION.Ajax" element.
    // If found, rename ".Ajax.Updater" to "SECTION.Ajax.Updater"
    t = Object.keys(list).sort();
    parted = t.map(function (id) {
        return id.split(/[.#@]/);
    });
    len = parted.length;
    // N.B. starting with 1 we skip "" section
    for (idx = 1; idx < len; idx += 1) {
        if (parted[idx][0] === '') {
            for (i = idx + 1; i < len; i += 1) {
                if (parted[idx][1] === parted[i][1] && parted[i][0] !== '') {
                    p = t[idx];
                    // prefix with guessed section
                    t[idx] = parted[i][0] + t[idx];
                    //if (!p) console.log('RENAME [%s] -> [%s]', p, t[idx], parted[idx], parted[i]);
                    // update flat list element, since key and value's id has been changed
                    g = list[p];
                    delete list[p];
                    g.id = p = t[idx];
                    list[p] = g;
                    break;
                }
            }
        }
    }

    // sort elements in case-insensitive manner
    tree = {};
    t = t.sort(function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();

        return a === b ? 0 : a < b ? -1 : 1;
    });
    t.forEach(function (id) {
        tree[id] = list[id];
    });

    // rebuild the tree from the end to beginning.
    // N.B. since the list we iterate over is sorted, we can determine precisely
    // the parent of any element.
    for (i = t.length - 1; i >= 1; i -= 1) {
        id = t[i];
        // parent name is this element's name without portion after
        // the last '.' for class member, '#' for instance member,
        // or '@' for events
        idx = Math.max(id.lastIndexOf('.'), id.lastIndexOf('#'), id.lastIndexOf('@'));
        // no '.' or '#' found? this is top level section. just skip it
        if (idx >= 0) {
            // extract parent name
            pid = id.substring(0, idx);
            // get parent element
            p = tree[pid];
            // no parent element? skip this
            if (p) {
                // parent element found. move this element to parent's children list, maintaing order
                p.children.unshift(tree[id]);
                //tree[id].parent = pid;
                delete tree[id];
            }
        }
    }

    // cleanup list, reassign right ids after we resolved
    // to which sections every element belongs
    for (id in list) {
        if (list.hasOwnProperty(id)) {
            d = list[id];
            delete list[id];

            // compose new id
            d.id = id.replace(/^[^.]*\./, '');
            d.name = d.id.replace(/^.*[.#@]/, '');
            // sections have lowercased ids, to not clash with other elements
            if (d.type === 'section') {
                d.id = d.id.toLowerCase();
            }
            // prototype members have different paths
            // events have different paths as well
            d.path = d.id.replace(/#/g, '.prototype.').replace(/@/g, '.event.');
            delete d.section;
            // prune sections from list
            if (d.type !== 'section') {
                //delete d.children;
                list[d.id] = d;
            }

            // this thing belongs somewhere else
            if (d.extension === true) {
                d.parentDirActual = d.parentDir;
                d.fileNameActual = d.fileName;
                d.resultingFileActual = d.resultingFile;

                var srcId = d.id.slice(0,  0 - d.name.length - 1); // is this safe to assume?
                var srcObj = list[srcId];

                if (srcObj !== undefined) {
                    d.parentDir = srcObj.parentDir;
                    d.fileName = srcObj.fileName;
                    d.resultingFile = d.resultingFile.replace(d.fileNameActual, srcObj.fileName);
                }
            }
        }
    }

    // assign aliases, subclasses, constructors
    // correct method types (class or entity)
    for (id in list) {
        if (list.hasOwnProperty(id)) {
            d = list[id];

            // aliases
            if (d.alias_of && list[d.alias_of]) {
                list[d.alias_of].aliases.push(d.id);
            }

            // classes hierarchy
            if (d.type === 'class') {
                // if the class has a subclass, remove it as a "child" and 
                // place it as its own proper node; let the layout deal with
                // these; but obviously, maintain the relationship through
                //  superclass/subclasses properties
                if (d.superclass && list[d.superclass]) {
                    /*for (var subs in list[d.superclass].children) {
                        if (list[d.superclass].children[subs].id == d.id) {
                           delete list[d.superclass].children[subs];
                        }
                    }*/
                    list[d.superclass].subclasses.push(d.id);
                }
            }

            else if (d.id.indexOf('@') >= 0) { // seems to NEED to be up here to fix signature issues below
                 d.type = 'event';
            }

            // methods and properties
            else if (d.type === 'method' || d.type === 'property') {
                if (d.id.match(/^\$/)) {
                    d.type = 'utility';
                }
                if (d.id.indexOf('#') >= 0) {
                    d.type = 'instance ' + d.type;
                }
                else if (d.id.indexOf('.') >= 0) {
                    d.type = 'class ' + d.type;
                }
                // constructor
            }
            else if (d.type === 'constructor') {
                d.id = 'new ' + d.id.replace(/\.new$/, '');
            }
        }
    }

    // tree is hash of sections.
    // convert sections to uniform children array of tree top level
    children = [];
    for (id in tree) {
        if (tree.hasOwnProperty(id)) {
            if (id === '') {
                children = children.concat(tree[id].children);
            }
            else {
                children.push(tree[id]);
            }
            delete tree[id];
        }
    }

    // seems that if the parent class name > a child's name, the
    // tree renders wrong; for example, cipher should be AFTER crypto
    var sortError = false;
    var parentClass = "";
    for (var c in children) {
        if (children[c].superclass) {
            if (children[c].superclass != children[0].id) {
                parentClass = children[c].superclass;
                sortError = true;
                break;
            }
        }
    }
    if (sortError) {
        for (var c = 0; c < children.length; c++) {
            if (children[c].id == parentClass) {
                var parent = children.splice(c, 1);
                children.unshift(parent[0]);
                break;
            }
        }
    }

    tree.children = children;

    // store tree and flat list
    this.list = list;
    this.tree = tree;

    // for splitting out files
    this.fileName = d.fileName;
    this.title = options.title;
}

// why all this? some groups want to use straight Markdown files, instead of cumbersome
// JS commenting, what with asterisks and the building and the blah. I spent a few hours trying
// to change parser.y to accept lines that don't start with asterisks, and still couldn't
// get it right. Fuck it, we'll do it live.
function convertMD(file, text) {
    var textLines = text.split("\n");

    var firstClass = {
        found: false,
        name: ""
    };
    var re;

    if (re = textLines[0].match(/^\#{1} (.+)/)) { // if #, it's only a title
        var metaExpr = /<!--([^=]+)=([^\-]+)-->\n*/g;
        var metaString = textLines[1].match(metaExpr);

        if (!metaString) {
            console.error("In " + file + " you started with #, but provided no context--that's bad.");
            process.exit(0);
        }

        metaString = metaString[0];
        var meta = metaString.substring(4, metaString.length - 3).split(" ");
        var metaJson = {};
        for (var m in meta) {
            var keyVal = meta[m].split("=");
            metaJson[keyVal[0]] = keyVal[1];
        }
        if (metaJson.type == 'class') {
            if (metaJson.name === undefined) {
                console.error("In " + file + " you told me it's a class, but didn't give me a name.");
                process.exit(0);
            }
            textLines[0] = "/**\n* section: " + textLines[0] + "\n**/";
            textLines[1] = "/**\n* " + textLines[1].replace(metaString, "class " + metaJson.name);
            firstClass.found = true;
            firstClass.name = metaJson.name;
        }
        else if (metaJson.type == 'misc') {
            var title = textLines[0].substr(2).replace(/(\w) /g, "$1");
            textLines[0] = "/** section: " + title + "\n";
            textLines[1] = "* class " + title;

            for (l = 2; l < textLines.length; l++) {
                textLines[l] = "* " + textLines[l];
            }
            textLines.push("**/");
            return textLines.join("\n");
        }
        else {
            console.error("In " + file + " I did not understand the type '" + metaJson.type + "'");
        }
    }
    else if (re = textLines[0].match(/^\#{2} (.+)/)) { // if ##, it's a class
        if (!firstClass.found) {
            firstClass.found = true;
            firstClass.name = re[1];
            textLines[0] = "/**\n* " + "class " + firstClass.name;
            textLines[1] = "* "; // will this ever have metadata?
        }
    }
    else {
        console.error("First line in " + file + " is neither # or ##--that's bad.");
        process.exit(1);
    }

    for (var l = 2; l < textLines.length; l++) {
        if (re = textLines[l].match(/^\#{2} (.+)/)) { // if ##, it's a class
            if (!firstClass.found) {
                firstClass.found = true;
                firstClass.name = re[1];
                textLines[l] = "/**\n* " + textLines[l].replace("##", "class " + firstClass.name);
            }
            else {
                if (re[1].indexOf("<") < 0) textLines[l] = "**/\n\n/**\n* " + "class " + re[1] + " < " + firstClass.name;
            }
        }
        else if (textLines[l].match(/^\#{3} /)) { // if ###, it's a member
            textLines[l] = "**/\n\n/**\n* " + textLines[l].replace("###", "");
            var n = l + 1;

            while (textLines[n].match(/^\#{3}\s*/)) { // it has aliases
                textLines[n] = " " + textLines[n].replace("###", "");
                n++;
            }

            var tagRE = textLines[n].match(/^(\((.+)\))/);
            if (tagRE) { // if it's got tags, add them appropriately to the starting /**
                textLines[l] = textLines[l].replace("/**", "/** " + tagRE[2]);
                textLines[n] = "";
                n++;
            }
            while (textLines[n].match(/[-|*|+]\s*.+?\s*{.+?}\s*/)) {
                textLines[n] = textLines[n].replace("{", "(").replace("}", "):");
                n++;
            }
        }
        else { // everything else just prefix with a "*"
            textLines[l] = "*" + textLines[l];
        }
    }

    textLines.push("**/");

    return textLines.join("\n");
}

/**
 * Panino#toAST(options) -> String
 *
 * Renders this documentation tree to JSON string.
 **/
Panino.prototype.toAST = function (options) {
    var list = {},
        id, d;
    for (id in this.list) {
        if (this.list.hasOwnProperty(id)) {
            d = this.list[id];
            list[id] = {
                id: d.id,
                type: d.type,
                name: d.name,
                path: d.path,
                parent: d.parent,
                section: d.section,
            };
        }
    }
    return JSON.stringify(extend(options, {
        list: this.list,
        tree: this.tree,
        date: (new Date()).toUTCString(),
    }), null, "\t");
};

/**
 * Panino#toHTML(options) -> String
 *
 * Renders this documentation tree to HTML string.
 **/
Panino.prototype.toHTML = function (options, fullList, outFile) {

    var Jade = require('jade'),
        namp = require('namp'), 
        marked = require('marked'),

        // prepare rendering function
        // TODO: store it for further reuse, and get rid of jade dependency?
        path = Path.join(options.skin, 'templates', 'layout.jade'),
        str = fs.readFileSync(path, 'utf8'),
        fn = Jade.compile(str, {
            filename: path,
            pretty: true
        }),

        list = this.list,
        id, obj, vars, html;

    // it's illegal to have slashes in HTML elements ids.
    // replace them with dashes
    for (id in list) {
        if (list.hasOwnProperty(id)) {
            obj = list[id];
            // path should be HTML valid id
            obj.path = obj.path.replace(/\//g, '-');
        }
    }


    // convert markdown to HTML
    function markdown(text, inline) {
        var r, codes;

        r = md_conrefs.replaceConref(text);

        r = marked(r);

        //r = namp.toHTML(text, {highlight: true} ).html; TODO

        // inline markdown means to strip enclosing tag. <p /> in this case
        if (inline === true) {
            r = r.slice(3, -5);
        }

        // desugar [[foo#bar]] tokens into local links
        // N.B. in order to not apply conversion in <code> blocks,
        // we first store replace code blocks with nonces
        codes = {};
        r = r.replace(/(<code>[\s\S]*?<\/code>)/g, function (all, def) {
            var nonce = Math.random().toString().substring(2);
            codes[nonce] = def;
            return '@-=@=-@' + nonce + '@-=@=-@';
        });
        // convert [[link]] to links
        r = r.replace(/\[\[([\s\S]+?)\]\]/g, function (all, def) {
            def = def.split(/\s+/);
            id = def.shift();

            if (id.match(/\\_/)) { // TODO: where does this come from ?
                id = id.replace(/\\_/g, "_");
            }

            var obj;

            if (!list[id]) { // it's in a different file--list only refers to current page
                obj = fullList[id];

                if (obj === undefined) { // it might be global
                    obj = {};
                    obj.id = id;
                }
            }
            else {
                obj = list[id];
            }

            obj.name = def.join(' ') || id;

            return link(obj, ['link-short'], true);
        });

        // restore code blocks, given previously stored nonces
        r = r.replace(/@-=@=-@(\d+)@-=@=-@/g, function (all, nonce) {
            return codes[nonce];
        });

        return r;
    }

    // render link
    // text can be a reference to an id--or for globals, a string itself
    function link(text, classes, short) {
        if (typeof text === 'string' && text.indexOf("new") == 0) {
            text = text.substring(text.indexOf(" ") + 1) + ".new";
        }

        var obj = fullList[text.id] || fullList[text] || text;

        // might be global or from somewhere else
        if (!obj.resultingFile) {
                if (additionalObjsJSON !== undefined) {
                    var url = additionalObjsJSON[text];
                    
                    if (url === undefined) {
                        url = additionalObjsJSON[text.id];

                        if (url === undefined) {
                            console.error(util.inspect(text) + " has no valid link! (classes: " + classes + ")");
                            console.trace();
                            process.exit(1);
                        }
                    }
                    url = url.replace("%s", text);
                    obj = {};
                    obj.resultingFile = url;
                    obj.id = text;
                }
            }

        if (!obj.resultingFile) {
            console.error("While trying to make a link, I do not know what this is: " + util.inspect(obj) +  " (classes: " + classes + ")");
            console.trace();
            process.exit(1);
        }
           
        var linkFile = obj.resultingFile;

        var hrefRE = new RegExp("^" + outFile);
        var m;

        // if we're creating a link to the exact file we're in
        // just keep the '#' to avoid reloading the whole page
        if ( (m = linkFile.match(hrefRE) ) ) {
            linkFile = linkFile.substring(outFile.length);
        }

        if (classes === undefined)
            classes = "";
            
        var r = '<a href="' + linkFile +
                '" class="' + classes +
                '" title="' + obj.id + (obj.type ? ' (' + obj.type + ')' : '') +
                '" data-id="' + obj.id + '">';
        r += typeof short === 'string' ? short : short ? obj.name : obj.id;
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
        if (obj.id.indexOf("new") == 0) {
            r = '<span class="constructorIdentifier">new </span>'; // if users want to hide or style this via CSS, they can
            r += '<span id="' + id + '" class="member-name ' + (classes || []).join(' ') + '">';
            r += obj.id.substring(obj.id.indexOf(" ") + 1) + '</span>';
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
            r += '<span id="' + id + '" class="member-name eventMember ' + (classes || []).join(' ') + '">' + eventName + '</span>';
        }
        else {
            r = obj.id;
        }

        if (sig.args) {
            if (type != 'event') r += '(<span class="sigArgList">';
            else r += '<span class="eventListenerClose">", </span><span class="eventFunctionOpen">function(</span>'

            sig.args.forEach(function (sigArg, sigIdx, sigArgs) {
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
                if (sigArg.args) {
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

            var requiredText = args[a].optional ? "Optional." : "Required.";
            
            r += '<td class="argType" ' + (tdClasses || []).join(' ') + '">';
            
            for (var i = 0; i < args[a].types.length; i++) {
                if (i == args[a].types.length - 1)
                    r += link(args[a].types[i])
                else
                    r += link(args[a].types[i]) + " | ";
            }            
            
            r += '</td>';
            
            r += '<td class="argDescription ' + (tdClasses || []).join(' ') + '">' + requiredText + " " + markdown(args[a].description, true) + '</td>';
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

            r += '<td class="returnType ' + (tdClasses || []).join(' ') + '">' + preText + link(returnVals[v].types) + postText + '</td>';
            r += '<td class="returnDescription ' + (tdClasses || []).join(' ') + '">' + markdown(returnVals[v].description, true) + '</td>';
            r += '</tr>';
        }

        r += '</table>';

        return r;
    }

    // collect context for rendering function
    vars = extend(options, {
        list: this.list,
        tree: this.tree,
        date: (new Date()).toUTCString(),
        isIndex: options.isIndex,
        indexContent: this.indexContent,
        link: link,
        markdown: markdown,
        signature: signature,
        argumentTable: argumentTable,
        returnLink: returnLink,
        returnTable: returnTable,
        title: this.title,
        fileName: options.isIndex ? "" : this.fileName
    });

    // render HTML
    html = fn(vars);

    return html;
};

//
// export panino
//
module.exports = Panino;