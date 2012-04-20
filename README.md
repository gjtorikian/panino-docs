# Preface

[ndoc](https://github.com/nodeca/ndoc) is a totally awesome Javascript documentation tool written in Node.js, based on [pdoc](https://github.com/tobie/pdoc). [This blog post](http://andrewdupont.net/2008/11/16/pdoc-inline-documentation-for-prototype/) identifies some of the advantages over other Javascript documentation ystems.

This fork of ndoc is extraordinarily modified (hacked? nah...). While you could run this through the command line, we don't, and prefer to `exec` ndoc as a backbone/submodule for a larger build process.

The changes here go beyond skins modified in the Jade templates. Core modifications include:

* Creating a separate page for every class, including support for "`[[ ]]`"-notation linking
* Adding "ellipsis" descriptions, truncating the full doc into 120 characters.
* Linkifying everything (object types in arguments, return types, e.t.c.)
* Allowing the same dirname for output to exist
* Better support for non-js files; for .md or .markdown files, this ndoc adds "*" prefixes to continue to support parsing
* Allowing to specify a URL to retrieve Javascript documentation about global objects

## Changes

#### Directory structure

One new caveat is that your source files **must** be two folders deep; for example, `./src/myDocs`. This was made to support splitting objects into individual files, and given each of those objects a parent directory. 

For example, you could have `./src/myDocs1/` and `./src/myDocs2/`; all the objects in these files will output to `./out/myDocs1` and `./myDocs2`, respectfully. Subfolders within the parent directory are flattened; e.g. files in `./src/myDocs1/foo` still appear in `./out/myDocs1`.

Furthermore, resources like CSS and Javascript in the _./skins_ now have their own folder called "resources," to differentiate them from the content.

#### Retrieving Javascript documentation

This point is crucial (in my opinion) for awesome JS docs, so here's the full explanation. This modified version of ndoc attempts to linkify _everything_, which includes Javascript global objects. For example, if you're documenting this function: 

    /**
    * foo(bar, baz) -> Void
    * - bar (String): A string
    * - baz (Array): An array
    *
    * Does stuff
    **/

ndoc is going to want to make links to documentation for String and Array. And why shouldn't it? Providing links to your own documentation are supported (_.e.g._, if `bar (myClass)` were the case, `myClass` would be a link back to the `myClass` documentaion).

With this in mind, there's a new command-line parameter, `-j`, which defines the URL format for Javascript documentation. By default, this points to `'http://www.nodemanual.org/latest/js_doc/%s.html'`. If you want to override this value, provide your own URL string, keeping in mind that `%s` refers to the _name_ of the Javascript global object.

For example, providing a string of `-j https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/%s` will linkify the Javascript global objects to point to the MDN documentation; note the lack of a `.html` suffix here, as that's how the MDN docs work. As another example, `-j http://dochub.io/#javascript/%s` points to the Dochub documentation version&mdash;you get the idea, right?


#### Support for content references (conrefs)

I wrote [an entirely separate library for supporting conrefs](https://github.com/gjtorikian/markdown_conrefs) in Markdown. It's available on NPM as `'marked_conrefs'`. That library is bundled into this ndoc version.

Content references are a way to write a sentance once, and refer to it in multiple locations. 

* * *

Below is the original ndoc readme.

# NDoc - JavaScript documentation generator
[![Build Status](https://secure.travis-ci.org/nodeca/ndoc.png)](http://travis-ci.org/nodeca/ndoc)

NDoc is an inline comment parser and JavaScript documentation generator written in node.js.
This project is inspired by [PDoc](http://pdoc.org/syntax.html). It tries to keep compatibility,
but has some differences:

- NDoc is a CLI tool, not library. It doesn't require additional programming to execute.
- Clarified EBNF syntax. Definitions now **MUST** be separated with an empty line from the following comments.
- Added options for `deprecated` tag: you can set versions, when tag was deprecated and
  when it will be removed.
- Added new tags: `read-only`, `internal`, `chainable`
- Events support.


## How to Install

We suppose that you already have `node.js` and `npm` installed.
If not - try [nvm](https://github.com/creationix/nvm). Then install NDoc globally

    npm install -g ndoc


## Usage

    ndoc [options] <path>...

    path PATH                   Source files location

    Options:

      -h, --help                Output usage information
      -o, --output PATH         Resulting file(s) location [doc]
      -e, --extension STRING    Source files extension [js]
      -f, --format <html|js>    Documentation format [html]
      -i, --index PATH          Index file [README.md]
      -t, --title TITLE         Documentation title
                                Supports interpolation. See notes for --link-format.
      -l, --link-format         FMT String format for link to source file [{file}#L{line}]
                                {url} is substituted with the URL of repository read from manifest file
                                {file} is substituted with the name of the source file
                                {line} is substituted with the line number within the source file
                                E.g. http://github.com/nodeca/ndoc/{file}#L{line}
                                {package.XXX} is substituted with XXX key of package.json, if any
      --view-source-label TXT   Text for "View source" link
      --skin PATH               Custom templates
      -b, --broken-links ACTION What to do if broken link occured. Can be one of 'show', 'hide', 'throw'.
                                Default is 'hide'

NDoc uses data from `package.json` in current folder, if found one. This helps to minimize number of options when building documentation for node.js projects. For example, you can just run:

    ndoc ./lib


## Syntax

[NDoc Syntax](https://github.com/nodeca/ndoc/blob/master/syntax.md).
It is similar to [PDoc](https://github.com/tobie/pdoc) one, with some extentions (see start of this doc for details).


## For developers

If you like to make patches or develop skins - install NDoc in developer mode:

    git clone [your_fork_url]
    cd ndoc
    npm install --dev

After installation is done you can generate prototype documentation for test:

    make test

Then open `./test/proto-doc/index.html`. Here is [hosted doc example](http://nodeca.github.com/ndoc/tests/doc/). There are also some shortcuts in [Makefile](https://github.com/nodeca/ndoc/blob/master/Makefile),
if you make skin changes and need to constantly rebuild samples.

Three kinds of links
- links in []
- links in tabs
- links in signatures


## License

This project is distributed under [MIT](https://github.com/nodeca/ndoc/blob/master/LICENSE) license.