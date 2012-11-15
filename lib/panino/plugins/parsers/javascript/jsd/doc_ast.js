var _ = require('underscore');

var utils = require("./utils");

// Detects docs info directly from comment.

// Allow passing in filename and line for error reporting
var filename;
var linenr;

var DocAst = function() {
    filename = "";
    linenr = 0;
}

// Given tagname and array of tags from DocParser, produces docs
// of the type determined by tagname.
DocAst.prototype = {
   detect: function(tagname, docs, customTags) {
      switch (tagname) {
        case "class":
          return create_class(docs, customTags);
        case "event":
          return create_event(docs, customTags);
        case "method":
          return create_method(docs, customTags);
        case "attribute":
          return create_attribute(docs, customTags);
        case "binding":
          return create_binding(docs, customTags);
        case "cfg":
          return create_cfg(docs, customTags);
        case "property":
          return create_property(docs, customTags);
        case "css_var":
          return create_css_var(docs, customTags);
        case "css_mixin":
          return create_css_mixin(docs, customTags);
        default:
          console.error("ERROR".red + ": unknown tag " + tagname);
      }
  }
};

function create_class(docs, customTags) {
    var doc_map = build_doc_map(docs);
    return add_shared({
      "tagname" : "class",
      "name" : detect_name("class", doc_map),
      "doc" : detect_doc(docs, customTags),
      "extends" : detect_extends(doc_map),
      "inherits" : extract_plural(doc_map["inherits"] || []),
      "mixins" : detect_list("mixins", doc_map),
      "alternateClassNames" : detect_list("alternateClassNames", doc_map),
      "aliases" : detect_aliases(doc_map),
      "singleton" : !!doc_map["singleton"],
      "requires" : detect_list("requires", doc_map),
      "uses" : detect_list("uses", doc_map),
      "enum" : detect_enum(doc_map),
      "override" : extract(doc_map, "override", "class")
    }, customTags, doc_map);
}

function create_method(docs, customTags) {
    var doc_map = build_doc_map(docs);
    var d = detect_doc(docs);
    var isConstructor = extract(doc_map, "Constructor") !== null;
    return add_shared({
      "tagname" : isConstructor ? "constructor" : "method",
      "name" : detect_name("method", doc_map),
      "owner" : detect_owner(doc_map),
      "doc" : detect_doc(docs, customTags),
      "params" : detect_params(doc_map),
      "return" : detect_return(doc_map),
      "throws" : detect_throws(doc_map)
    }, customTags, doc_map);
}

function create_attribute(docs, customTags) {
    var doc_map = build_doc_map(docs);
    return add_shared({
      "tagname" : "attribute",
      "name" : detect_name("attribute", doc_map),
      "type" : detect_type("attribute", doc_map),
      "owner" : detect_owner(doc_map),
      "doc" : detect_doc(docs, customTags),
      "default" : detect_default("attribute", doc_map),
      "properties" : detect_subproperties("attribute", docs)
    }, customTags, doc_map);
}

function create_binding(docs, customTags) {
    var doc_map = build_doc_map(docs);
    return add_shared({
      "tagname" : "binding",
      "name" : detect_name("binding", doc_map),
      "owner" : detect_owner(doc_map),
      "doc" : detect_doc(docs, customTags),
      "default" : detect_default("binding", doc_map),
      "properties" : detect_subproperties("binding", docs)
    }, customTags, doc_map);
}

function create_event(docs, customTags) {
    var doc_map = build_doc_map(docs);
    
    return add_shared({
      "tagname" : "event",
      "name" : detect_name("event", doc_map),
      "owner" : detect_owner(doc_map),
      "doc" : detect_doc(docs, customTags),
      "params" : detect_params(doc_map),
      "cancelable" : detect_cancelable(doc_map),
      "bubbles" : extract(doc_map, "bubbles") !== null ? true : false
    }, customTags, doc_map);
}

function create_cfg(docs, customTags) {
    var doc_map = build_doc_map(docs);
    return add_shared({
      "tagname" : "cfg",
      "name" : detect_name("cfg", doc_map),
      "owner" : detect_owner(doc_map),
      "type" : detect_type("cfg", doc_map),
      "doc" : detect_doc(docs, customTags),
      "default" : detect_default("cfg", doc_map),
      "properties" : detect_subproperties("cfg", docs),
      "accessor" : !!doc_map["accessor"],
      "evented" : !!doc_map["evented"],
    }, customTags, doc_map);
}

function create_property(docs, customTags) {
    var doc_map = build_doc_map(docs)
    return add_shared({
      "tagname" : "property",
      "name" : detect_name("property", doc_map),
      "owner" : detect_owner(doc_map),
      "type" : detect_type("property", doc_map),
      "doc" : detect_doc(docs, customTags),
      "default" : detect_default("property", doc_map),
      "properties" : detect_subproperties("property", docs),
    }, customTags, doc_map);
}

function create_css_var(docs, customTags) {
    var doc_map = build_doc_map(docs)
    return add_shared({
      "tagname" : "css_var",
      "name" : detect_name("css_var", doc_map),
      "owner" : detect_owner(doc_map),
      "type" : detect_type("css_var", doc_map),
      "default" : detect_default("css_var", doc_map),
      "doc" : detect_doc(docs, customTags),
    }, customTags, doc_map);
}

function create_css_mixin(docs, customTags) {
    var doc_map = build_doc_map(docs)
    return add_shared({
      "tagname" : "css_mixin",
      "name" : detect_name("css_mixin", doc_map),
      "owner" : detect_owner(doc_map),
      "doc" : detect_doc(docs, customTags),
      "params" : detect_params(doc_map),
    }, customTags, doc_map);
}

// Detects properties common for each doc-object and adds them
function add_shared(hash, customTags, doc_map) {
    hash = utils.merge(hash, {
      "inheritable" : !!doc_map["inheritable"],
      "inheritdoc" : extract(doc_map, "inheritdoc"),
      "related" : extract(doc_map, "related"),
      "see" : extract(doc_map, "see"),
      "private" : extract(doc_map, "private") !== null ? true : false,
      "experimental" : extract(doc_map, "experimental") !== null ? true : false,
      "ignore" : extract(doc_map, "ignore") !== null ? true : false,
      "author" : extract_plural(doc_map["author"] || []),
      "version" : extract(doc_map, "version"),
      "since" : extract(doc_map, "since"),
      "todo" : extract(doc_map, "todo")
    });

    if (customTags !== undefined) {
      var custom = {};
      _.each(customTags, function(tag) {
        var text = extract(doc_map, tag);
        if (text !== null) {
          custom[tag] = text.doc.length > 0 ? text.doc : true;
        }
      });

      hash = utils.merge(hash, custom);
    }

    return hash;
}

function detect_name(tagname, doc_map) {
    var name = extract(doc_map, tagname, "name");

    if (name)
      return name;
    else
      return doc_map["Constructor"] ? "Constructor" : null;
}

function extract(doc_map, tagname, propname) {
    var tag = doc_map[tagname] ? _.first(doc_map[tagname]) : null;
    propname = propname || null;

    if (tag && propname)
      return tag[propname];
    else
      return tag;
}

function detect_owner(doc_map) {
    return extract(doc_map, "member", "member");
}

function detect_type(tagname, doc_map) {
    return extract(doc_map, tagname, "type") || extract(doc_map, "type", "type");
}

function detect_extends(doc_map) {
    return extract(doc_map, "extends", "extends");
}

function detect_default(tagname, doc_map) {
    return extract(doc_map, tagname, "default");
}

// for detecting mixins and alternateClassNames
function detect_list(type, doc_map) {
    if (doc_map[type])
      return _.flatten(_.map(doc_map[type], function(d) { d[type] }));
    else
      return null;
}

function detect_aliases(doc_map) {
    if (doc_map["alias"])
      return _.map(doc_map["alias"], function(tag) { tag["name"] });
    else
      return null;
}

function detect_required(doc_map) {
    return doc_map["cfg"] && doc_map["cfg"].first["optional"] == false;
}

function detect_params(doc_map) {
    return combine_properties(doc_map["param"] || []);
}

function detect_cancelable(doc_map) {
    return doc_map["cancelable"] !== undefined ? doc_map["cancelable"][0].doc : [];
}

function detect_subproperties(tagname, docs) {
    var prop_docs = _.filter(docs, function(tag) { return tag["tagname"] == tagname});
    return prop_docs.length > 0 ? combine_properties(prop_docs)[0]["properties"] : [];
}

function extract_plural(raw_items) {
    var items = [];
    
    _.each(raw_items, function(it) {
       items.push(it["doc"]);
    });
    
    return items;
}

function combine_properties(raw_items) {
    // First item can't be namespaced; if it is, ignore the rest.
    if (raw_items[0] && /\./.test(raw_items[0]["name"]))
      return [raw_items[0]];
    
    // build name-index of all items
    var index = {}
    _.each(raw_items, function(it) { return index[it["name"]] = it; });


    // If item name has no dots, add it directly to items array.
    // Otherwise look up the parent of item and add it as the
    // property of that parent.
    var items = []
    _.each(raw_items, function(it) {
        var m;
        if ( (m = it["name"].match(/^(.+)\.([^.]+)$/)) ) {
          it["name"] = m[2];
          parent = index[m[1]];
          if (parent) {
              if (! (parent["properties"]) )
                parent["properties"] = [];
              parent["properties"].push(it);
          }
          else
            console.warn("Warning".yellow + ": Ignoring subproperty //{$1}.//{$2}, no parent found with name '//{$1}'.", filename, linenr);
        }
        else
          items.push(it);
    });
    
    return items;
}

function detect_return(doc_map) {
    var ret = extract(doc_map, "return") || {};
    return {
      "type" : ret["type"] || "undefined",
      "name" : ret["name"] || "return",
      "doc" : ret["doc"] || "",
      "properties" : doc_map["return"] ? detect_subproperties("return", doc_map["return"]) : []
    }
}

function detect_throws(doc_map) {
    if ( !(doc_map["throws"]) )
        return;
        
    return _.map(doc_map["throws"], function(throws) {
      return {
        "type" : throws["type"] || "Object",
        "doc" : throws["doc"] || ""
      }
    });
}

function detect_enum(doc_map) {
    if (! (extract(doc_map, "class", "enum")) )
        return null;
        
    return {
      "type" : extract(doc_map, "class", "type"),
      "default" : extract(doc_map, "class", "default")
    }
}

// Combines "doc"-s of most tags
// Ignore tags that have doc comment themselves and subproperty tags
function detect_doc(docs, customTags) {
    var ignore_tags = _.union(["param", "return", "author", "version", 
                               "cancelable", "bubbles", "since", "inherits", "todo", "deprecated"], customTags);
    var doc_tags = _.filter(docs, function(tag) { return !_.include(ignore_tags, tag["tagname"]) && !subproperty(tag) });
    return _.compact(_.map(doc_tags, function(tag) { return tag["doc"] })).join(" ");
}

function subproperty(tag) {
    return (tag["tagname"] == "cfg" || tag["tagname"] == "property") && /\./.test(tag["name"]);
}

// Build map of at-tags for quick lookup
function build_doc_map(docs) {
    var map = {};
    _.each(docs, function(tag) {
      if (map[tag["tagname"]])
        map[tag["tagname"]].push(tag);
      else
        map[tag["tagname"]] = [tag];
    });
    return map;
}

module.exports = DocAst;