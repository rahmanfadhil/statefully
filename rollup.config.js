/* eslint-disable */
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./src/index.ts",
  plugins: [typescript({ clean: true }), uglify()],
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.umd.js",
      name: "Statefully",
      format: "umd",
    },
  ],
};
