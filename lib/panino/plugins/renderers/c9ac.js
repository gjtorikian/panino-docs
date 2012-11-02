/** internal, section: Plugins
/** internal, section: Plugins
 *  Renderers.json(Panino) -> Void
 *
 *  Registers C9 Autocompletion renderer as `c9ac`.
 *
 *
 *  ##### Example
 *
 *      Panino.render('c9ac', ast, options, function (err) {
 *        // ...
 *      });
 *
 *
 **/


'use strict';


// stdlib
var fs = require('fs');
var path = require('path');

var wrench = require('wrench');
var namp = require('namp');

var options;
var KIND_PACKAGE = "package";
var KIND_HIDDEN = "hidden";
var KIND_DEFAULT = undefined;
var URL_PREFIX, GUID_PREFIX;
var LINK_TARGET = "c9doc";
var builtins = JSON.parse(fs.readFileSync(__dirname  + "/c9ac_support/builtin.json", "UTF-8"));


var util = require("./c9ac_support/util");
var addLinkTargets = util.addLinkTargets;

// much of this code is taken from Lennart's autocompletion parsing 
// for Cloud9 IDE
module.exports = function (Panino) {
  Panino.registerRenderer('c9ac', function render_json(ast, _options, callback) {
    options = _options;
    URL_PREFIX = options.docUrlPrefix || "";
    GUID_PREFIX = options.guidPrefix || "GUID_NEEDED";
    
    if (!options.keepOutDir) {
      wrench.rmdirSyncRecursive(options.output, true);
    }
    wrench.mkdirSyncRecursive(options.output, "0755");
    
    var tree = ast.tree;
    var allResults = extractRoot(tree);
    fs.writeFile(path.join(options.output, "builtin." + path.basename(options.output).replace("/", "").replace("\\", "") + ".jst"), 
                 JSON.stringify(allResults, null, 2), "UTF-8", callback);
  });
};

function Container(id) {
    this.guid = toC9TypeName(id);
    this.properties = {
        _prototype: [{
            guid: this.guid + "/prototype",
            properties: {}
        }]
    };
    this.kind = this.guid.match("/") ? KIND_HIDDEN : KIND_PACKAGE;
}

Container.prototype.add = function(id, property) {
    var props;
    if (isStatic(property, this)) {
        props = this.properties;
        property.guid = this.guid + "/" + property.guid;
        // console.log(this.guid + ":" + id);
    } else {
        props = this.properties._prototype[0].properties;
        property.guid = this.guid + "/prototype/" + property.guid;
        // console.log(this.guid + "." + id);
    }
    var targetProps = props["_" + id] = props["_" + id] || [];
    targetProps.push(property);
};

function Property(parent, id) {
    this.guid = id;
    this.properties = {};
}

function extractRoot(tree) {
    var results = {};
    /* Preprocess classes to recognize globals
    for (var i = 0; i < root.tree.children.length; i++) {
        var child = root.tree.children[i];
        if (child.type === "class")
            extractItem(child, results);
    }
    */
    // Process all children
    for (var i = 0; i < tree.children.length; i++) {
        var child = tree.children[i];
        extractItem(child, results);
    }
    return results;
}

function extractItem(item, results) {
    if (item.id === "Modules") // HACK: Modules is not a class
        return;

    if (item.type === "class method" || item.type === "class property" || item.type === "attribute" || item.type === "binding")
        extractProperty(item, results);
    else if (item.type === "class" || item.type == "namespace")
        extractContainer(item, results);
    else if (item.type === "constructor")
        extractConstructor(item, results);
    else if (item.type === "event")
        extractEvent(item, results);
    else
        throw new Error("Unknown item type: " + item.type);
}

function extractContainer(item, results) {
    var matcher = item.id.match(/^(.*)\.(.*?)$/);
    if (matcher) {
        var parentId = matcher[1];
        var parentClass = results[toC9TypeName(parentId)];
        if (!parentClass)
            parentClass = results[toC9TypeName(parentId)] = new Container(parentId);
    }
    
    var result = results[toC9TypeName(item.id)] || new Container(item.id);
    results[toC9TypeName(item.id)] = result;
    
    // TODO: don't copy doc from class to _prototype??
    result.docUrl = result.properties._prototype.docUrl = extractDocUrl(item);
    result.doc = result.properties._prototype.doc = extractDoc(item);
    
    if (result.kind === KIND_PACKAGE && (isClassNotPackage(item) || matcher)) {
        result.kind = KIND_DEFAULT;
        // TODO: prototype chain
    }
    
    for (var i = 0; i < item.children.length; i++) {
        extractItem(item.children[i], results);
    }
}

function isClassNotPackage(item) {
    if (item.metadata) {
        if (item.metadata.indexOf)
            item.metadata = JSON.parse(item.metadata);
        if (item.metadata.type === "global")
            return true;
    }
    // HACK: assume if something is a constructor, it is a class with instance properties
    for (var i = 0; i < item.children.length; i++) {
        if (item.children[i].type === "constructor")
            return true;
    }
    
    return false;
}

function isStatic(property, container) {
    // HACK: we don't have metadata for this yet
    return container.kind === "package" ||
        property.guid.match(/^[A-Z]/) || container.guid.match("(/|:)[a-z][^/]*$");
}

function extractProperty(item, results, isConstructor) {
    var matcher = item.id.match(/^(.*)\.(.*?)$/);
    var parentId = matcher[1];
    var childId = matcher[2];
    var parentClass = results[toC9TypeName(parentId)];
    if (!parentClass)
        parentClass = results[toC9TypeName(parentId)] = new Container(parentId);
    
    var signatures = item.signatures || [{}];
    
    for (var i = 0; i < signatures.length; i++) {
        var signature = signatures[i];
        var result = new Property(parentClass, childId + "[" + i + "]");
        result.docUrl = extractDoc(signature) || extractDocUrl(item);
        result.doc = extractDoc(item) || extractDoc(item);
        extractSignature(item, signature, result);
        if (isConstructor)
            extractSignature(item, signature, parentClass);
        parentClass.add(childId, result);
    }
}

function extractSignature(item, signature, result) {
    var returns = extractType(signature.returns ? signature.returns[0].type : null, true);

    if (item.type === "class property") {
        result.properties.___proto__ = returns;
        return;
    }
    
    result.properties._return = returns;
    result.fargs = [];
    result.properties.___proto__ = result.properties.___proto__ || [];
    result.properties.___proto__.push("es5:Function/prototype");

    if (!signature.arguments)
        return;

    extractSignatureArgs(signature, result.fargs);
}

function extractSignatureArgs(signature, results) {
    for (var i = 0; i < signature.arguments.length; i++) {
        // TODO: store callback signatures
        //       for example, see readline.interface.question
        // TODO: store function sig like { name: 'callback', args: [], optional: true }
        var arg = signature.arguments[i];

        var argFargs = arg.args && extractSignatureArgs(arg, []);
        results.push({
            id: arg.name,
            type: extractType(arg.type, true),
            doc: arg.description,
            opt: arg.optional,
            fargs: argFargs
        });
    }
    return results;
}

function extractConstructor(item, results) {
    // TODO: this replace messes up the id permanently, and I don't know why
    var originalId = item.id;
    item.id = item.id.replace(/^new (.*)/, "$1") + ".constructor";
    extractProperty(item, results, true);
    item.id = originalId;
}

function extractEvent(item, results) {
    // TODO: extract events?
}

function extractType(type) {
    if (type) {
        if (builtins["es5:" + type])
            return ["es5:" + type + "/prototype"];
        else if (type instanceof Array)
            return type.map(extractType);
        else
            return [toC9TypeName(type) + "/prototype"];
    }
    else {
        return ["es5:Object/prototype"];
    }
}

function toC9TypeName(typename) {
    return GUID_PREFIX + typename.replace(/\./g, "/");
}

function extractDocUrl(item) {
    return URL_PREFIX + item.outFile;
}

function extractDoc(item) {
    if (!item.short_description || item.short_description.match(/^Stability:[^\\]*(\\n[^\\]*)?/))
        return null;
    // TODO: support (some) documentation links?
    var result = namp(item.short_description).html;
    result = result.replace(/\[\[[^ \]]+\s+([^\]]+)\]\]/gm, "$1");
    result = result.replace(/\[([^\]]+)\]\([^\)]+\)/gm, "$1");
    result = addLinkTargets(result, LINK_TARGET);
    return result;
}