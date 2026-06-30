import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('./src/data/products.ts', 'utf8');
// strip image imports & replace image refs with empty string
src = src.replace(/^import .* from '@\/assets\/.*';\n/gm, '');
src = src.replace(/\bimage: \w+Img,/g, 'image: "",');
src = src.replace(/\bimages: \[[^\]]*\],/g, 'images: [],');
src = src.replace(/^export interface[\s\S]*?^}\n/gm, '');
src = src.replace(/: Product\[\]/g, '');
// Write as .mjs
writeFileSync('/tmp/prod.mjs', src);
