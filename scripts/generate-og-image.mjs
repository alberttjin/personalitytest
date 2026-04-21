/**
 * Facebook / iMessage / most chat apps require PNG or JPEG for og:image, not SVG.
 * Run before `vite build` so `public/og-card.png` exists in the output.
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = join(root, 'public/og-card.svg');
const outPath = join(root, 'public/og-card.png');

await sharp(svgPath)
  .resize(1200, 630, { fit: 'cover' })
  .png()
  .toFile(outPath);

console.log('Wrote', outPath);
