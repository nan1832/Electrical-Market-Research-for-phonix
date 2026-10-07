import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const required = ['index.html', 'styles.css', 'app.js', 'README.md'];
for (const file of required) {
  const body = await readFile(resolve(process.cwd(), file), 'utf8');
  if (!body.trim()) throw new Error(`${file} is empty`);
}
const app = await readFile(resolve(process.cwd(), 'app.js'), 'utf8');
for (const token of ['Lukou', 'S01', 'S09', 'renderOverview', 'renderEvidence']) {
  if (!app.includes(token)) throw new Error(`Missing verification token: ${token}`);
}
console.log('Verified: offline pages, evidence data, and render routes are present.');
