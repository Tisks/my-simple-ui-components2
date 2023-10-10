const { execSync } = require('child_process');
const fs = require('fs');

const priorVersion = process.argv[2];
const newVersion = process.argv[3];

const changelog = execSync(`npx conventional-changelog-cli -p angular -r 0 -t ${priorVersion} -n ${newVersion}`).toString();

fs.writeFileSync('CHANGELOG.md', changelog);
console.log('Changelog generated and saved.');
