const fse = require("fs-extra");
const path = require("path");

fse.copySync("src", "dist");

const dirs = fse.readdirSync("src");

dirs.forEach((module) => {
  fse.moveSync(
    path.resolve("dist", module + ".js"),
    path.resolve("dist", module, "index.js"),
  );
});
