var panino = require("./lib/panino");

panino(["./tests/prototype", "-e", "js", "-f", "html", "-p", "./parseOptions.json", "-a", "./additionalObjs.json", "-o", "./out/", "-t", "Prototype Docs", "--skin", "./skins/goose/templates/layout.jade", "-s", "-r"]);

/*
panino.main(["./tests/prototype", "-e", "js", "-f", "ast", "-p", "./parseOptions.json", "-a", "./additionalObjs.json", "-o", "./out/", "-t", "Prototype Docs", "--skin", "./skins/goose/", "-s", "-r"], function(err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});*/