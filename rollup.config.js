import path from "path";
import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import fse from "fs-extra";

const extensions = [".js", ".ts"];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

fse.removeSync("dist");

const dirs = fse.readdirSync("src");

console.log(dirs);

module.exports = {
  input: dirs.reduce((acc, current) => {
    acc[current] = resolve("src", current, "index.ts");

    return acc;
  }, {}),
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // process.env.NODE_ENV === "dev" &&
    //   serve({
    //     port: 8080,
    //     contentBase: "public",
    //   }),
    nodeResolve({
      extensions,
      // modulesOnly: true,
      browser: true,
    }),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
  ],
};
