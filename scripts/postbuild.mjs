// Copies the prerendered 404 page to /404.html: the file name Netlify, Vercel, GitHub Pages and Nginx look for.
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const out = join('dist', 'volt-website', 'browser');
const src = join(out, '404', 'index.html');
if (!existsSync(src)) {
  console.error('postbuild: prerendered 404/index.html not found; did the build fail?');
  process.exit(1);
}
copyFileSync(src, join(out, '404.html'));
console.log('postbuild: wrote 404.html');
