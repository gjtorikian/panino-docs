var exec = require("child_process").exec;

exec("jison src/js-parser.y", function (error, stdout, stderr) {
    if (error) {
        console.error(stderr)
        process.exit(1);
    }

    exec("mv js-parser.js lib/panino/plugins/parsers/javascript/parser.js", function (error, stdout, stderr) {
	    if (error) {
	        console.error(stderr)
	        process.exit(1);
	    }
	});
});