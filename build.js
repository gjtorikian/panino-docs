var panino = require("./lib/cli");

panino.main(["./src/nodejs_ref_guide", "-e", "markdown", "-f", "html", "-g", "javascript", "-k", "-p", {"useDash": true, "useComma": true}, "-o", "./out/", "-t", "Prototype", "--skin", "./skins/goose/"], function(err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});