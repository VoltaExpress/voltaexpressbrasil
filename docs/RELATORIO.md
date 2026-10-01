    # Relatório — Landing Page Volta Express Brasil

> Diagnóstico de set/2026. Escopo: `index.html` (home), `/quero-carregar` (transportador) e `/quero-transportar` (embarcador).
> Premissa: preservar regras de negócio, nome e logos.

## 1. Contexto
| Item | Situação |
|---|---|
| Objetivo | Apresentar a solução, separar as duas personas e converter em contato (WhatsApp) ou cadastro (voltaexpress.com.br) |
| Stack | HTML, CSS e JS puros, publicados no GitHub Pages (`voltaexpressbrasil.com.br`) |
| Dados | `cargas.js` (10 cargas) e `viagens.js` (22 veículos) fixos, ilustrativos |
| Dependências externas | Boxicons, ScrollReveal, Google Fonts, Google Maps Embed |

## 2. Peso das páginas (mobile)
| Página | Antes | Meta |
|---|---|---|
| Home | ~3 MB | ≤ 500 KB |
| Quero Carregar | ~31 MB | ≤ 1 MB |
| Quero Transportar | ~45 MB | ≤ 1 MB |

Causa principal: PNGs de 2 a 6 MB exibidos em tamanho pequeno (avatares de 60 px, logo de 60 px, cards).

## 3. Achados
### Performance
- Conteúdo da home começa invisível (`visibility: hidden`) até o ScrollReveal carregar, o que atrasa o LCP.
- Imagens sem `width`/`height` (causa CLS) e sem `srcset`.
- Três combinações de fonte diferentes, carregadas via `@import` (bloqueia a renderização).
- Bibliotecas sem versão fixa (`boxicons@latest`, `unpkg.com/scrollreveal`).

### Funcionamento
- Quero Carregar: menu mobile sem ação e botão flutuante do WhatsApp com número de exemplo.
- Quero Transportar: link do WhatsApp no HTML depende do JS para funcionar.
- Cards de carga com telefones fictícios.
- Rodapé com telefone de exemplo e links "#" em Privacidade e Termos.
- Arquivos com erro de nome (`vantangem-*`) e duplicados.

### Acessibilidade
- `lang="en"` nas páginas das personas.
- Menu como `div`; modal sem `role="dialog"`, sem fechar com Esc e sem foco preso; vários `<h1>` por página.
- Laranja `#fe5b3d` em texto sobre branco tem contraste 3,1:1 (AA exige 4,5:1).

### SEO
- Páginas das personas sem meta description, Open Graph e canonical; não há `sitemap.xml`.

### UI e marca
- Logo do header muda em cada página; rodapé da home cita outra marca.
- CSS das duas personas duplicado (62 KB) e sem design system comum.

### Produto
- Não há medição de escolha de persona, clique no WhatsApp ou clique em cadastro.

## 4. Notas estimadas (0–10, mobile, antes das correções)
| Indicador | Home | Carregar | Transportar |
|---|---|---|---|
| Lighthouse Performance | 5 | 2 | 1 |
| Lighthouse Acessibilidade | 7 | 6 | 6 |
| Lighthouse Boas Práticas | 8 | 7 | 7 |
| Lighthouse SEO | 8 | 6 | 6 |
| Responsividade | 8 | 6 | 7 |
| UX | 7 | 5 | 6 |
| UI | 7 | 6 | 6 |
| Manutenibilidade | 6 | 4 | 4 |

Meta: Lighthouse ≥ 95 nas quatro categorias e Core Web Vitals verdes (LCP < 2,5 s, CLS < 0,1, INP < 200 ms).

## 5. Progresso
| Data | Entrega | Resultado |
|---|---|---|
| set/2026 | A1.0 — script `scripts/otimizar_imagens.py` e WebP gerados | Vantagens 36 MB → 587 KB; personas 33 MB → 117 KB; logo 1,1 MB → 11,5 KB |
| set/2026 | A1.1 e A1.2 — banners convertidos e páginas trocadas para WebP | Imagens por página: Home ~3 MB → ~60 KB; Quero Carregar ~31 MB → ~270 KB; Quero Transportar ~45 MB → ~330 KB |

## 6. Limpeza pendente (manual)
A primeira execução do script converteu favicons de `public/` que devem continuar em PNG/ICO. Apague:
```bash
cd /c/ambiente-projeto/veb/voltaexpressbrasil
rm public/*.webp quero-carregar/public/*.webp quero-transportar/public/*.webp
```
