// github-booster.js – generate 30 dummy commits in a temporary repo
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Directory for the temporary repo (inside the workspace's scratch folder)
const BOOST_DIR = path.resolve(__dirname, 'github-boost-repo');

function log(msg) {
  console.log(`🚀 ${msg}`);
}

function initRepo() {
  if (!fs.existsSync(BOOST_DIR)) {
    fs.mkdirSync(BOOST_DIR, { recursive: true });
    log('Created temporary boost directory');
  }
  // Initialize a new Git repo if not already initialized
  if (!fs.existsSync(path.join(BOOST_DIR, '.git'))){
    execSync('git init', { cwd: BOOST_DIR, stdio: 'ignore' });
    execSync('git config user.name "Boost Bot"', { cwd: BOOST_DIR });
    execSync('git config user.email "boost@example.com"', { cwd: BOOST_DIR });
    log('Initialized new git repository');
  }
}

function makeCommit(i) {
  const filePath = path.join(BOOST_DIR, 'dummy.txt');
  // Append a new line to dummy.txt
  fs.appendFileSync(filePath, `Commit ${i} – ${new Date().toISOString()}\n`);
  // Stage and commit
  execSync('git add .', { cwd: BOOST_DIR });
  execSync(`git commit -m "Boost commit ${i}"`, { cwd: BOOST_DIR, stdio: 'ignore' });
  log(`✅ Commit ${i} created`);
}

function runBoost(){
  initRepo();
  for(let i=1;i<=30;i++){
    makeCommit(i);
  }
  log('🎉 All 30 boost commits generated successfully!');
  console.log('You can now push this temporary repo to any remote if you wish, e.g.:');
  console.log('git remote add origin <your-repo-url> && git push -u origin master');
}

runBoost();
