var panino = require("../index.js");
var wrench = require("wrench");
var path = require("path");

var options = {
  title       : "TEST",
  output      : "./tests/test_out",
  additionalObjs : "./additionalObjs.json"
};

panino.parse(["./tests/features/new_tags.js"], options, function (err, ast) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  panino.render('json', ast, options, function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});

//Panino.build(["./nodejs_ref_guide", "-e", "markdown", "-f", "html", "-d", "-p", "./nodeParseOptions.json", "-a", "./additionalObjs.json", "-o", "./out/", "-t", "Prototype Docs", "--skin", "./skins/goose/", "-s", "-r"]);