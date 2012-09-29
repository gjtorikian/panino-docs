var StringScanner = require("StringScanner");
var _ = require('underscore');
require('colors');

/*
  Parses doc-comment into array of @tags
 
  For each @tag it produces Hash like the following:
 
      {
        "tagname" : cfg/property/type/extends/...,
        "doc" : "Some documentation for this tag",
        ...@tag specific stuff like :name, :type, and so on...
      }
 
  When doc-comment begins with comment, not preceded by @tag, then
  the comment will be placed into Hash with "tagname" : "default".
 
  Unrecognized @tags are left as is into documentation as if they
  were normal text.
 
*/

var ident_pattern = /[$\w-]+/;
var ident_chain_pattern = /[$\w-]+(\.[$\w-]+)*/;

var tags = [];
var current_tag = {};
var input;

exports.parse = function(content) {
    tags = [];
    input = new StringScanner((purify(content)));
    
    parse_loop(input);

    // The parsing process can leave whitespace at the ends of
    // doc-strings, here we get rid of it. Additionally, null all empty docs
    _.each(tags, function(tag) {
      tag["doc"] = strip(tag["doc"]);
      tag["doc"] = tag["doc"] || "";
    });

    // Get rid of empty default tag
    if (_.first(tags) && _.first(tags)["tagname"] == "default" && !_.first(tags)["doc"])
      tags.shift();
    
    return tags;
};

// Extracts content inside /** ... */
function purify(input) {
    var result = [], indent = null;
    
    // We can have two types of lines:
    // - those beginning with *
    // - and those without it
    input.split("\n").forEach(function(line) {
        // chomp !
        line = line.replace(/(\n|\r)+$/, '');
        var m;
        if ( ( m = line.match(/^\s*\*\s?(.*)$/)) ) {
            // When comment contains *-lines, switch indent-trimming off
            indent = 0;
            result.push(m[1]);
        }
        else if (/^\s*$/.test(line)) {
            // pass-through empty lines
            result.push(line);
        }
        else if (indent === undefined && (m = line.match(/^(\s*)(.*?$)/) ) ) {
            // When indent not measured, measure it and remember
            indent = m[1];
            result.push(m[2]);
        }
        else {
            // Trim away indent if available
            result.push(line.replace(new RegExp("^\s{0," + (indent || 0) +"}", "")));
        }
    });

    return result.join("\n");
}

function add_tag(tag) {
    current_tag = {"tagname": tag, "doc": ""};
    tags.push(current_tag);
}

function parse_loop(input) {
    add_tag("default");    
    i = 0;
    while(!input.eos()) {
      if (look(/@class\b/))
        at_class();
      else if (look(/@extends?\b/))
        at_extends()
      else if (look(/@inherits?\b/))
        at_inherits()
      else if (look(/@mixins?\b/))
        class_list_at_tag(/@mixins?/, "mixins");
      else if (look(/@alternateClassNames?\b/))
        class_list_at_tag(/@alternateClassNames?/, "alternateClassNames");
      else if (look(/@uses\b/))
        class_list_at_tag(/@uses/, "uses");
      else if (look(/@requires\b/))
        class_list_at_tag(/@requires/, "requires");
      else if (look(/@singleton\b/))
        boolean_at_tag(/@singleton/, "singleton");
      else if (look(/@event\b/))
        at_event();
      else if (look(/@method\b/))
        at_method();
      else if (look(/@attribute\b/))
        at_attribute();
      else if (look(/@binding\b/))
        at_binding();
      else if (look(/@constructor\b/))
        boolean_at_tag(/@constructor/, "Constructor");
      else if (look(/@param\b/))
        at_param();
      else if (look(/@returns?\b/))
        at_return();
      else if (look(/@cfg\b/))
        at_cfg();
      else if (look(/@property\b/))
        at_property();
      else if (look(/@type\b/))
        at_type();
      else if (look(/@xtype\b/))
        at_xtype(/@xtype/, "widget");
      else if (look(/@ftype\b/))
        at_xtype(/@ftype/, "feature");
      else if (look(/@ptype\b/))
        at_xtype(/@ptype/, "plugin");
      else if (look(/@member\b/))
        at_member();
      else if (look(/@inherit[dD]oc\b/))
        at_inheritdoc();
      else if (look(/@alias/))
        at_alias();
      else if (look(/@see/))
        at_see();
      else if (look(/@link/))
        at_link();
      else if (look(/@var\b/))
        at_var();
      else if (look(/@throws?\b/))
        at_throws();
      else if (look(/@enum\b/))
        at_enum();
      else if (look(/@override\b/))
        at_override();
      else if (look(/@cancelable\b/))
        at_cancelable();
      else if (look(/@author\b/))
        at_author();
      else if (look(/@version\b/))
        at_version();
      else if (look(/@since\b/))
        at_since();
      else if (look(/@allowchild\b/))
        at_allowchild();
      //else if (look(/@deprecated\b/)) TODO
      //  at_deprecated();
      else if (look(/@private\b/))
        boolean_at_tag(/@private/, "private");
      else if (look(/@experimental\b/))
        boolean_at_tag(/@experimental/, "experimental");
      else if (look(/@baseclass\b/))
        boolean_at_tag(/@baseclass/, "baseclass");
      else if (look(/@chainable\b/))
        boolean_at_tag(/@chainable/, "chainable");
      else if (look(/@inheritable\b/))
        boolean_at_tag(/@inheritable/, "inheritable");
      else if (look(/@accessor\b/))
        boolean_at_tag(/@accessor/, "accessor");
      else if (look(/@evented\b/))
        boolean_at_tag(/@evented/, "evented");
      else if (look(/@bubbles\b/))
        boolean_at_tag(/@bubbles/, "bubbles");
      else if (look(/@default_private\b/))
        boolean_at_tag(/@default_private/, "default_private");
      else if (look(/@/)) {
        match(/@/);
        var tagName = look(/\w+/);

        // dumb, but blocks issues with @ showing up somewhere else, like "[@icon]"
        var nextIsSpace = /\s$/.test(input.peek(tagName.length + 1)); 

        if (nextIsSpace)
          console.warn("Warning".yellow + ": I found @" + tagName + ", but I'm not sure what it ought to do.");

        current_tag["doc"] += "@";
      }
      else if (look(/[^@]/)) {
        current_tag["doc"] += match(/[^@]+/);
      }
    }
}

// matches @class name ...
function at_class() {
  match(/@class/);
  add_tag("class");
  maybe_ident_chain("name");
  skip_white();
}

// matches @extends name ...
function at_extends() {
  match(/@extends?/);
  add_tag("extends");
  maybe_ident_chain("extends");
  skip_white();
}

// matches @inherits name ...
function at_inherits() {
  match(/@inherits?/);
  add_tag("inherits");
  skip_horiz_white();

  current_tag["doc"] = strip(match(/.*/)); 
  skip_white();
}

// matches @<tagname> classname1 classname2 ...
function class_list_at_tag(regex, tagname) {
  match(regex);
  add_tag(tagname);
  skip_horiz_white();
  current_tag[tagname] = class_list();
  skip_white();
}

// matches @event name ...
function at_event() {
  match(/@event/);
  add_tag("event");
  maybe_name();
  skip_white();
}

// matches @method name ...
function at_method() {
  match(/@method/);
  add_tag("method");
  maybe_name();
  skip_white();
}

// matches @param {type} [name] (optional) ...
function at_param() {
  match(/@param/);
  add_tag("param");
  maybe_type();
  maybe_name_with_default();
  maybe_optional();
  skip_white();
}

// matches @return/@returns {type} [ return.name ] ...
function at_return() {
  match(/@returns?/);
  add_tag("return");
  maybe_type();
  skip_white();
  if (look(/return\.\w/))
    current_tag["name"] = ident_chain;
  else
    current_tag["name"] = "return";
  skip_white();
}

// matches @attribute {type} [name] (optional) ...
function at_attribute() {
  match(/@attribute/);
  add_tag("attribute");
  maybe_type();
  maybe_name_with_default();
  maybe_optional();
  skip_white();
}

// matches @binding [name] ...
function at_binding() {
  match(/@binding/);
  add_tag("binding");
  maybe_name_with_default();
  skip_white();
}

// matches @cfg {type} name ...
function at_cfg() {
  match(/@cfg/);
  add_tag("cfg");
  maybe_type();
  maybe_name_with_default();
  maybe_required();
  skip_white();
}

// matches @property {type} name ...
//
// ext-doc doesn't support {type} and name for @property - name is
// inferred from source and @type is required to specify type,
// jsdoc-toolkit on the other hand follows the sensible route, and
// so do we.
function at_property() {
  match(/@property/)
  add_tag("property");
  maybe_type();
  maybe_name_with_default();
  skip_white();
}

// matches @var {type} $name ...
function at_var() {
  match(/@var/)
  add_tag("css_var");
  maybe_type();
  maybe_name_with_default();
  skip_white();
}

// matches @throws {type} ...
function at_throws() {
  match(/@throws?/)
  add_tag("throws");
  maybe_type();
  skip_white();
}

// matches @enum {type} name ...
function at_enum() {
  match(/@enum/)
  add_tag("class");
  current_tag["enum"] = true;
  maybe_type();
  maybe_name_with_default();
  skip_white();
}

// matches @override name ...
function at_override() {
  match(/@override/)
  add_tag("override");
  maybe_ident_chain("class");
  skip_white();
}

// matches @cancelable words ...
function at_cancelable() {
  match(/@cancelable/)
  add_tag("cancelable");

  current_tag["doc"] = strip(match(/.*/)); 
  skip_white();
}

// matches @author words ...
function at_author() {
  match(/@author/);
  add_tag("author");
  skip_horiz_white();

  current_tag["doc"] = strip(match(/.*/)); 
  skip_white();
}

// matches @version words ...
function at_version() {
  match(/@version/);
  add_tag("version");
  skip_horiz_white();

  current_tag["doc"] = strip(match(/.*/)); 
  skip_white();
}

// matches @since words ...
function at_since() {
  match(/@since/);
  add_tag("since");
  skip_horiz_white();

  current_tag["doc"] = strip(match(/.*/)); 
  skip_white();
}

// matches @allowchild words ...
function at_allowchild() {
  match(/@allowchild/);
  add_tag("allowchild");
  skip_horiz_white();

  current_tag["doc"] = strip(match(/.*/)); 
  skip_white();
}

// matches @deprecated; @deprecated x.x.x; @deprecated words ...
function at_deprecated() {
  match(/@deprecated/);
  add_tag("deprecated");
  skip_horiz_white();

  current_tag["doc"] = strip(match(/.*/)); 
  skip_white();
}

// matches @type {type}  or  @type type
//
// The presence of @type implies that we are dealing with property.
// ext-doc allows type name to be either inside curly braces or
// without them at all.
function at_type() {
  match(/@type/);
  add_tag("type");
  skip_horiz_white();
  if (look(/\{/)) {
    var tdf = typedef();
    current_tag["type"] = tdf["type"];
    current_tag["optional"] = tdf["optional"] ? true : false;
  }
  else if (look(/\S/)) {
    current_tag["type"] = match(/\S+/);
  }
  skip_white();
}

// matches @member name ...
function at_member() {
  match(/@member/);
  add_tag("member");
  maybe_ident_chain("member");
  skip_white();
}

// matches @xtype/ptype/ftype/... name
function at_xtype(tag, namespace) {
  match(tag);
  add_tag("alias");
  skip_horiz_white();
  current_tag["name"] = namespace + "." + (ident_chain() || "");
  skip_white();
}

// matches @alias <ident-chain>
function at_alias() {
  match(/@alias/)
  add_tag("alias");
  skip_horiz_white();
  current_tag["name"] = ident_chain();
  skip_white();
}

// matches @see <ident-chain>
function at_see() {
  match(/@see/)
  add_tag("see");
  skip_horiz_white();
  current_tag["name"] = ident_chain();
  skip_white();
}

// matches @link [<ident-chain> some text...] or
// @link https?://blahblah some text...
function at_link() {
  match(/\{@link/)
  skip_horiz_white();

  var linkText = strip(match(/.*?\}/)).replace(/\s*@link\s*/, "").slice(0,-1); 

  if (/^https?/.test(linkText)) {
    var anchor = linkText.split(/\s+/);
    var link = anchor.shift();
    current_tag["doc"] = current_tag["doc"].slice(0,-1) + 
                         "[" + anchor.join(" ") + "]" +
                         "(" + link + ")";
  }
  else { // sugar this into panino style [[ ]] link block
    current_tag["doc"] = current_tag["doc"].slice(0,-1) + 
                         "[[" + 
                         linkText
                         + "]] ";
  }

  skip_white();
}

// matches @inheritdoc class.name#static-type-member
function at_inheritdoc() {
  match(/@inherit[dD]oc|@alias/);

  add_tag("inheritdoc");
  skip_horiz_white();

  if (look(ident_chain_pattern))
    current_tag["cls"] = ident_chain();

  if (look(/#\w/)) {
    match(/#/);
    if (look(/static-/)) {
      current_tag["static"] = true;
      match(/static-/);
    }
    if (look(/(cfg|property|method|event|css_var|css_mixin)-/)) {
      current_tag["type"] = ident();
      match(/-/);
    }
    current_tag["member"] = ident();
  }

  skip_white();
}

// Used to match @private, @ignore, @hide, ...
function boolean_at_tag(regex, propname) {
  match(regex);
  add_tag(propname);
  skip_white();
}

// matches {type} if possible and sets it on @current_tag
// Also checks for {optionality=} in type definition.
function maybe_type() {
  skip_horiz_white();
  if (look(/\{/)) {
    var tdf = typedef();
    current_tag["type"] = tdf["type"];
    current_tag["optional"] = tdf["optional"] ? true : false;
  }
}

// matches: <ident-chain> | "[" <ident-chain> [ "=" <default-value> ] "]"
function maybe_name_with_default() {
  skip_horiz_white();
  if (look(/\[/)) {
    match(/\[/);
    maybe_ident_chain("name");
    skip_horiz_white();
    if (look(/=/)) {
      match(/=/);
      skip_horiz_white();
      current_tag["default"] = default_value();
    }
    skip_horiz_white();
    match(/\]/);
    current_tag["optional"] = true;
  }
  else {
    maybe_ident_chain("name");
  }
}

// matches: "(optional)"
function maybe_optional() {
  skip_horiz_white();
  if (look(/\(optional\)/i)) {
    match(/\(optional\)/i);
    current_tag["optional"] = true;ß
  }
}

// matches: "(required)"
function maybe_required() {
  skip_horiz_white
  if (look(/\(required\)/i)) {
    match(/\(required\)/i)
    current_tag["optional"] = false
  }
}

// matches identifier name if possible and sets it on @current_tag
function maybe_name() {
  skip_horiz_white();
  if (look(ident_pattern)) {
    current_tag["name"] = match(ident_pattern);
  }
}
    
// matches ident.chain if possible and sets it on @current_tag
function maybe_ident_chain(propname) {
  skip_horiz_white();
  if (look(ident_chain_pattern)) {
    current_tag[propname] = ident_chain();
  }
}

// Attempts to allow balanced braces in default value.
// When the nested parsing doesn't finish at closing "]",
// roll back to beginning and simply grab anything up to closing "]".
function default_value() {
  start_pos = input.pointer();
  value = parse_balanced(/\[/, /\]/, /[^\[\]]*/);
  if (look(/\]/)) {
    return value;
  }
  else {
    input.setPointer(start_pos);
    return match(/[^\]]*/);
  }
}

// matches {...=} and returns text inside brackets
function typedef() {
  match(/\{/);

  name = parse_balanced(/\{/, /\}/, /[^{}]*/);

  if (/=$/.test(name)) {
    name = name.substring(0, name.length - 1);
    optional = true;
  }
  else {
    optional = null;
  }

  match(/\}/);

  return {"type" : name, "optional": optional};
}

// Helper method to parse a string up to a closing brace,
// balancing opening-closing braces in between.
//
// @param re_open  The beginning brace regex
// @param re_close The closing brace regex
// @param re_rest  Regex to match text without any braces
function parse_balanced(re_open, re_close, re_rest) {
  result = match(re_rest);
  while (look(re_open)) {
    result += match(re_open);
    result += parse_balanced(re_open, re_close, re_rest);
    result += match(re_close);
    result += match(re_rest);
  }
  return result;
}

// matches <ident_chain> <ident_chain> ... until line end
function class_list() {
  skip_horiz_white();
  classes = [];
  while (look(ident_chain_pattern)) {
    classes.push(ident_chain());
    skip_horiz_white();
  }
  
  return classes;
}
    
// matches chained.identifier.name and returns it
function ident_chain() {
  return input.scan(ident_chain_pattern);
}

// matches identifier and returns its name
function ident() {
  return input.scan(/\w+/);
}
    
function look(re) {
  return input.check(re);
}

function match(re) {
  return input.scan(re);
}

function skip_white() {
  return input.scan(/\s+/);
}
    
// skips horizontal whitespace (tabs and spaces)
function skip_horiz_white() {
  return input.scan(/[ \t]+/);
}

function strip(str) {
  return str.replace(/^\s+|\s+$/g, "");
}