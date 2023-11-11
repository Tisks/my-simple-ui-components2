import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { writeFileSync } from "fs";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          // Add other globals as needed
        },
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          // Add other globals as needed
        },
      },
    ],
    external: ["react", "react-dom"], // Specify the external dependencies
    plugins: [
      peerDepsExternal(), // Externalize peer dependencies
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        modules: true,
        extract: true,
        minimize: true,
        extensions: [".scss", ".css"],
      }),
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.scss$/, /\.css$/, /^wtw-ui-components/],
  },
];
