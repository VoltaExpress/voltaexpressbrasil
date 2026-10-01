"""
otimizar_imagens.py - Volta Express Brasil (landing page)
Encontra as imagens PNG/JPG referenciadas no HTML, CSS e JS das 3 paginas e gera
versoes WebP redimensionadas ao lado de cada original, sem EXIF. Os originais
nao sao apagados nem alterados. No final, imprime o relatorio de economia, as
referencias quebradas e as imagens que nenhuma pagina usa.
Uso: python scripts/otimizar_imagens.py [--simular] [--raiz CAMINHO]
v2 (A1.1): caminhos com parênteses deixam de confundir o url() após gradientes; a pasta public/ não é convertida.
"""
import argparse
import re
import sys
from fnmatch import fnmatch
from pathlib import Path
from urllib.parse import unquote

from PIL import Image, ImageOps, features

PASTAS_PAGINAS = [".", "quero-carregar", "quero-transportar"]
EXTENSOES_CODIGO = {".html", ".css", ".js"}
EXTENSOES_IMAGEM = {".png", ".jpg", ".jpeg"}
PASTAS_IGNORADAS = {".git", ".github", "node_modules", "scripts"}
REGEX_IMAGEM = re.compile(r"""["'(]\s*([^"'()\s<>][^"'()<>]*?\.(?:png|jpe?g))(?:\?[^"')]*)?\s*["')]""", re.IGNORECASE)
PASTAS_SEM_CONVERSAO = {"public"}

PERFIS = [
    ("*logo-volta-express*.png", [120, 240, 480], 90),
    ("*favicon-png-removebg.png", [64, 128], 90),
    ("*/persona/*", [160, 320], 80),
    ("*banner-*.png", [800, 1600], 75),
    ("*vantagem-*.png", [400, 800, 1200], 78),
    ("*vantangem-*.png", [400, 800, 1200], 78),
    ("*/buscar-carga/caixas.png", [120, 240, 480, 800], 85),
    ("*/buscar-caminhao/caminhao.png", [120, 240, 480, 800], 85),
]
PERFIL_PADRAO = ([400, 800], 78)


def ler_argumentos():
    """Le as opcoes da linha de comando."""
    parser = argparse.ArgumentParser(description="Gera versoes WebP das imagens da landing.")
    parser.add_argument("--raiz", default=".", help="pasta raiz do projeto voltaexpressbrasil")
    parser.add_argument("--simular", action="store_true", help="mostra o que seria feito, sem gravar nada")
    return parser.parse_args()


def listar_arquivos_codigo(raiz):
    """Lista os HTML, CSS e JS de cada pagina (sem entrar em subpastas de assets)."""
    arquivos = []
    for pasta in PASTAS_PAGINAS:
        base = (raiz / pasta)
        if base.is_dir():
            arquivos += [f for f in base.iterdir() if f.is_file() and f.suffix.lower() in EXTENSOES_CODIGO]
    return arquivos


def extrair_referencias(raiz):
    """Devolve as imagens usadas pelas paginas e as referencias que apontam para arquivos inexistentes."""
    usadas, quebradas = set(), set()
    for arquivo in listar_arquivos_codigo(raiz):
        texto = arquivo.read_text(encoding="utf-8", errors="ignore")
        for ref in REGEX_IMAGEM.findall(texto):
            ref = unquote(ref.strip())
            if ref.startswith(("http:", "https:", "//", "data:")):
                continue
            caminho = (arquivo.parent / ref).resolve()
            if caminho.is_file():
                usadas.add(caminho)
            else:
                quebradas.add(f"{arquivo.relative_to(raiz).as_posix()} -> {ref}")
    return usadas, quebradas


def escolher_perfil(relativo):
    """Escolhe as larguras e a qualidade de acordo com o papel da imagem na pagina."""
    alvo = relativo.lower()
    for padrao, larguras, qualidade in PERFIS:
        if fnmatch(alvo, padrao):
            return larguras, qualidade
    return PERFIL_PADRAO


def tem_transparencia(img):
    """Indica se a imagem tem pixels transparentes (logos e icones)."""
    if img.mode in ("RGBA", "LA"):
        return img.getchannel("A").getextrema()[0] < 255
    return img.mode == "P" and "transparency" in img.info


def nome_saida(origem, largura):
    """Monta o nome do WebP: minusculo, sem espacos e com o erro 'vantangem' corrigido."""
    nome = origem.stem.lower().replace("vantangem", "vantagem")
    nome = re.sub(r"[^\w-]+", "-", nome).strip("-")
    return origem.with_name(f"{nome}-{largura}.webp")


def converter(origem, larguras, qualidade, simular):
    """Gera um WebP por largura, sem ampliar a imagem e pulando o que ja esta atualizado."""
    resultados = []
    with Image.open(origem) as bruta:
        img = ImageOps.exif_transpose(bruta)
        img = img.convert("RGBA") if tem_transparencia(img) else img.convert("RGB")
        alvos = sorted({min(largura, img.width) for largura in larguras})
        for largura in alvos:
            destino = nome_saida(origem, largura)
            if destino.exists() and destino.stat().st_mtime >= origem.stat().st_mtime:
                resultados.append((destino, destino.stat().st_size, "ja existe"))
                continue
            if simular:
                resultados.append((destino, 0, "simulado"))
                continue
            altura = round(img.height * largura / img.width)
            img.resize((largura, altura), Image.LANCZOS).save(destino, "WEBP", quality=qualidade, method=6)
            resultados.append((destino, destino.stat().st_size, "gerado"))
    return resultados


def listar_imagens(raiz):
    """Lista todas as imagens PNG/JPG do projeto, fora das pastas ignoradas."""
    return [
        f.resolve() for f in raiz.rglob("*")
        if f.is_file() and f.suffix.lower() in EXTENSOES_IMAGEM
        and not PASTAS_IGNORADAS.intersection(f.relative_to(raiz).parts)
    ]


def formatar(tamanho):
    """Formata bytes em KB ou MB."""
    return f"{tamanho / 1048576:.2f} MB" if tamanho >= 1048576 else f"{tamanho / 1024:.0f} KB"


def main():
    """Orquestra a busca das referencias, a conversao e o relatorio final."""
    args = ler_argumentos()
    raiz = Path(args.raiz).resolve()
    if not features.check("webp"):
        sys.exit("Erro: o Pillow instalado nao tem suporte a WebP. Rode: pip install --upgrade pillow")
    if not (raiz / "index.html").is_file():
        sys.exit(f"Erro: index.html nao encontrado em {raiz}. Rode o script na raiz do voltaexpressbrasil.")

    usadas, quebradas = extrair_referencias(raiz)
    total_original, total_maior = 0, 0
    print(f"\n== CONVERSAO ({'SIMULACAO' if args.simular else 'GRAVANDO'}) - {len(usadas)} imagens usadas ==\n")
    for origem in sorted(usadas):
        relativo = origem.relative_to(raiz).as_posix()
        if PASTAS_SEM_CONVERSAO.intersection(relativo.split("/")):
            print(f"{relativo}  [ignorada: favicons e manifest ficam em PNG/ICO]")
            continue
        larguras, qualidade = escolher_perfil(relativo)
        tamanho_original = origem.stat().st_size
        total_original += tamanho_original
        print(f"{relativo}  ({formatar(tamanho_original)})")
        resultados = converter(origem, larguras, qualidade, args.simular)
        for destino, tamanho, status in resultados:
            print(f"   -> {destino.name:<48} {formatar(tamanho):>10}  [{status}]")
        total_maior += max(tamanho for _, tamanho, _ in resultados)

    print("\n== RESUMO ==")
    print(f"Originais usados pelas paginas : {formatar(total_original)}")
    if not args.simular:
        print(f"Maior versao WebP de cada uma  : {formatar(total_maior)}")
        print(f"Reducao                        : {100 - total_maior * 100 / max(total_original, 1):.1f}%")

    print(f"\n== REFERENCIAS QUEBRADAS ({len(quebradas)}) ==")
    for item in sorted(quebradas):
        print(f"   {item}")

    sem_uso = sorted(set(listar_imagens(raiz)) - usadas)
    print(f"\n== IMAGENS SEM USO NAS PAGINAS ({len(sem_uso)}, {formatar(sum(f.stat().st_size for f in sem_uso))}) ==")
    for f in sem_uso:
        print(f"   {f.relative_to(raiz).as_posix()}  ({formatar(f.stat().st_size)})")
    print("\nNenhum original foi apagado ou alterado.\n")


if __name__ == "__main__":
    main()

# Fim de otimizar_imagens.py