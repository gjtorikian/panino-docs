var _ = require('underscore');

// Expands class docset into one or more docsets.
//
// The resulting list can contain the following:
//
// - the base class docset itself (always present)
// - configs detected from comment
// - constructor detected from comment
// - members detected from code
//

var constructor_found;

// Expands class-docset into multiple docsets.
exports.expand = function(docset) {
  constructor_found = false

  return expand_comment(docset).concat(expand_code(docset));
}

// Handles old syntax where configs and constructor are part of class
// doc-comment.
//
// Gathers all tags until first @cfg or @constructor into the first
// bare :class group.  We have a special case for @xtype which in
// ExtJS comments often appears after @constructor - so we
// explicitly place it into :class group.
//
// Then gathers each @cfg and tags following it into :cfg group, so
// that it becomes array of arrays of tags.  This is to allow some
// configs to be marked with @private or whatever else.
//
// Finally gathers tags after @constructor into its group.
function expand_comment(docset) {
  groups = {
    "class": [],
    "cfg": [],
    "Constructor": []
  }

  // By default everything goes to :class group
  var group_name = "class";

  _.each(docset["comment"], function (tag) {
    tagname = tag["tagname"];

    if (tagname == "cfg" || tagname == "Constructor") {
      group_name = tagname;
      if (tagname == "cfg")
        groups["cfg"].push([]);
    }

    if (tagname == "alias")
      groups["class"].push(tag);  // For backwards compatibility allow @xtype after @constructor
    else if (group_name == "cfg")
      _.last(groups["cfg"]).push(tag);
    else
      groups[group_name].push(tag);
  });

  return groups_to_docsets(groups, docset);
}

// Turns groups hash into list of docsets
function groups_to_docsets(groups, docset) {
  var results = [{
    "tagname": "class",
    "type": docset["type"],
    "comment": groups["class"],
    "code": docset["code"],
    "linenr": docset["linenr"]
  }];

  _.each(groups["cfg"], function(cfg) {
    results.push({
      "tagname": "cfg",
      "type": docset["type"],
      "comment": cfg,
      "code": {},
      "linenr": docset["linenr"]
    });
  });

  if (groups["Constructor"].length > 0) {
    // Remember that a constructor is already found and ignore if a
    // constructor is detected from code.
    var constructor_found = true

    results.push({
      "tagname": "method",
      "type": docset["type"],
      "comment": groups["Constructor"],
      "code": {},
      "linenr": docset["linenr"]
    });
  }
  
  return results;
}

// Turns auto-detected class members into docsets in their own right.
function expand_code(docset) {
  var results = [];

  if (docset["code"]) {
    _.each(docset["code"]["members"], function(m) {
      if (! (constructor_found && m["name"] == "Constructor") )
        results.push(code_to_docset(m));
    });
  }

  return results;
}

function code_to_docset(m) {
  return {
    "tagname": m["tagname"],
    "type": "no_comment",
    "comment": [],
    "code": m,
    "linenr": m["linenr"]
  }
}