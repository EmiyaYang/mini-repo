import path from "path";
import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import pkg from "./package.json";

const extensions = [".js", ".ts"];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve("./src/index.ts"),
  output: {
    file: resolve("./public", pkg.main),
    format: "esm",
  },
  plugins: [
    process.env.NODE_ENV === "dev" &&
      serve({
        port: 8080,
        contentBase: "public",
      }),
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
  ],
};
