# Introduction

Panino is an API generation tool. It can read comments from your Javascript source files, or, parse Markdown files and generate the same documentation. Both the comments and the Markdown files are to be written in a specific syntax.

Panino parses your content through a strict, no crap allowed grammar. This means that there is a very specific set of rules and expectations as to how to write your documentation. These rules are not terribly hard or unweildly. Keeping documentation parsed through a grammar ensures thorough and consistent docs, no matter who it's written by. This project is forked from [ndoc](https://github.com/nodeca/ndoc), which itself is based off of [pdoc](https://github.com/tobie/pdoc). ([This blog post](http://andrewdupont.net/2008/11/16/pdoc-inline-documentation-for-prototype/) identifies some of the advantages over other commenting-to-documentation systems.

Changes in this project are plentiful, and heavily modify the original intention of ndoc. Changes include:

* The ability to convert Markdown files
* Creating a separate page for every class, including support for "`[[ ]]`"-notation linking
* Adding "ellipsis" descriptions, truncating the full member description into 120 characters.
* Linkifying everything (object types in arguments, return types, e.t.c.)
* Allowing to specify a URL to retrieve Javascript documentation about global objects (like `Array` or `String`)
* Support for [content references (or conrefs)](http://www.github.com/gjtorikian/markdown_conrefs). Conrefs are a way to write a sentance once, and refer to it in multiple locations. 

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

However, there are a plentiful number of options to tweak and manage.

#### -e STRING, --extension STRING

Defines the extension of your source files. Don't include the `.` seperator.

#### -r, --recursive

If this flag is set, Panino recursively walks the source file directory.

#### -o PATH, --output PATH                      

Defines the path where the rendered output is placed. 

#### -i PATH, --index PATH                       

If you're generating multiple files, you can choose to render an an index of landing page for those files. In general, this is a Markdown-formatted file whose content can be placed into your Jade templates.

#### -t STRING, --title STRING

The title of your documentation.

#### -l FMT, --link-format FMT                   

A String that defines the format for your links in your files. By default, this is `{file}#L{line}].

#### --view-source-label STRING                  

The text to use for the "View source" link for each file, as defined by `-l`.

#### -g STRING, --global-object-type STRING

Defines the type of language you're documenting. This is really only used when `-e` is `md` or `markdown`; in all other instances, the file extension of your source files are used to determine the language (_e.g._ `.js => JavaScript`).

#### -j STRING, --doc-path STRING

Defines a URL to point to for the global objects in your language. For more information, see the section called "Linkify Everything."

#### -a PATH, --additional-global-objects PATH

The path to a JSON file containing a structure defining more relationships between global objects and documentation URLs. For more information, see the section called "Linkify Everything."

#### -s, --split

If this flag is set, Panino splits the output for HTML builds into a separate file per class.

#### -k, --keepChildClasses 

If `-s` is set and files are split, setting this flag true keeps child classes on the same page as the parent; otherwise, they get their own files, too.

#### -p PATH, --parse-options PATH               

The path to a JSON file defining various parse options you want to use. For more information, see the section called "Parse Options."

# Syntax

[Here's a full list of Panino's syntax](https://github.com/gjtorikian/panino/blob/master/syntax.md).


# License

This project is distributed under the [GPL](https://github.com/gjtorikian/panino/blob/master/LICENSE) license.