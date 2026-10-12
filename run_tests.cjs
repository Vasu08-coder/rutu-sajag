// In-memory / scratch-compiled test suite for rutu-sajag
const ts = require('typescript');
const fs = require('fs');
const os = require('os');
const path = require('path');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rutu-tests-'));

function compileTs(src, dst) {
  let code = fs.readFileSync(src, 'utf8');
  code = code.replace(/import\.meta\.env/g, 'process.env');
  code = code.replace(/import\.meta/g, '({ env: process.env })');
  const js = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  fs.writeFileSync(dst, js);
}
fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({ type: 'commonjs' }));

fs.mkdirSync(path.join(tmpDir, 'src', 'config'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'services'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'data'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'content'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'i18n'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'state'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'src', 'views'), { recursive: true });

compileTs('src/data/guide.ts', path.join(tmpDir, 'src', 'data', 'guide.js'));
compileTs('src/data/places.ts', path.join(tmpDir, 'src', 'data', 'places.js'));
compileTs('src/data/icons.ts', path.join(tmpDir, 'src', 'data', 'icons.js'));
compileTs('src/data/allHazardsGuide.ts', path.join(tmpDir, 'src', 'data', 'allHazardsGuide.js'));
compileTs('src/config/hazards.ts', path.join(tmpDir, 'src', 'config', 'hazards.js'));
compileTs('src/config/districts.ts', path.join(tmpDir, 'src', 'config', 'districts.js'));
compileTs('src/config/speciesRules.ts', path.join(tmpDir, 'src', 'config', 'speciesRules.js'));
compileTs('src/config/speciesCatalog.ts', path.join(tmpDir, 'src', 'config', 'speciesCatalog.js'));
compileTs('src/content/advisoryGeneral.ts', path.join(tmpDir, 'src', 'content', 'advisoryGeneral.js'));
compileTs('src/i18n/mr.ts', path.join(tmpDir, 'src', 'i18n', 'mr.js'));
compileTs('src/i18n/hi.ts', path.join(tmpDir, 'src', 'i18n', 'hi.js'));
compileTs('src/i18n/en.ts', path.join(tmpDir, 'src', 'i18n', 'en.js'));
compileTs('src/i18n/index.ts', path.join(tmpDir, 'src', 'i18n', 'index.js'));
compileTs('src/services/guidance.ts', path.join(tmpDir, 'src', 'services', 'guidance.js'));
compileTs('src/services/marine.ts', path.join(tmpDir, 'src', 'services', 'marine.js'));
compileTs('src/services/safetyEngine.ts', path.join(tmpDir, 'src', 'services', 'safetyEngine.js'));
compileTs('src/services/weather.ts', path.join(tmpDir, 'src', 'services', 'weather.js'));
compileTs('src/services/alertService.ts', path.join(tmpDir, 'src', 'services', 'alertService.js'));
compileTs('src/services/climateNormals.ts', path.join(tmpDir, 'src', 'services', 'climateNormals.js'));
compileTs('src/state/store.ts', path.join(tmpDir, 'src', 'state', 'store.js'));
compileTs('src/views/shared.ts', path.join(tmpDir, 'src', 'views', 'shared.js'));
compileTs('src/views/home.ts', path.join(tmpDir, 'src', 'views', 'home.js'));
compileTs('src/views/onboarding.ts', path.join(tmpDir, 'src', 'views', 'onboarding.js'));
compileTs('src/views/profile.ts', path.join(tmpDir, 'src', 'views', 'profile.js'));
compileTs('test_suite.ts', path.join(tmpDir, 'test_suite.js'));
compileTs('species_v2.test.ts', path.join(tmpDir, 'species_v2.test.js'));

// Execute compiled test suites
try {
  require(path.join(tmpDir, 'test_suite.js'));
  require(path.join(tmpDir, 'species_v2.test.js'));
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
