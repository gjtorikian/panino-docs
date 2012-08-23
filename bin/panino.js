#!/usr/bin/env node

'use strict';

// stdlib
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

// 3rd-party
var async = require('async');

// internal
var Panino      = require('..');
var template  = require('../lib/panino/common').template;

function exit(err) {
    if (err) {
      console.error(err.message || err);
      process.exit(1);
    }

    process.exit(0);
}

//
// preprocess plugins
//


Panino.cli.parseKnownArgs().shift().use.forEach(function (pathname) {
  if (/^\./.test(pathname)) {
    pathname = path.resolve(process.cwd(), pathname);
  }

  try {
    Panino.use(require(pathname));
  } catch (err) {
    exit('Failed add renderer: ' + pathname + '\n\n' + err.toString());
  }
});


//
// parse options
//

var options = Panino.cli.parseArgs();
//
// Process aliases
//

options.aliases.forEach(function (pair) {
  Panino.extensionAlias.apply(null, pair.split(':'));
});

//
// Post-process some of the options
//

options.title = template(options.title || '', {'package': options.package});
options.index = options.index || '';

//
// collect sources, parse into ast, render
//

async.waterfall([
  function collect_files(next) {
    Panino.cli.findFiles(options.paths, options.exclude, next);
  },
  function parse_files(files, next) {
    Panino.parse(files, options, next);
  },
  function render_ast(ast, next) {
    Panino.render(options.renderer, ast, options, next);
  }
], exit);
