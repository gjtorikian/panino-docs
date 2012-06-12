var panino = require("./lib/cli");

panino.main(["./tests/prototype", "-e", "js", "-f", "html", "-p", "./parseOptions.json", "-a", "./additionalObjs.json", "-o", "./out/", "-t", "Prototype Docs", "--skin", "./skins/goose/", "-s", "-r"], function(err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});