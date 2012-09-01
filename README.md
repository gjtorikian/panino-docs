# Introduction

Panino is an API documentation generation tool. It can read comments from your source files, or, parse Markdown files and generate the same documentation. Panino runs on [Node.js](http://www.nodejs.org), and uses [Jade](http://jade-lang.com/) as its templating engine.

Panino parses your content following a strict, no-crap-allowed grammar that ensures **correct** and **consistent** documentation, because you've written it following a specific syntax. This means that there is a very specific set of rules and expectations as to how to write your documentation. These rules are not terribly hard or unweildly. Keeping documentation parsed through a grammar ensures thorough and consistent docs, no matter who it's written by. To summarize: 

> Unlike other inline-doc parsers, [this] does not rely on the JavaScript source code at all; it only parses the comments. This approach, though slightly more verbose, is much better at generating consistent, reliable documentation, and avoids the headaches encountered when documenting highly dynamic languages.

This project is forked from [ndoc](https://github.com/nodeca/ndoc), which itself is based off of [pdoc](https://github.com/tobie/pdoc). [This blog post](http://andrewdupont.net/2008/11/16/pdoc-inline-documentation-for-prototype/) identifies some of the advantages over other commenting-to-documentation systems. Differences from ndoc are listed in [the manual](http://gjtorikian.github.com/panino-docs/), where you can also find more help on usage and syntax.

### Who Uses It?

* [Ace API](http://ace.ajax.org/api)
* [NodeManual](http://www.nodemanual.org)

# Installation

You'll need `node.js` and `npm` installed. Then, you can can choose to install Panino globally:

    npm install -g panino

From the command line, just run

    node panino --path [source_files]

Otherwise, you can write a simple build script to do the work for you. Here's how that might look:

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

# License

This project is distributed under the [GPL](https://github.com/gjtorikian/panino-docs/blob/master/LICENSE) license.

# Why the Name?

_Panino_ refers to [a type of sandwich in Italy](http://en.wikipedia.org/wiki/Panini_\(sandwich\)#Terminology). Panini is its plural form, but is often mistakenly used as the singular. It seemed important to draw attention to the fact that what you're defining should represent what it actually is, in documentation and beyond.