const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const bin = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const shots = [
  {
    name: 'onboarding_role3.png',
    url: 'http://localhost:5174/?screen=onb&role=3&animals=cow:crossbred,buffalo',
    desc: 'Onboarding with Role 3 selected, showing species chips & breed selector',
  },
  {
    name: 'home_role3_alert.png',
    url: 'http://localhost:5174/?screen=home&role=3&scenario=heat_wave&animals=cow:crossbred,buffalo',
    desc: 'Home with Role 3 and an alert active (Heat Wave scenario top card)',
  },
  {
    name: 'home_role3_alert_animals.png',
    url: 'http://localhost:5174/?screen=home&role=3&scenario=heat_wave&animals=cow:crossbred,buffalo&scroll=animals',
    desc: 'Home with Role 3 scrolled to neutral animal advisory cards during Heat Wave',
  },
  {
    name: 'home_role3_calm.png',
    url: 'http://localhost:5174/?screen=home&role=3&scenario=calm&animals=cow:crossbred,buffalo',
    desc: 'Home with Role 3 and no alert active',
  },
  {
    name: 'home_role3_calm_animals.png',
    url: 'http://localhost:5174/?screen=home&role=3&scenario=calm&animals=cow:crossbred,buffalo&scroll=animals',
    desc: 'Home with Role 3 scrolled to neutral animal advisory cards on calm day',
  },
  {
    name: 'profile_role3_expanded.png',
    url: 'http://localhost:5174/?screen=prof&role=3&expandAnimals=1&animals=cow:crossbred,buffalo',
    desc: 'Profile with Animals panel expanded',
  },
  {
    name: 'home_role0_unchanged.png',
    url: 'http://localhost:5174/?screen=home&role=0&scenario=heat_wave',
    desc: 'Home with Role 0 unchanged',
  },
  {
    name: 'home_role5_unchanged.png',
    url: 'http://localhost:5174/?screen=home&role=5&scenario=heat_wave',
    desc: 'Home with Role 5 unchanged',
  },
];

console.log('Capturing species v2 screenshots (viewport 392x844)...');

for (const shot of shots) {
  const outFile = path.join(outDir, shot.name);
  const height = shot.name.startsWith('home_') ? 1250 : 844;
  const cmd = `"${bin}" --headless=new --disable-gpu --virtual-time-budget=2500 --window-size=392,${height} --screenshot="${outFile}" "${shot.url}"`;
  try {
    execSync(cmd, { stdio: 'ignore' });
    const size = fs.existsSync(outFile) ? fs.statSync(outFile).size : 0;
    console.log(`✓ Saved ${shot.name} (${size} bytes) - ${shot.desc}`);
  } catch (err) {
    console.error(`✗ Failed ${shot.name}:`, err.message);
  }
}

console.log('Done.');
