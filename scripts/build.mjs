import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.cwd());
const dist = join(root, 'dist');
// Keep the output directory in place: the Windows preview server may hold a
// generated asset open, so deleting the whole tree can block the build.
mkdirSync(dist, { recursive: true });
mkdirSync(join(dist, 'assets'), { recursive: true });
writeFileSync(join(dist, 'assets', 'hero-industrial-city.webp'), readFileSync(join(root, 'assets', 'hero-industrial-city.webp')));
for (const file of ['index.html', 'styles.css', 'refined.css', 'reference.css', 'map-overrides.css', 'overview-v2.css', 'overview-v3.css', 'app.js', 'd3.min.js', 'public_china.json']) {
  const source = join(root, file);
  if (!existsSync(source)) throw new Error(`Missing source: ${file}`);
  writeFileSync(join(dist, file), readFileSync(source));
}
console.log(`Built offline demo to ${dist}`);
