var panino = require("./lib/cli");

panino.main(["./src/nodejs_ref_guide", "-e", "markdown", "-f", "html", "-g", "javascript", "-p", "./parseOptions.json", "-a", "./additionalObjs.json", "-o", "./out/", "-t", "Node.js Reference Guide", "--skin", "./skins/goose/", "-s"], function(err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});