var exec = require("child_process").exec;

exec("jison src/pdoc-parser.y", function (error, stdout, stderr) {
    if (error) {
        console.error(stderr)
        process.exit(1);
    }

    exec("mv pdoc-parser.js lib/panino/plugins/parsers/javascript/pdoc/pdoc.js", function (error, stdout, stderr) {
	    if (error) {
	        console.error(stderr)
	        process.exit(1);
	    }
	});
});