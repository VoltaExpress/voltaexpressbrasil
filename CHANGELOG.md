# Changelog — Landing Volta Express Brasil

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · versões em [SemVer](https://semver.org/lang/pt-BR/).

## [7.0.0] — 2026-10-26 · branch `v6.3-incubacao`

Foco: performance, UX, responsividade e design. Detalhes em `docs/RELATORIO.md` e decisões em `docs/DECISOES.md` (D6–D13).

### Corrigido (etapa 1 — funcionamento)
- "Entrar / Cadastrar" do Quero Transportar apontava para `www.voltaexpress.com.br` sem `https://` (404). Todos os links da plataforma agora vão para `https://voltaexpress.com.br/`.
- WhatsApp flutuante do Quero Carregar (`wa.me/seu_numero`) e do Quero Transportar (`wa.me/SEUNUMERO`, o script procurava um id que não existia) não funcionavam.
- 8 números fictícios nos cards do Quero Carregar; todos os contatos usam o número de teste `5532988367667`, definido em um só lugar (`shared/site.js`).
- Menu mobile do Quero Carregar não abria.
- Botões "Anunciar Viagem" e "Anunciar Carga" apontavam para âncoras inexistentes (`#advertise-truck`, `#advertise-cargo`).
- Rodapé com telefone de exemplo `(32) 9XXXX-XXXX` e links mortos (`href="#"`).
- "Ver mais" do Quero Transportar ignorava a busca e voltava à lista completa.
- Ícone `bxs- megaphone` (com espaço) não aparecia.
- Ícones do `site.webmanifest` (3 arquivos) apontavam para `/android-chrome-*.png`, caminho inexistente na raiz do site; agora são relativos à pasta `public/`.

### Alterado (etapa 2 — performance)
- ScrollReveal removido das 3 páginas; animação própria com `IntersectionObserver` (`shared/site.js`), que respeita "reduzir movimento". O conteúdo nasce visível: a home não fica mais em branco se a CDN falhar.
- Uma família de fonte (Poppins 400/600/700) carregada por `<link>` com `preconnect`; removidos os `@import` em cadeia e as famílias Plus Jakarta Sans e Noto Sans.
- Boxicons com versão fixa (`2.1.4`) e carregamento que não bloqueia a primeira pintura.
- Scripts com `defer`; imagem do hero como `<img>` com `srcset` e `fetchpriority="high"` no lugar de fundo CSS com `preload` fixo de 1536 px.

### Adicionado (etapa 3 — design system)
- `shared/tokens.css`, `shared/components.css` e `shared/site.js`, usados pelas 3 páginas.
- Header, rodapé, logo, botões, WhatsApp flutuante e modal idênticos nas 3 páginas.
- Paleta com contraste WCAG AA (laranja escurecido para texto pequeno, verde do WhatsApp escurecido).
- CSS total de 71,7 KB para 32,4 KB.

### Alterado (etapa 4 — UX e responsividade)
- Hero das landings com 2 ações: plataforma (principal) e WhatsApp (secundária). "Voltar para o início" saiu do hero; o logo e o item "Início" do menu levam à home.
- Um `<h1>` por página; `lang="pt-BR"` nas 3 páginas.
- Menu mobile como `<button aria-expanded>`, fecha com Esc; "Entrar / Cadastrar" visível no header do celular.
- "5 passos" sem card sozinho na última linha; alvos de toque ≥ 44 px.
- Perguntas frequentes com `<details>` nativo (funciona sem JS).
- Selo "Exemplos ilustrativos" no mural, com link para as ofertas reais na plataforma.
- Modal de trajeto acessível: Esc e clique fora fecham, o foco volta ao botão de origem.
- Seção final de chamada para ação nas duas landings.
- Rodapé sem a menção "learnTECH Ecosystem".
- Testado em 360, 390, 768, 1024 e 1440 px.

### Removido (aguardando exclusão manual)
- `script.js` da raiz e 82 imagens sem uso (125 MB): lista em `docs/imagens-orfas.txt`. Originais das imagens em uso (65 MB): `docs/imagens-originais.txt`, para apagar depois. Passo a passo em `docs/PLANO-DE-ACAO.md`.
