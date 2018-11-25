/* eslint-disable */
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  plugins: [
    typescript({
      clean: true,
      tsconfigOverride: { exclude: ["**/*.spec.ts"] },
    }),
  ],
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.min.js",
      name: "Statefully",
      format: "umd",
    },
  ],
};
