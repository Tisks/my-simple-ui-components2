const { spawnSync } = require('child_process');
const fs = require('fs');

const priorVersion = process.argv[2];
const newVersion = process.argv[3];

const args = [
  'conventional-changelog-cli',
  '-p',
  'react',
  '-r',
  '0',
  '-t',
  priorVersion,
  '-n',
  newVersion,
];

const result = spawnSync('npx', args, { stdio: 'pipe', encoding: 'utf-8' });

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

const changelog = result.stdout;

fs.writeFileSync('CHANGELOG.md', changelog);
console.log(changelog);
console.log('Changelog generated and saved.');
