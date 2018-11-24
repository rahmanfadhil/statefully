/* eslint-disable */
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./src/index.ts",
  plugins: [
    typescript({
      clean: true,
      tsconfigOverride: { exclude: ["**/*.spec.ts"] },
    }),
    uglify(),
  ],
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
  ],
};
