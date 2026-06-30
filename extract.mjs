import { products } from './src/data/products.ts';
const out = products.map(p => ({
  slug: p.slug, categorySlug: p.categorySlug,
  title: p.name.lt,
  body: `<p>${p.description.lt}</p><p><strong>Sudėtis:</strong> ${p.ingredients.lt}<br><strong>Kilmė:</strong> ${p.origin.lt}<br><strong>Pakuotė:</strong> ${p.packaging.lt}</p>`,
  vendor: p.manufacturer,
  product_type: p.categorySlug,
  tags: [...p.certificates, `origin:${p.origin.lt}`, p.allergenFree ? 'be-alergenu' : ''].filter(Boolean).join(','),
  price: p.price.toFixed(2),
  compare_at_price: p.oldPrice ? p.oldPrice.toFixed(2) : undefined,
  sku: p.code, barcode: p.ean, unit: p.unit,
}));
console.log(JSON.stringify(out));
