const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle filename
    path: path.resolve(__dirname, "./build"), // Output directory
    pathinfo: true, // Include path information
    // Add the following line to emit declaration files
    declarationDir: path.resolve(__dirname, "./build/declarations"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"], // File extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Match TypeScript and TypeScript React files
        exclude: /node_modules/,
        use: "ts-loader", // Use ts-loader for TypeScript compilation
      },
      {
        test: /\.d\.ts$/,
        use: "ignore-loader", // Ignore .d.ts files in the build output
      },
    ],
  },
};
