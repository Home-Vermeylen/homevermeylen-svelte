// scripts/generate_sitemap.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ===== Config =====
const baseRoute = '/';
const routes: string[] = [baseRoute];
const date = new Date().toISOString().split('T')[0];
const DOMAIN = 'https://homevermeylen.org';

// ===== Pad-resolutie =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcRoutesPath = path.resolve(__dirname, '../src/routes');
const staticPath = path.resolve(__dirname, '../static');

if (!fs.existsSync(srcRoutesPath)) {
  console.error('Fout: src/routes bestaat niet op', srcRoutesPath);
  process.exit(1);
}

// ===== Recursieve functie =====
function walkDir(dir: string, routePrefix = '/') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      let route = path.join(routePrefix, entry.name).replace(/\\/g, '/');

      // Verwijder SvelteKit groepfolders zoals (openbaar)
      route = route.replace(/\([^)]+\)/g, '');

      const fullPath = path.join(dir, entry.name);
      const files = fs.readdirSync(fullPath);

      // +page.svelte aanwezig?
      const hasPage = files.includes('+page.svelte');

      // ⚠️ Skip routes die ergens [xxx] bevatten
      if (hasPage && !route.includes('[')) {
        routes.push(route.endsWith('/') ? route : route + '/');
      }

      // Recursief verder
      walkDir(fullPath, route);
    }
  }
}

// ===== Run =====
walkDir(srcRoutesPath);

// Alleen unieke routes behouden
const uniqueRoutes = Array.from(new Set(routes));

// Genereer sitemap XML
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const r of uniqueRoutes) {
  sitemap += `<url>\n<loc>${DOMAIN}${r}</loc>\n<lastmod>${date}</lastmod>\n</url>\n`;
}
sitemap += '</urlset>';

// Static map check
if (!fs.existsSync(staticPath)) fs.mkdirSync(staticPath, { recursive: true });

// Schrijf sitemap
fs.writeFileSync(path.join(staticPath, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap gegenereerd in static/sitemap.xml');
console.log('Gevonden routes:', uniqueRoutes);
