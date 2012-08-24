var panino = require("./index.js");

var buildOptions = {
	parseOptions: "./parseOptions.json",
	additionalObjs: "./additionalObjs.json",
  output: "./out",
  title: "Prototype Docs",
  skin: "./skins/goose/templates/layout.jade",
  exclude: ["**/*.markdown"],
  split: true
}

panino.parse(["./tests/prototype"], buildOptions, function (err, ast) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  panino.render('html', ast, buildOptions, function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});