// Confere se todo arquivo local citado pelas páginas existe (imagens, CSS, JS, manifestos).
// Sem dependências. Uso: node scripts/verificar-links.mjs
// Sai com código 1 se algum caminho não existir.
import { readFile, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const raiz = resolve(import.meta.dirname, "..");
const paginas = ["index.html", "quero-carregar/index.html", "quero-transportar/index.html"];
const dados = ["quero-carregar/cargas.js", "quero-transportar/viagens.js"];
const manifestos = ["public/site.webmanifest", "quero-carregar/public/site.webmanifest", "quero-transportar/public/site.webmanifest"];

const externo = (url) => /^(https?:|mailto:|tel:|data:|#|\/\/)/.test(url) || url === "";
const limpar = (url) => url.split("#")[0].split("?")[0];

const faltando = new Set();
let conferidos = 0;

async function conferir(origem, url) {
  if (externo(url)) return;
  const caminho = limpar(url);
  if (!caminho) return;
  conferidos++;
  const alvo = caminho.startsWith("/") ? join(raiz, caminho) : join(raiz, dirname(origem), caminho);
  try {
    await access(alvo);
  } catch {
    faltando.add(`${origem} -> ${url}`);
  }
}

for (const pagina of paginas) {
  const html = await readFile(join(raiz, pagina), "utf8");
  for (const [, , valor] of html.matchAll(/\s(src|href)="([^"]*)"/g)) await conferir(pagina, valor);
  for (const [, valor] of html.matchAll(/\ssrcset="([^"]*)"/g)) {
    for (const parte of valor.split(",")) await conferir(pagina, parte.trim().split(/\s+/)[0]);
  }
  // Âncoras internas: todo href="#id" precisa de um id na mesma página
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    conferidos++;
    if (!html.includes(`id="${id}"`)) faltando.add(`${pagina} -> #${id} (âncora sem destino)`);
  }
}

// Imagens dos dados do mural: os caminhos são relativos à página da pasta
for (const arquivo of dados) {
  const js = await readFile(join(raiz, arquivo), "utf8");
  for (const [, valor] of js.matchAll(/["'](\.{1,2}\/[^"']+\.(?:webp|png|jpe?g|svg))["']/g)) await conferir(arquivo, valor);
}

for (const arquivo of manifestos) {
  const manifesto = JSON.parse(await readFile(join(raiz, arquivo), "utf8"));
  for (const icone of manifesto.icons || []) await conferir(arquivo, icone.src);
}

if (faltando.size) {
  console.error(`Caminhos sem arquivo (${faltando.size}):\n  ${[...faltando].join("\n  ")}`);
  process.exit(1);
}
console.log(`OK: ${conferidos} caminhos locais conferidos nas 3 páginas, nos dados do mural e nos manifestos.`);
