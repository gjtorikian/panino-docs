var panino = require("./lib/cli");

panino.main(["./src/prototype", "-e", "js", "-g", "javascript", "-o", "./out/", "-t", "Prototype", "--skin", "./skins/goose/"], function(err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});