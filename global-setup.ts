import * as fs from 'fs';
import * as path from 'path';

export default function globalSetup() {
  const screenshotsDir = path.resolve(__dirname, 'Screenshots');

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Find existing test-run-N folders to determine next run number
  let runNumber = 1;
  const existing = fs.readdirSync(screenshotsDir)
    .filter(d => /^test-run-\d+$/.test(d))
    .map(d => parseInt(d.split('-').pop()!))
    .filter(n => !isNaN(n));

  if (existing.length > 0) {
    runNumber = Math.max(...existing) + 1;
  }

  const runDir = path.join(screenshotsDir, `test-run-${runNumber}`);
  fs.mkdirSync(runDir, { recursive: true });

  // Store in env so test workers can access it
  process.env.SCREENSHOT_DIR = runDir;
}
