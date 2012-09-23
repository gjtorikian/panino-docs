var exec = require("child_process").exec;

exec("jison ./lib/panino/plugins/parsers/javascript/pdoc/pdoc.y", function (error, stdout, stderr) {
    if (error) {
        console.error(stderr)
        process.exit(1);
    }

    exec("mv pdoc.js ./lib/panino/plugins/parsers/javascript/pdoc/pdoc.js", function (error, stdout, stderr) {
	    if (error) {
	        console.error(stderr)
	        process.exit(1);
	    }
	});
});