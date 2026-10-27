# Design system — Landing Volta Express Brasil (v7.0)

As 3 páginas (home, Quero Carregar, Quero Transportar) usam a mesma base. Para mudar algo visual nas 3 de uma vez, altere `shared/`.

## Arquivos

| Arquivo | Conteúdo | Tamanho |
|---|---|---|
| `shared/tokens.css` | Cores, fonte, tamanhos de texto, espaçamentos, raios, sombras | 2,7 KB |
| `shared/components.css` | Header, menu, botões, hero, passos, mural, vantagens, sobre, depoimentos, FAQ, chamada final, rodapé, WhatsApp flutuante, modal, animação | 26 KB |
| `shared/site.js` | Configuração central (`VEB`), menu, links de WhatsApp, sombra do header, animação, modal, mapa | 5 KB |
| `style.css` (home) e `quero-*/style.css` | Só o que é exclusivo da página | 0,7 a 2,4 KB |

Ordem de carregamento em cada página: `tokens.css` → `components.css` → `style.css` da página; `site.js` → dados (`cargas.js`/`viagens.js`) → `script.js` da página, todos com `defer`.

## Cores e contraste (WCAG 2.x)

| Token | Cor | Uso | Contraste |
|---|---|---|---|
| `--color-primary` | `#104ac8` | Botão principal, links | 7,41:1 com texto branco |
| `--color-brand` | `#fe5b3d` | Fundos, ícones, borda do rodapé | Não usar em texto pequeno (3,1:1) |
| `--color-brand-strong` | `#ee4f2c` | Destaques em títulos grandes (`.hl`) | 3,2:1 no fundo do hero (mínimo 3:1 para texto grande) |
| `--color-brand-text` | `#c2410c` | Textos pequenos em laranja (`.eyebrow`) | 5,18:1 no branco |
| `--color-whatsapp` | `#15803d` | Botões e ícone do WhatsApp | 5,02:1 com texto branco |
| `--color-text` | `#1e293b` | Texto principal | 14,6:1 |
| `--color-text-muted` | `#475569` | Texto secundário | 7,58:1 |
| `--color-text-soft` | `#64748b` | Legendas pequenas (só em fundo branco) | 4,76:1 |
| `--color-dark-text` | `#cbd5e1` | Texto sobre o fundo escuro | 10,4:1 |

## Componentes principais

| Classe | Onde aparece | Observação |
|---|---|---|
| `.site-header`, `.site-nav`, `.menu-toggle` | 3 páginas | Menu vira painel abaixo de 960 px; ícone em CSS (não depende da fonte de ícones) |
| `.btn` + `.btn-primary`, `.btn-outline`, `.btn-whatsapp`, `.btn-whatsapp-outline`, `.btn-ghost` | 3 páginas | Altura mínima de 44 px |
| `.hero`, `.hero-grid`, `.hero-actions`, `.hero-media` | 3 páginas | Texto à esquerda e imagem à direita; empilha abaixo de 960 px |
| `.persona-card` | Home | Escolha entre motorista e embarcador |
| `.steps` / `.step` | Landings | 5 passos: 5 colunas, 2 colunas (último centralizado) e 1 coluna |
| `.notice`, `.search`, `.offers`, `.offer-card` | Landings | Mural de exemplos; fotos com proporção fixa de 4:3 |
| `.benefits` / `.benefit` | Landings | 4, 2 e 1 coluna |
| `.about-grid`, `.stats`, `.features` | Landings | Seção "Sobre" |
| `.testimonials` / `.testimonial`, `.testimonial--featured` | Landings | O destaque ocupa 2 colunas |
| `.faq` / `.faq-item` | Landings | `<details>` nativo; `name="faq"` abre um por vez nos navegadores que suportam |
| `.cta-final` / `.cta-box` | Landings | Chamada final para a plataforma e o WhatsApp |
| `.site-footer` | 3 páginas | Mesmo conteúdo nas 3 |
| `.whatsapp-float` | 3 páginas | Verde, à direita |
| `.modal` | Landings | `role="dialog"`, Esc e clique fora fecham |

## Animação

- Elementos com `data-reveal` sobem suavemente ao entrar na tela.
- O conteúdo **nasce visível**. Só quando o JS está ativo e o sistema não pede "reduzir movimento" é que os blocos começam ocultos.
- Rede de segurança: se o JS falhar, tudo aparece em 2,5 s por animação CSS.
- O hero nunca é animado, para não atrasar a primeira pintura (LCP).

## Breakpoints

`600px` (celular → tablet), `960px` (tablet → desktop, menu), `1100px` (desktop largo, grades de 3 a 5 colunas).
