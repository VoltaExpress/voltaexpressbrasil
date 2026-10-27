# Plano de Ação — Landing Page Volta Express Brasil

Legenda: ✅ feito · 🔄 com você · ⬜ a fazer

## Ciclo v7.0 (out/2026) — performance, UX, responsividade e design

| Etapa | Status | Entrega |
|---|---|---|
| 0 Preparação | 🔄 | Rodar o PageSpeed (mobile) nas 3 URLs publicadas e anotar no RELATORIO, seção 3 |
| 1 Funcionamento | ✅ | Links da plataforma, WhatsApp de teste centralizado, menu do Quero Carregar, rodapé sem placeholders, âncoras mortas |
| 2 Performance | ✅ | ScrollReveal removido, uma fonte, ícones sem bloquear, `defer`, imagem do hero como `<img>` |
| 3 Design system | ✅ | `shared/` com tokens, componentes e JS comum; header, rodapé, botões e WhatsApp iguais nas 3 páginas; contraste AA |
| 4 UX e responsividade | ✅ | Hero com 2 ações, um `<h1>`, 5 passos sem card sobrando, alvos ≥ 44 px, FAQ nativo, modal acessível, 5 larguras |
| 5 Medição e documentação | ✅ | RELATORIO, DECISOES (D6–D13), DESIGN-SYSTEM, CHANGELOG, lista de órfãs |
| 6 Teste manual e commit | 🔄 | Roteiro abaixo |
| 7 Exclusão das imagens órfãs | 🔄 | Passo a passo abaixo |

## Roteiro de teste manual (antes do commit)

Rodar o site localmente no Git Bash, dentro da pasta do projeto:

```bash
cd /c/veb/voltaexpressbrasil
python -m http.server 8080
# abra http://localhost:8080 no Chrome; F12 → Ctrl+Shift+M para o modo celular
```

| # | Teste | Como | Esperado |
|---|---|---|---|
| T1 | Cadastro | Clique em "Entrar / Cadastrar" nas 3 páginas | Abre `https://voltaexpress.com.br/` |
| T2 | CTAs do hero | "Encontrar Carga" (motorista) e "Anunciar Carga" (embarcador) | Abrem a plataforma |
| T3 | WhatsApp | Botão verde flutuante, "Falar no WhatsApp" do hero e da chamada final, link do rodapé | Abre `5532988367667` com mensagem da página |
| T4 | WhatsApp dos cards | "Carregar Agora" / "Transportar Agora" em 2 cards | A mensagem cita a carga ou o veículo do card |
| T5 | Menu mobile | Modo celular: abrir, clicar num item, abrir de novo e apertar Esc | Abre, navega e fecha |
| T6 | Busca e "Ver mais" | Buscar "São Paulo" e depois clicar em "Ver mais" | Só aparecem resultados da busca |
| T7 | Trajeto | "Ver Trajeto" num card; fechar com Esc, com o X e clicando fora | O mapa carrega; as 3 formas fecham |
| T8 | FAQ | Abrir as perguntas | Abre e fecha; com `name="faq"`, abre uma por vez no Chrome |
| T9 | Larguras | DevTools: 360, 390, 768, 1024, 1440 px nas 3 páginas | Sem rolagem lateral, sem texto cortado |
| T10 | CDN fora do ar | F12 → `Ctrl+Shift+P` → "Show Network request blocking" → bloquear `jsdelivr.net` e `fonts.googleapis.com` → recarregar | Página legível, menu funciona (sem ícones) |
| T11 | Sem JavaScript | F12 → `Ctrl+Shift+P` → "Disable JavaScript" → recarregar | Todo o conteúdo aparece (o mural mostra "Carregando ofertas...") |
| T12 | Reduzir movimento | F12 → `Ctrl+Shift+P` → "Emulate CSS prefers-reduced-motion: reduce" | Nada anima |
| T13 | Teclado | Tab desde o topo | Primeiro item "Pular para o conteúdo"; foco sempre visível |
| T14 | Celular real | Abrir pelo IP do computador na mesma rede ou após o deploy | Igual ao modo celular |
| T15 | PageSpeed | Depois do deploy, [pagespeed.web.dev](https://pagespeed.web.dev) nas 3 URLs, mobile | Comparar com a linha de base (etapa 0) |

Commit sugerido (Conventional Commits), depois de os testes passarem:

```bash
git add index.html style.css shared quero-carregar quero-transportar public docs CHANGELOG.md
git status          # confira: só os arquivos da v7
git commit -m "feat: landing v7 com design system compartilhado, correções de conversão e performance"
git push origin v6.3-incubacao
```

A `v6.3-incubacao` está 4 commits atrás da `main` e agora tem commits próprios. Para levar à `main`, abra um PR no GitHub. Se houver conflito no `README.md`, mantenha a versão da `v6.3-incubacao` (sem as seções v4/v5).

## Trocar o número do WhatsApp

O número de teste aparece em `shared/site.js` (fonte única) e nos `href` do HTML (reserva para quem está sem JS). Um comando troca tudo:

```bash
grep -rl "5532988367667" --include=*.html --include=*.js . | xargs sed -i 's/5532988367667/NOVO_NUMERO/g'
grep -rn "5532988367667" --include=*.html --include=*.js .   # esperado: nenhuma linha
```

## Exclusão das imagens órfãs (passo a passo)

As listas foram geradas comparando cada arquivo com o que as páginas da v7 carregam de fato (HTML, CSS, JS e `site.webmanifest`, com o caminho resolvido a partir de cada página). Fora da varredura: `.git`, `.github` (prints do README), `docs`, `scripts`.

| Lista | Arquivos | Tamanho | O que fazer |
|---|---|---|---|
| `docs/imagens-orfas.txt` | 83 | 125 MB | **Apagar agora.** Cópias duplicadas (`quero-*/assets/volta-express/`), logos e favicons antigos das personas, ícone do antigo botão de WhatsApp, WebP gerados por engano em `public/`, `script.js` da raiz |
| `docs/imagens-originais.txt` | 36 | 65 MB | **Apagar depois.** PNG/JPG originais das imagens em uso: são a fonte para gerar novos tamanhos (backlog B1). Apague quando o B1 estiver feito ou quando tiver cópia no Hub |
| Não listados | 43 | 3 MB | **Manter.** Variantes WebP ainda sem uso (736, 800, 1200 px) para `srcset` futuro, `favicon.ico` e ícones do manifesto |

```bash
# 1. Faça antes o commit da v7 (exclusão em commit separado facilita reverter)
git status                                   # esperado: working tree clean

# 2. Revise a lista
wc -l docs/imagens-orfas.txt                 # esperado: 83
less docs/imagens-orfas.txt                  # q para sair

# 3. Remova do Git e do disco (Git 2.26 ou mais recente: git --version)
git rm --pathspec-from-file=docs/imagens-orfas.txt
#    Alternativa (aceita espaços e parênteses nos nomes):
#    tr -d '\r' < docs/imagens-orfas.txt | xargs -d '\n' git rm --

# 4. Teste: python -m http.server 8080, F12 → Network → filtro "404",
#    navegue pelas 3 páginas até o rodapé e abra um "Ver Trajeto": nenhum 404.

# 5. Confira o ganho e faça o commit
du -sh --exclude=.git .                      # esperado: de ~192 MB para ~68 MB
git commit -m "chore: remove imagens duplicadas e script sem uso após a v7"

# 6. Mais tarde (após o B1): mesmo processo com docs/imagens-originais.txt → ~3 MB no total
```

Desfazer antes do commit: `git restore --staged . && git restore .`
O histórico do Git continua com as imagens (~254 MB). Limpar o histórico exige `git filter-repo` e `push --force`; fica no backlog (B10).

## Backlog

| ID | Item | Origem |
|---|---|---|
| B1 | Variante de ~1080 px dos 3 banners do hero com `scripts/otimizar_imagens.py` (reduz o LCP da home no celular) | Medição v7 |
| B2 | Revisar textos e números não verificáveis ("+10k cargas", "24h", "100% Seguro", "Verificado", depoimentos) | D2, D12 |
| B3 | Título da home com a proposta de valor (frete de retorno) | Relatório 26/10 |
| B4 | Open Graph, canonical, `sitemap.xml`, `robots.txt` | A3.1, A3.2 |
| B5 | Páginas de Privacidade e Termos (LGPD) no rodapé | A5.1, D13 |
| B6 | Medição de cliques sem cookies (persona, plataforma, WhatsApp) e UTM nos CTAs | A5.3, D7 |
| B7 | Testes automáticos (Playwright) e Lighthouse CI no GitHub Actions | A6.1 |
| B8 | Foco preso dentro do modal (Tab não sai do diálogo) | Etapa 4 |
| B9 | Excluir `docs/` e `scripts/` da publicação do Pages | A6.2 |
| B10 | Limpar o histórico do Git das imagens antigas | Etapa 7 |
| B11 | Apagar os originais de `docs/imagens-originais.txt` depois do B1 | Etapa 7 |

## Histórico (set/2026)

| ID | Status | Tarefa |
|---|---|---|
| A1.0–A1.2 | ✅ | Script de WebP e páginas trocadas para WebP com `srcset` |
| A1.3 | 🔄 | Remoção das órfãs (etapa 7 acima) |
| A2.1–A2.6 | ✅ v7 | Menu, WhatsApp, cards, modal órfão, chave do Maps num lugar só (`shared/site.js`), conteúdo sem JS |
| A3.1 | Parcial v7 | `lang`, meta description e um `<h1>` feitos; OG e canonical no backlog (B4) |
| A3.3–A3.4 | ✅ v7 | Menu como botão, modal acessível, contraste AA |
| A4.1–A4.4 | ✅ v7 | Design system compartilhado, uma fonte, mesmo logo |
| A5.1–A5.3 | Parcial v7 | Rodapé sem marca alheia e sem telefone de exemplo; LGPD e analytics no backlog |
| A6 | ⬜ | Backlog (B7, B9) |
