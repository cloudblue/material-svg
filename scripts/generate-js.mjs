// Generates js/<variant>.js and .d.ts: one { viewBox, body } export per icon, named like the root entry files.
// Usage: node scripts/generate-js.mjs [package dir] [out dir]
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [src = '.', out = '.'] = process.argv.slice(2);
const iconsRoot = join(src, 'icons');
const variants = {};
const names = new Set();
const files = readdirSync(iconsRoot, { recursive: true }).filter((f) => f.endsWith('.svg')).sort();

for (const file of files) {
  // Same naming rule as apply-updates.yml: google/edit/baseline_thin.svg -> googleEditBaselineThin.
  const name = file.replace(/[/_-]./g, (g) => g[1].toUpperCase()).slice(0, -4);
  const variant = file.split('/')[2].replace(/_thin|\.svg/g, '');
  const svg = readFileSync(join(iconsRoot, file), 'utf8');
  // Regex over a known machine-generated set; switch to an SVG parser if a hand-made icon breaks it.
  const [, attrs, inner] = svg.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>/) ?? [];
  const viewBox = attrs?.match(/viewBox="([^"]+)"/)?.[1];
  // body loses the root's xmlns:* declarations, so xlink:href becomes plain href (SVG 2) to keep it standalone-valid.
  const body = inner?.replace(/>\s+</g, '><').replace(/\bxlink:href\s*=/g, 'href=').trim();

  // Any other prefixed attribute (xlink:, inkscape:, sodipodi:...) would break a standalone <svg>: fail instead.
  // xml: is predeclared in XML, so it is allowed.
  if (!viewBox || !body || body.includes('<svg') || /\s(?!xml:)[\w-]+:[\w-]+\s*=/.test(body) || names.has(name)) {
    throw new Error(`Cannot convert ${file}`);
  }
  names.add(name);
  (variants[variant] ??= []).push([name, { viewBox, body }]);
}

mkdirSync(join(out, 'js'), { recursive: true });
// Marks js/ as ESM so Node imports it without the MODULE_TYPELESS_PACKAGE_JSON warning; the root package stays untyped.
// Bundlers read sideEffects from the closest package.json, so it repeats the root's value.
writeFileSync(join(out, 'js', 'package.json'), '{ "type": "module", "sideEffects": false }\n');
for (const [variant, icons] of Object.entries(variants)) {
  const js = icons.map(([name, data]) => `export const ${name} = ${JSON.stringify(data)};\n`);
  const dts = icons.map(([name]) => `export declare const ${name}: IconData;\n`);

  writeFileSync(join(out, 'js', `${variant}.js`), js.join(''));
  writeFileSync(join(out, 'js', `${variant}.d.ts`), `export type IconData = { viewBox: string; body: string };\n${dts.join('')}`);
}

console.log(`${files.length} svg files -> ${names.size} exports`);
for (const [variant, icons] of Object.entries(variants)) console.log(`  ${variant}: ${icons.length}`);
