const fs = require("fs");
const { spawnSync } = require("child_process");

// Function to get component names from index.ts
const getComponentNames = (indexPath = "packages/index.ts") => {
  const indexContent = fs.readFileSync(indexPath, "utf8");
  const componentRegex = /export { ([A-Z][a-zA-Z]*) } from/g;
  const componentMatches = indexContent.matchAll(componentRegex);
  const componentNames = [...componentMatches].map((match) => match[1]) ;
  return componentNames;
};

// Function to execute 'yarn' command in each component folder
const installDependenciesInComponentFolders = () => {
  getComponentNames().forEach((componentName) => {
    // Use 'spawnSync' to run 'yarn' command synchronously in the component folder
    const result = spawnSync("yarn", [], {
      cwd: componentName,
      stdio: "inherit", // Redirect child process's stdio to the parent process
    });

    if (result.error) {
      console.error(
        `Error while running 'yarn' in ${componentName} folder: ${result.error.message}`
      );
    } else {
      console.log(
        `'yarn' command executed successfully in ${componentName} folder.`
      );
    }
  });
};

installDependenciesInComponentFolders();
