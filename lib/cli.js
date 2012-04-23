'use strict';

// stdlib
var fs = require('fs');
var path = require('path');

// 3rd-party
var FsTools = require('fs-tools');
var nomnom = require('nomnom');
var wrench = require('wrench');
var md_conrefs = require('markdown_conrefs');
var funcDocs = require('functional-docs');

// internal
var Panino = require('./index');

var panino = exports;

// walk_many(paths, pattern, iterator, callback)
// - paths (Array): array of paths to sequentially walk
//
// Other arguments correspond to those of [[FsTools.walk]]
function walk_many(paths, pattern, iterator, callback) {
    // don't touch original array
    paths = paths.slice();

    function next(err) {
        var path;

        // get next path
        while (paths.length) {
            path = paths.shift();
        }

        // skip empty path or report real error
        if (err || !path) {
            callback(err);
            return;
        }

        // do walk path
        FsTools.walk(path, pattern, iterator, next);
    }

    next();
}

panino.main = exports.main = function (args, callback) {
    //
    // parse options
    //
    var opts = nomnom.option('path', {
        position: 0,
        list: true,
        required: true,
        help: 'Source files location',
        metavar: 'PATH',
    }).option('extension', {
        abbr: 'e',
        help: 'Source files extension [js]',
        metavar: 'STRING',
    default:
        'js',
    }).option('recursive', {
        abbr: 'r',
        help: 'If set, recursively walks the source file directory',
        flag: true
    }).option('output', {
        abbr: 'o',
        help: 'Resulting file(s) location [doc]',
        metavar: 'PATH',
    default:
        'doc',
    }).option('format', {
        abbr: 'f',
        help: 'Documentation format [html]',
        choices: ['html', 'json', 'js'],
        metavar: 'FMT',
    default:
        'html',
    }).option('index', {
        abbr: 'i',
        help: 'Index file [README.md]',
        metavar: 'FILE',
    default:
        'README.md',
    }).option('title', {
        full: 'title',
        abbr: 't',
        help: 'Documentation title. If omitted, it will be guessed from manifest, if any',
    default:
        '{package.name} {package.version} API documentation',
        metavar: 'STRING',
    }).option('linkFormat', {
        abbr: 'l',
        full: 'link-format',
        help: 'Format for link to source file [{file}#L{line}]',
        //default: '../{file}#L{line}',
        metavar: 'FMT',
    }).option('globalObjType', {
        abbr: 'g',
        full: 'global-object-type',
        help: 'Defines the type of language you are documenting. Only necessary with Markdown files; otherwise, file extensions are used. ',
        metavar: 'STRING',
    default:
        'NADA',
    }).option('docPath', {
        abbr: 'j',
        full: 'doc-path',
        help: 'Define URL for documentation (for global objects, like String & Array). ',
        metavar: 'STRING',
    default:
        'http://www.nodemanual.org/latest/js_doc/%s.html',
    }).option('additionalGlobalObjs', {
        abbr: 'a',
        full: 'additional-global-objects',
        help: 'The path to a JSON file containing a structure defining more global objects.',
        metavar: 'PATH',
    }).option('split', {
        abbr: 's',
        full: 'split',
        help: 'Splits the output into a file per class [yes]',
        choices: ['yes', 'no'],
        metavar: 'STRING',
    default:
        'yes',
    }).option('keepChildClasses', {
        abbr: 'k',
        full: 'keepChildClasses',
        help: 'If files are split, setting this flag true keeps them on the same page as the parent; otherwise, they get their own files, too [true]',
        flag: true
    }).option('parseOptions', {
        abbr: 'p',
        full: 'parse-options',
        help: 'The path to a JSON file defining various parse options you want to use.',
        metavar: 'PATH',
    }).option('skin', {
        help: 'The Jade templates to use for your rendered documentation',
    }).option('viewSourceLabel', {
        full: 'view-source-label',
        help: 'Text for "View source" link [View Source Code]',
    default:
        'View source code',
        metavar: 'STRING',
    }).parse(args);

    //
    // read manifest from file
    //
    var manifest = {};
    try {
        // not using require for node < v0.4 caompatibility
        manifest = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    }
    catch (err1) {}

    //
    // flatten manifest structure, to allow easier access
    //
    (function () {
        var options = {};

        function flatten(o, path) {
            var i, p;
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    p = path ? path + '.' + i : i;
                    options[p] = o[i];
                    if (o[i] && typeof o[i] === 'object') {
                        flatten(o[i], p);
                    }
                }
            }
        }
        flatten(manifest);
        manifest = options;
    }());

    function interpolate(string, file, line) {
        var r = string.replace(/\{url\}/g, opts.package.url || '').replace(/\{file\}/g, file).replace(/\{line\}/g, line).replace(/\{package\.([^}]+)\}/g, function (all, path) {
            return opts.package[path];
        });
        return r;
    }


    // try to collect critical variables
    opts.package = manifest;
    opts.package.name = opts.package.name || '';
    opts.package.version = opts.package.version || '';
    opts.package.url = opts.package['repository.url'] || opts.package.repository || '';
    opts.package.url = opts.package.url.replace(/^git:\/\//, 'https://').replace(/\.git$/, '');
    // FIXME: guesswork: valid package.json means github.com link format
    if (!opts.linkFormat) {
        if (opts.package.url.match(/\/\/github\.com\//)) {
            opts.linkFormat = '{url}/blob/master/{file}#L{line}';
        }
    }

    //console.error(opts); process.exit(0);
    //
    // collect sources
    //
    var files = [];
    md_conrefs.init(opts.path, opts.extension); // collect conref IDs
    walk_many(opts.path, '\\.' + opts.extension + '$', function (filename, stat, cb) {
        //console.log('Processing', filename);
        files.push(filename);
        cb();
    }, function (err) {
        var panino, paninoArray = [],
            output;
        if (err) {
            return callback(err.message || err);
        }
        var safeFiles = [];
        if (opts.recursive === undefined) {
            files.forEach( function (el, idx, arr) {
                if (path.dirname(el) == path.normalize(new String(opts.path))) {
                    safeFiles.push(el);
                }
            });
        }
        else {
            safeFiles = files;
        }
        
        // build trees
        if (opts.format == 'html' && opts.split == 'yes') {
            for (var f = 0; f < safeFiles.length; f++) {
                var f_a = new Array(1);
                f_a[0] = safeFiles[f];
                paninoArray.push(new Panino(f_a, {
                    // given package URL, file name and line in the file, format link to source file.
                    // do so only if `packageUrl` is set or `linkFormat` is set
                    formatLink: (opts.linkFormat || opts.package.url) &&
                    function (file, line) {
                        //return Util.normalize(interpolate(opts.linkFormat, file, line));
                        return interpolate(opts.linkFormat, file, line);
                    },
                    format: opts.format,
                    extension: opts.extension,
                    parseOptions: opts.parseOptions,
                    globalObjType: opts.globalObjType,
                    additionalGlobalObjs: opts.additionalGlobalObjs,
                    docPath: opts.docPath,
                    srcPath: opts.path,
                    split: true,
                    keepChildClasses: opts.keepChildClasses,
                    linkFunc: opts.linkFunction,
                    silent: true // no one must know...
                }))
            };
        }

        // TODO: toHTML, when split, still relies on a SINGLE JSON structure, to better
        // determine the full list of references...so we actually run the build twice :(
        panino = new Panino(safeFiles, {
            // given package URL, file name and line in the file, format link to source file.
            // do so only if `packageUrl` is set or `linkFormat` is set
            formatLink: (opts.linkFormat || opts.package.url) &&
            function (file, line) {
                //return Util.normalize(interpolate(opts.linkFormat, file, line));
                return interpolate(opts.linkFormat, file, line);
            },
            format: opts.format,
            extension: opts.extension,
            parseOptions: opts.parseOptions,
            globalObjType: opts.globalObjType,
            additionalGlobalObjs: opts.additionalGlobalObjs,
            docPath: opts.docPath,
            srcPath: opts.path,
            split: false,
            linkFunc: opts.linkFunction
        });

        // output tree
        output = opts.output;

        wrench.rmdirSyncRecursive(output, true);
        wrench.mkdirSyncRecursive(output, "0755");

        var parentOutDir = output.split("/")[1] + "/" + output.split("/")[2];

        console.log("Converting to " + opts.format + "...");
        switch (opts.format) {
        case 'json':
            fs.writeFileSync(output + "out.json", panino.toJSON(opts));
            break;

        case 'js':
            fs.writeFileSync(output + "out.js", 'var panino = ' + panino.toJSON(opts) + ';');
            break;

        case 'html':
            var jsonDocs = JSON.parse(panino.toJSON(opts));

            wrench.copyDirSyncRecursive(path.join(opts.skin, 'skeleton'), parentOutDir + "/resources", {
                preserve: true
            });

            if (opts.split == 'yes') {
                paninoArray.forEach(function (n) {
                    var outFile = n.fileName + ".html";
                    var html = n.toHTML(opts, jsonDocs.list, outFile);
                    if (html[1] !== undefined) fs.writeFileSync(path.join(output, outFile), html);
                });
            }
            else {
                var html = panino.toHTML(opts);
                fs.writeFileSync(path.join(output, 'index.html'), html[0]);
            }

            funcDocs.runTests([output], {
                stopOnFail: false,
                ext: ".html"
            }, function (err) {
                if (err) console.error(err);
            });
            break;

        default:
            return callback(opts.format + ': not supported');

        }

        callback();
    });
}

// Not from the outside? Then it's from the command line
if (!module.parent) {
    exports.main(process.argv.slice(2), function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
}