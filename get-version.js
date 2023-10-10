const fs = require('fs');

try {
  const packageJson = JSON.parse(fs.readFileSync('../../package.json', 'utf-8'));
  const version = packageJson.version;
  console.log(version);
} catch (error) {
  console.error('Error reading or parsing package.json:', error);
  process.exit(1);
}
