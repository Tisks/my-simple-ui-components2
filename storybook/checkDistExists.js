const fs = require("fs");

const folderPath = "../dist"; // Replace with the actual folder path you want to check
const args = process.argv.slice(2); // Get command-line arguments

if (fs.existsSync(folderPath)) {
  process.exit(0); // Exit with success status code
} else {
  console.error(
    `\n \n ❌ The folder '${folderPath}' in the main package does not exist and its needed to ${
      args.includes("--run") ? "run" : "build"
    } the storybook due to it using their components for the stories \n \n`
  );
  process.exit(1); // Exit with error status code
}
