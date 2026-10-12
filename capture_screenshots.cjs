const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const bin = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const screens = ['home', 'alerts', 'guide', 'prof'];
const langs = ['mr', 'hi', 'en'];

console.log('Capturing screenshots with browser:', bin);

for (const lang of langs) {
  for (const scr of screens) {
    const outFile = path.join(outDir, `${scr}_${lang}.png`);
    // Pass demo=1 to render static state cleanly
    const url = `http://localhost:4173/?demo=1&lang=${lang}&screen=${scr}`;
    const cmd = `"${bin}" --headless=new --disable-gpu --virtual-time-budget=2000 --window-size=412,850 --screenshot="${outFile}" "${url}"`;
    try {
      execSync(cmd, { stdio: 'ignore' });
      const size = fs.existsSync(outFile) ? fs.statSync(outFile).size : 0;
      console.log(`Saved: ${scr}_${lang}.png (${size} bytes)`);
    } catch (e) {
      console.error(`Failed ${scr}_${lang}:`, e.message);
    }
  }
}

console.log('Finished capturing screenshots.');
