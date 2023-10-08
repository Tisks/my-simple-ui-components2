import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { getComponentNames } from "./utils.js";
import packageJson from "./package.json" assert { type: "json" };

// Function to build packages for each component
const buildPackagesForComponents = () => {
  const rootIndexPath = "packages/index.ts";
  const componentNames = getComponentNames(rootIndexPath);

  const res = componentNames.flatMap((componentName) =>
    buildPackage(
      `packages/${componentName}/src/index.ts`,
      `packages/${componentName}/dist/index.d.ts`
    )
  );
  return res;
};

const buildPackage = (inputFile, outputDir) => {
  return [
    {
      input: inputFile,
      output: [
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: packageJson.module,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
          modules: true, // Enable CSS modules
          extract: true, // Extract CSS to a separate file
          minimize: true, // Minimize the CSS
          extensions: [".scss", ".css"], // Specify the file extensions to process
        }),
      ],
    },
    {
      input: inputFile,
      output: {
        file: `${outputDir}/index.d.ts`,
        format: "esm",
      },
      plugins: [dts()],
      external: [/\.scss$/, /\.css$/, /^my-simple-ui-components2/],
    },
  ];
};

export default [
  ...buildPackagesForComponents(),
  ...buildPackage("packages/index.ts", "dist/index.d.ts"),
];
