// In-memory / scratch-compiled test suite for rutu-sajag
const ts = require('typescript');
const fs = require('fs');
const os = require('os');
const path = require('path');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rutu-tests-'));

function compileTs(src, dst) {
  const code = fs.readFileSync(src, 'utf8');
  const js = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  fs.writeFileSync(dst, js);
}

fs.mkdirSync(path.join(tmpDir, 'src', 'config'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'services'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'data'), { recursive: true });

compileTs('src/data/guide.ts', path.join(tmpDir, 'src', 'data', 'guide.js'));
compileTs('src/data/places.ts', path.join(tmpDir, 'src', 'data', 'places.js'));
compileTs('src/data/allHazardsGuide.ts', path.join(tmpDir, 'src', 'data', 'allHazardsGuide.js'));
compileTs('src/config/hazards.ts', path.join(tmpDir, 'src', 'config', 'hazards.js'));
compileTs('src/config/districts.ts', path.join(tmpDir, 'src', 'config', 'districts.js'));
compileTs('src/services/marine.ts', path.join(tmpDir, 'src', 'services', 'marine.js'));
compileTs('src/services/safetyEngine.ts', path.join(tmpDir, 'src', 'services', 'safetyEngine.js'));
compileTs('src/services/weather.ts', path.join(tmpDir, 'src', 'services', 'weather.js'));
compileTs('src/services/alertService.ts', path.join(tmpDir, 'src', 'services', 'alertService.js'));
compileTs('src/services/climateNormals.ts', path.join(tmpDir, 'src', 'services', 'climateNormals.js'));
compileTs('test_suite.ts', path.join(tmpDir, 'test_suite.js'));

// Execute compiled test suite
try {
  require(path.join(tmpDir, 'test_suite.js'));
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
