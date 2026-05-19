const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FILE_NAME = 'github_boost.txt';
const COMMIT_COUNT = 30;

console.log(`Starting ${COMMIT_COUNT} dummy commits...`);

for (let i = 1; i <= COMMIT_COUNT; i++) {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(FILE_NAME, `Boost commit ${i} at ${timestamp}\n`);
  
  execSync(`git add ${FILE_NAME}`);
  execSync(`git commit -m "GitHub Boost: Commit ${i} of ${COMMIT_COUNT}"`);
  
  console.log(`Committed ${i}/${COMMIT_COUNT}`);
}

console.log('Done! Now you can run `git push` to push the commits to GitHub.');
