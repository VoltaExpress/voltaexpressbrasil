// Servidor estático mínimo para rodar a landing localmente (sem dependências).
// Uso: node scripts/servidor.mjs [porta]   (padrão: 5501, a mesma do Live Server)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const raiz = resolve(import.meta.dirname, "..");
const porta = Number(process.argv[2] || process.env.PORT || 5501);
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

createServer(async (req, res) => {
  try {
    let caminho = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let arquivo = normalize(join(raiz, caminho));
    if (!arquivo.startsWith(raiz)) throw new Error("fora da raiz");
    if ((await stat(arquivo)).isDirectory()) arquivo = join(arquivo, "index.html");
    const corpo = await readFile(arquivo);
    res.writeHead(200, { "Content-Type": tipos[extname(arquivo).toLowerCase()] || "application/octet-stream" });
    res.end(corpo);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404");
  }
}).listen(porta, () => console.log(`Landing em http://localhost:${porta}/`));
