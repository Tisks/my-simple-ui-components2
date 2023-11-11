const fs = require("fs");
const path = require("path");

const scssFolderPath = "dist/scss"; // Path to the folder containing the SCSS files
const srcFolderPath = "src"; // Root directory of your source code;

function toPascalCase(name) {
  return name
    .replace(/[-_]\w/g, (match) => match.charAt(1).toUpperCase())
    .replace(/^\w/, (match) => match.toUpperCase());
}

function processFile(filePath, fileName) {
  let content = fs.readFileSync(filePath, "utf8");
  const importStatements = content.match(/@import ['"]([^'"]+)['"];/g);

  if (importStatements) {
    const importContentArray = [];
    importStatements.forEach((importStatement) => {
      const importPath = importStatement.match(/@import ['"]([^'"]+)['"];/)[1];
      const importFileName = path.basename(importPath, ".module.scss");
      const parentFolderName = toPascalCase(fileName.split(".module.scss")[0]);
      const importFolderPath = path.join(
        srcFolderPath,
        "components",
        parentFolderName,
        path.dirname(importPath),
        importFileName + ".module.scss"
      );

      try {
        const importContent = fs.readFileSync(importFolderPath, "utf8");
        const comment = `/* ${importFileName}.module.scss */`; // Add this comment
        importContentArray.push(comment, importContent);
        content = content.replace(importStatement, ""); // Remove the import statement
      } catch (err) {
        console.error(`Error reading file: ${importFolderPath}`);
      }
    });

    // Add comments and imported content at the bottom of the file
    content += "\n\n";
    content += importContentArray.join("\n\n");
  }

  // Save the modified content back to the file
  fs.writeFileSync(filePath, content);
}

function processSCSSFiles(folderPath) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively process subfolders
      processSCSSFiles(filePath);
    } else if (file.endsWith(".scss")) {
      // Process SCSS files
      processFile(filePath, file);
    }
  });
}

processSCSSFiles(scssFolderPath);
