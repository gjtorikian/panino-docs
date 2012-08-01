# Introduction

Panino is an API documentation generation tool. It can read comments from your source files, or, parse Markdown files and generate the same documentation. Panino runs on [Node.js](http://www.nodejs.org), and uses [Jade](http://jade-lang.com/) as its templating engine.

Panino parses your content following a strict, no-crap-allowed grammar that ensures **correct** and **consistent** documentation, because you've written it following a specific syntax. This means that there is a very specific set of rules and expectations as to how to write your documentation. These rules are not terribly hard or unweildly. Keeping documentation parsed through a grammar ensures thorough and consistent docs, no matter who it's written by. 
This project is forked from [ndoc](https://github.com/nodeca/ndoc), which itself is based off of [pdoc](https://github.com/tobie/pdoc). ([This blog post](http://andrewdupont.net/2008/11/16/pdoc-inline-documentation-for-prototype/) identifies some of the advantages over other commenting-to-documentation systems.)

Changes in this project are plentiful, and heavily modify the original intention of ndoc. Some features include:

* Support for Markdown files
* Creating a separate page for every class, including support for "`[[ ]]`"-notation linking
* Adding "ellipsis" descriptions, truncating the full member description into 120 characters.
* Support for "extension" and "hide" tags
* Linkifying everything (object types in arguments, return types, e.t.c.)
* Allowing to specify a URL to retrieve Javascript documentation about global objects (like `Array` or `String`)
* Support for [content references (or conrefs)](http://www.github.com/gjtorikian/markdown_conrefs). Conrefs are a way to write a sentance once, and refer to it in multiple locations. 
* Documentation runs through [a test suite](https://github.com/gjtorikian/functional-docs) to ensure the validity of all links and images
* Support for arbitrary metadata on classes and members
* Support for straight Markdown-to-HTML page conversion

You may also want to check out [Panda](https://github.com/gjtorikian/panda-docs), which is a generic documentation generation system that shares many of the same concepts.

###### TOC

* [Installation](#installation)
* [Arguments and Configuration](#args)
  * [Defining a Skin](#skins)
  * [Variables, Functions, and CSS to use for Jade Templates](#functions)
* [Syntax and Parse Options](#syntax)
* [Linkify Everything](#linking)
* [License](#license)
* [Why the Name?](#name)

# Installation

You'll need `node.js` and `npm` installed. Then, you can can choose to install Panino globally:

    npm install -g panino

From the command line, just run

	node panino --path [source_files]

Otherwise, you can write a simple build script to do the work for you. Here's how that might look:

```javascript
var panino = require("panino");

panino.main(["./src/nodejs_ref_guide", "-e", "markdown", "-f", "html", "-g", "javascript", "-k", "-p", "./parseOptions.json", "-o", "./out/", "-t", "Node.js Docs", "--skin", "./skins/goose/"], function(err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});
```

# Arguments and Configuration

Panino requires only two options to be set: 

* `--path`. This identifies the location of your source files. 
* `--skin`. The Jade templates to use for your rendered documentation.

However, there are a plentiful number of options to tweak and manage:

<dl>

<dt>-e STRING, --extension STRING</dt>
<dd>Defines the extension of your source files. Don't include the `.` seperator.</dd>

<dt>-r, --recursive</dt>
<dd>If this flag is set, Panino recursively walks the source file directory.</dd>

<dt>-o PATH, --output PATH</dt>
<dd>Defines the path where the rendered output is placed. </dd>

<dt>-u PATH, --outputAssets PATH</dt>
<dd>Defines the path where the resources are placed. </dd>

<dt>-f CHOICE, --format CHOICE</dt>
<dd>Defines the output format of your documentation. Can be:
  <ul>
    <li><code>html</code> for an HTML rendering</li>
    <li><code>ast</code> for an AST list</li>
    <li><code>js</code> for a Javascript file</li>
  </ul>
</dd>

<dt>-i PATH, --index PATH</dt>
<dd>If you're generating multiple files, you can choose to render an an index of landing page for those files. In general, this is a Markdown-formatted file whose content can be placed into your Jade templates.</dd>

<dt>-t STRING, --title STRING</dt>
<dd>The title of your documentation.</dd>

<dt>-l FMT, --link-format FMT</dt>
<dd>A String that defines the format for your links in your files. By default, this is <code>{file}#L{line}]</code>.</dd>

<dt>-view-source-label STRING</dt>
<dd>The text to use for the "View source" link for each file, as defined by <code>-l</code>.</dd>

<dt>-g STRING, --global-object-type STRING</dt>
<dd>Defines the type of language you're documenting. This is really only used when `-e` is `md` or `markdown`; in all other instances, the file extension of your source files are used to determine the language (_e.g._ `.js => JavaScript`).</dd>

<dt>-j STRING, --doc-path STRING</dt>
<dd>Defines a URL to point to for the global objects in your language. For more information, see the section called "Linkify Everything."</dd>

<dt>-a PATH, --adtitional-global-objects PATH</dt>
<dd>The path to a JSON file containing a structure defining more relationships between global objects and documentation URLs. For more information, see the section called "<a href="#linkify-everything">Linkify Everything</a>."</dd>

<dt>-s, --split</dt>
<dd>If this flag is set, Panino splits the output for HTML builds into a separate file per class.</dd>

<dt>-d, --disableTests</dt>
<dd>Lets you disable the testing suite. **NOT RECOMMENDED!**</dd>

<dt>-p PATH, --parse-options PATH</dt>
<dd>The path to a JSON file defining various parse options you want to use. For more information, see the section called "<a href="#syntax">Syntax Parse Options</a>."</dd>

</dl>

## Defining a Skin

Panino uses the [Jade templating engine](https://github.com/visionmedia/jade) to render the documentation. While you can define the location of your templates with `--skin`, your directory structure **must match** the following format:

* _skeleton_
* _templates_

Your CSS, images, Javascript, and other resource files should go in the _skeleton_ directory. Your _*.jade_ templates go into _templates_. Your content is rendered through the _templates_, and you must have at least one file called _layout.jade_. Your files in _skeleton_ are placed in your _out_ directory called _resources_.

This admittedly confusing structure should be fixed up in a future release.

## Variables, Functions, and CSS used for Jade Templates

While writing your templates, you may find the need to call out to the Panino system for information about your documentation. Fear not, as there are various variables and functions you can use inside your Jade templates. 

[Here's a list of the variables and functions you have access to](https://github.com/gjtorikian/panino-docs/blob/master/FUNCTIONS.md). That page also lists the names of CSS classes used by default in Panino.

# Syntax and Parse Options

[Here's a full list of Panino's syntax](https://github.com/gjtorikian/panino-docs/blob/master/SYNTAX.md) that you can follow to write your well-formed documentation.

Some of the syntaxes outlined in that document can be overwritten with a JSON object defined in a file, and pulled in through the `-p` argument. The format of that file looks something like this:

```javascript
{
	"useDash"  : true,
	"useComma" : true
}
```

A strict grammar is used here to absolutely ensure that all the text across various files are written the same way. Panino comes with its own default "rules," that you can choose to overwrite. The two properties above are currently the only rules you can overwrite. For a more in-depth explanation of what they do, see the document on syntax.

# Linkify Everything

Panino was designed with the goal of supporting links wherever and whenever they make sense. This means, among other things, that any object encountered in a method signature, return type, parameter type, and so on, is turned into a link. The Panino build throws an exception and halts if it finds some object that it can't turn into a link.

On the whole, this is A Good Thing for readers. It does mean, of course, slightly more work to set up Panino correctly for your project.

There are three types of objects Panino considers when linkify everything:

1. Objects that are already linked by Panino. 
2. Objects that exist in your code, but not in your documentation project. This could be, for example, objects in another folder, or, for Javascript, objects like `DOMElement`, which exist in the browser but not your project.
3. Global objects for your language of choice, like `String`, `Array`, and so on.

#### Existing Objects

For the first type, Panino creates a tree of all your objects and members, so you don't need to do anything to support these.

#### Outside Objects

For the second and third types, you need to create a JSON object describing the relationship between objects and their documentation links. Set the path to this file with the `-a` argument. An example file might look like this:

```javascript
{
	"DOMElement"  : "https://developer.mozilla.org/en/DOM/element",
	"DOMContentLoaded"    : "https://developer.mozilla.org/en/DOM/DOM_event_reference/DOMContentLoaded"
}
```

# License

This project is distributed under the [GPL](https://github.com/gjtorikian/panino-docs/blob/master/LICENSE) license.

# Why the Name?

_Panino_ refers to [a type of sandwich in Italy](http://en.wikipedia.org/wiki/Panini_\(sandwich\)#Terminology). Panini is its plural form, but is often mistakenly used as the singular. It seemed important to draw attention to the fact that what you're defining should represent what it actually is, in documentation and beyond.