# Plano de Ação — Landing Page Volta Express Brasil

Regra: cada entrega é uma branch e um PR, executada só após autorização.
Legenda: ✅ feito · 🔄 em andamento · ⬜ a fazer

## A1 — Imagens (branch `perf/imagens-webp`)
| ID | Status | Tarefa | Arquivos | Aceite |
|---|---|---|---|---|
| A1.0 | ✅ | Script de conversão WebP e primeira geração | `scripts/otimizar_imagens.py` | WebP gerados ao lado dos originais |
| A1.1 | ✅ | Corrigir o script: `url()` depois de gradiente e ignorar `public/`; apagar os WebP gerados em `public/` | `scripts/otimizar_imagens.py` | Banners das personas convertidos; nenhum WebP em `public/` |
| A1.2 | ✅ | Trocar as referências para WebP com `srcset`/`sizes`, `width`/`height`, `loading="lazy"` e `fetchpriority="high"` no hero | 3 `index.html`, 3 `style.css`, `cargas.js`, `viagens.js` | Nenhuma página usa PNG/JPG pesado; visual idêntico |
| A1.3 | ⬜ | Remover do site os originais que deixaram de ser usados e as pastas `assets/volta-express/` sem uso (cópias no hub) | `quero-*/assets/` | Repositório sem imagens órfãs |

## A2 — Funcionamento
| ID | Status | Tarefa | Arquivos |
|---|---|---|---|
| A2.1 | ⬜ | Menu mobile e WhatsApp central no Quero Carregar | `quero-carregar/script.js`, `quero-carregar/index.html` |
| A2.2 | ⬜ | Link real do WhatsApp direto no HTML do Quero Transportar | `quero-transportar/index.html` |
| A2.3 | ⬜ | Cards ilustrativos apontando para o WhatsApp central, com mensagem que identifica a carga ou o veículo | `cargas.js`, `viagens.js` |
| A2.4 | ⬜ | Remover o modal órfão `#modal-trajeto` | `quero-carregar/index.html` |
| A2.5 | ⬜ | Chave do Maps num `config.js` único (restrita por domínio no Google Cloud) | `config.js` (novo), 2 `script.js` |
| A2.6 | ⬜ | Conteúdo visível sem JS; animações só como enfeite e respeitando `prefers-reduced-motion` | 3 `style.css`, 3 `script.js` |

## A3 — SEO e Acessibilidade
| ID | Status | Tarefa |
|---|---|---|
| A3.1 | ⬜ | `lang="pt-BR"`, meta description, Open Graph e canonical nas 3 páginas |
| A3.2 | ⬜ | `sitemap.xml` e `robots.txt` na raiz |
| A3.3 | ⬜ | Um `<h1>` por página; menu como `<button aria-expanded>`; modal acessível (Esc, foco, `role="dialog"`) |
| A3.4 | ⬜ | Token de laranja escuro para texto (contraste ≥ 4,5:1); o laranja da marca continua em fundos e ícones |

## A4 — Design System
| ID | Status | Tarefa |
|---|---|---|
| A4.1 | ⬜ | `tokens.css` (cores, tipografia, espaçamento) e `components.css` na raiz, compartilhados |
| A4.2 | ⬜ | CSS das personas só com o específico (meta: 62 KB → ~20 KB) |
| A4.3 | ⬜ | Uma fonte (Plus Jakarta Sans, 3 pesos) com preload |
| A4.4 | ⬜ | Mesmo logo oficial no header das 3 páginas |

## A5 — Confiança e Medição
| ID | Status | Tarefa |
|---|---|---|
| A5.1 | ⬜ | Páginas `privacidade.html` e `termos.html` (LGPD) ligadas no rodapé |
| A5.2 | ⬜ | Telefone real no rodapé; remover a menção a outra marca no rodapé da home |
| A5.3 | ⬜ | Analytics sem cookies e eventos: persona escolhida, clique no WhatsApp, clique em Entrar/Cadastrar |

## A6 — Qualidade contínua
| ID | Status | Tarefa |
|---|---|---|
| A6.1 | ⬜ | GitHub Action com Lighthouse CI e orçamento (Performance ≥ 90, página ≤ 1 MB) |
| A6.2 | ⬜ | Excluir `docs/` e `scripts/` da publicação do GitHub Pages (`_config.yml`) |

## Registro de execução (set/2026)
- **A1.1:** script v2 (regex não se confunde com `url()` após gradiente; `public/` não é convertida). Banners das personas convertidos: `banner-caixas-800/1536.webp` (7/19 KB) e `banner-caminhao-800/1536.webp` (12/34 KB).
- **A1.2:** 3 `index.html`, 3 `style.css`, `cargas.js`, `script.js` (Quero Carregar) e `viagens.js` apontam só para WebP, com `srcset`/`sizes`, `width`/`height`, `loading="lazy"` abaixo da dobra, `decoding="async"` e `preload` do banner do hero.
- **Pendente de você:** apagar os `.webp` gerados por engano em `public/` e nas pastas `quero-*/public/` na 1ª execução (ver RELATORIO, seção 6).
