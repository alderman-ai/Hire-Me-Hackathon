// Cuts a tall full-page JPEG (audit_page.mjs output) into pieces you can look at.
// Usage: node scripts/check/crops.mjs <full.jpg> <out prefix> <piece height px> <max width px>
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");
const [src, out, step, w] = [process.argv[2], process.argv[3], Number(process.argv[4]), Number(process.argv[5])];
sharp.cache(false);
const meta = await sharp(src, { limitInputPixels: false }).metadata();
let n = 0;
for (let y = 0; y < meta.height; y += step) {
  const h = Math.min(step, meta.height - y);
  await sharp(src, { limitInputPixels: false }).extract({ left: 0, top: y, width: meta.width, height: h }).resize({ width: Math.min(w, meta.width) }).jpeg({ quality: 78 }).toFile(`${out}-${n}.jpg`);
  n++;
}
console.log(meta.width, meta.height, n);
