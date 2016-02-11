# Introduction

Panino is an API documentation generation tool. It can read comments from your source files, or, parse Markdown files and generate the same documentation. Panino runs on [Node.js](http://www.nodejs.org), and uses [Jade](http://jade-lang.com/) as its templating engine.

Panino parses your content following a strict, no-crap-allowed grammar that ensures **correct** and **consistent** documentation, because you've written it following a specific syntax. This means that there is a very specific set of rules and expectations as to how to write your documentation. These rules are not terribly hard or unwieldy. Keeping documentation parsed through a grammar ensures thorough and consistent docs, no matter who it's written by. It can parse your source files in two ways:

1. By using the [pdoc](https://github.com/tobie/pdoc)-notation for documentation. [This blog post](http://andrewdupont.net/2008/11/16/pdoc-inline-documentation-for-prototype/) identifies some of the advantages over other commenting-to-documentation systems.  The pdoc system was originally based on [ndoc](https://github.com/nodeca/ndoc).)
2. By using a JSDoc-like notation for comments. The inspiration and much of the work for this parsing comes from a port of [JSDuck](https://github.com/senchalabs/jsduck). While some of the conventions of JSDuck are kept, this should not be considered a 100% port.

For more help, including syntax and tag definitions, see [the wiki](https://github.com/gjtorikian/panino-docs/wiki).

### Who Uses It?

* [Ace API](http://ace.ajax.org/api)
* [NodeManual](http://www.nodemanual.org)

# Features

* Support for Markdown files
* Creating a separate page for every class
* Support for proper "`[[ ]]`"-notation linking (_e.g. `[[Class.foo]]` renders to a link wrapped in a `<code>` tag)
* Adding "shortened" descriptions, truncating the full description into a single sentence
* Ability to linkify everything (object types in signatures, return types, e.t.c.)
* Allowing to specify a URL to retrieve documentation about global objects (like `Array` or `String`)
* Support for [content references (or conrefs)](http://www.github.com/gjtorikian/markdown_conrefs). Conrefs are a way to write a sentence once, and refer to it in multiple locations. 
* Documentation runs through [a test suite](https://github.com/gjtorikian/functional-docs) to ensure the validity of all links and images
* Support for arbitrary metadata on classes and members (that can be used in templates)
* Support for arbitrary Markdown-to-HTML page conversion

Markdown is converted using [namp](https://github.com/gjtorikian/namp).

# Installation

You'll need `node.js` and `npm` installed. Then, you can choose to install Panino globally:

    npm install -g panino

I usually write a simple build script to do the work. Here's how that might look for a pdoc-like system:

```javascript
var options = {
  title       : "Some test docs",
  output      : './output',
  skin        : "./skins/goose/templates/layout.jade",
  assets      : "./skins/goose/assets",
  additionalObjs : "./additionalObjs.json",
  parseOptions   : "./nodeParseOptions.json"
};

var files = wrench.readdirSyncRecursive("./nodejs_ref_guide").map(function(f) {
  return path.join(__dirname + "/nodejs_ref_guide/" + f);
});

panino.parse(files, options, function (err, ast) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  panino.render('html', ast, options, function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
```

Otherwise, you can try to call it from the CLI:

```
node panino [source_files_directory]
```

# Internals

Panino has two processes: a parsing phase, and a rendering phase. 

`panino.parse()` takes three arguments:

* An array of files to use
* Build options
* A callback that returns `err` and the parsed `ast`

`panino.render` takes four arguments:

* The rendering mode; this can be `html` or `json`, or `c9ac` to provide a format compatible with [Cloud9 IDE](http://c9.io)'s auto completion tool. You can also create your own renderers.
* The previously created `ast`
* Build options
* A final callback to check for `err`

# Reporting

Panino also supports reporting methods that are missing documentation. Currently, this is only supported for `"jsd"`-style parsing. There are two ways to report missing documentation:

* By passing in `report: true`, Panino will print out a list of missing methods in a class, along with a percentage indicating the overall coverage.
* By passing in `reportOnly: true`, Panino's `parse()` will return a `reportObject` instead of an `ast`, as the second argument in the callback. You can then take this object and iterate over it any way you choose.

Regardless of whether or not you report them, missing methods are inserted into the final documentation. 

# License

This project is distributed under the [MIT](https://github.com/gjtorikian/panino-docs/blob/master/LICENSE) license.

# Why the Name?

_Panino_ refers to [a type of sandwich in Italy](http://en.wikipedia.org/wiki/Panini_\(sandwich\)#Terminology). Panini is its plural form, but is often mistakenly used as the singular. It seemed important to draw attention to the fact that what you're defining should represent what it actually is, in documentation and beyond.
