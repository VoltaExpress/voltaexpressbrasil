# Relatório — Landing Page Volta Express Brasil

> Atualizado em 26/10/2026, versão 7.0 (branch `v6.3-incubacao`). Escopo: `index.html` (home), `/quero-carregar` (caminhoneiro) e `/quero-transportar` (embarcador).
> Premissa: preservar regras de negócio, nome e logos. O diagnóstico de set/2026 está no fim deste arquivo.

## 1. Resultado da v7.0

A landing passou de "rápida, mas quebrada" para "rápida, funcionando e consistente": os caminhos de conversão funcionam nas 3 páginas, o conteúdo não depende mais de bibliotecas externas para aparecer e as 3 páginas usam o mesmo design system.

### Como foi medido
- Celular simulado: Pixel 7, 4G lento (1,6 Mbps, 150 ms de latência), CPU 4× mais lenta (perfil mobile do Lighthouse). 5 rodadas por página, mediana.
- Servidor local com gzip, como o GitHub Pages faz em produção.
- **Limite:** fontes, ícones e Google Maps (CDNs externas) não puderam ser carregados no ambiente de teste. Os números valem para os arquivos do próprio site. A medição de produção é a do PageSpeed Insights (seção 3).
- **Viés a favor da versão antiga:** no teste, o ScrollReveal antigo foi substituído por um revelador instantâneo. No navegador real, o título da home só aparecia depois de 0,4 s de espera e 2 s de animação.

### Desempenho (arquivos do site)

| Página | FCP antes → depois | LCP antes → depois | CLS | Primeira carga | Requisições |
|---|---|---|---|---|---|
| Home | 528 → 548 ms | 564 → **736 ms** | 0 → 0 | 67 → 68 KB | 9 → 9 |
| Quero Carregar | 720 → **612 ms** | 752 → **688 ms** | 0 → 0 | 53 → 55 KB | 10 → 11 |
| Quero Transportar | 696 → **600 ms** | 812 → **772 ms** | 0 → 0 | 77 → 71 KB | 11 → 11 |

- Todas as páginas ficam abaixo de 0,8 s de LCP no teste; a meta do Google é 2,5 s.
- **Home: LCP subiu 172 ms.** Antes, o maior elemento era o texto; agora é a imagem do hero (1536 px no celular, 44 KB). Correção no backlog: gerar uma variante de ~1080 px com o script de imagens.
- **Personas:** primeira pintura 100 ms mais cedo, pelo fim do `@import` de fontes em cadeia.

### Qualidade, acessibilidade e robustez

| Indicador | Antes (home / carregar / transportar) | Depois |
|---|---|---|
| Caminhos de conversão quebrados | 7 (cadastro, 2 WhatsApp flutuantes, cards, menu, 2 âncoras inexistentes) | **0** |
| Página visível com as CDNs fora do ar | Home **em branco** | As 3 visíveis, com menu funcionando |
| Página visível sem JavaScript | Não (home) | Sim, nas 3 |
| Scripts de terceiros | ScrollReveal nas 3 | **0** |
| Famílias de fonte | 3 | **1** |
| CSS total | 71,7 KB | **32,4 KB** (−55%) |
| Falhas de contraste (WCAG AA) | 0 / 29 / 32 | **0 / 0 / 0** |
| Alvos de toque < 24 px | 0 / 8 / 13 | **0 / 0 / 0** |
| `<h1>` por página | 1 / 7 / 7 | **1 / 1 / 1** |
| Links sem nome acessível | 0 / 3 / 4 | **0** |
| `lang="pt-BR"` | 1 de 3 páginas | 3 de 3 |
| Rolagem horizontal em 360, 390, 768, 1024 e 1440 px | Não testado | Nenhuma |
| Ícones do manifesto (instalar no celular) | Caminho inexistente | Corrigido |
| Verificações automáticas | — | **76 de 76** passando |

## 2. O que mudou na estrutura

```
voltaexpressbrasil/
├── index.html · style.css           home (roteador entre as 2 personas)
├── shared/                          NOVO: base comum às 3 páginas
│   ├── tokens.css                   cores, fonte, espaçamento
│   ├── components.css               componentes
│   └── site.js                      configuração (WhatsApp, plataforma, mapa), menu, animação, modal
├── quero-carregar/    index.html · style.css (0,7 KB) · script.js · cargas.js
└── quero-transportar/ index.html · style.css (0,8 KB) · script.js · viagens.js
```

Detalhes dos componentes e das cores: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Decisões: [DECISOES.md](DECISOES.md) (D6 a D13).

## 3. Pendências de medição (com você)
- Rodar o [PageSpeed Insights](https://pagespeed.web.dev) nas 3 URLs (mobile) depois do deploy e registrar aqui, ao lado da linha de base anotada antes da v7.

## 4. Diagnóstico de set/2026 (histórico)

| Página | Peso das imagens antes | Depois da A1 (set/2026) |
|---|---|---|
| Home | ~3 MB | ~60 KB |
| Quero Carregar | ~31 MB | ~270 KB |
| Quero Transportar | ~45 MB | ~330 KB |

Achados de set/2026 resolvidos na v7: conteúdo invisível até o ScrollReveal carregar; três combinações de fonte com `@import`; bibliotecas sem versão fixa; menu mobile sem ação e WhatsApp de exemplo no Quero Carregar; link do WhatsApp dependente de JS no Quero Transportar; telefones fictícios; rodapé com telefone de exemplo e links `#`; `lang="en"`; menu como `div`; modal sem `role="dialog"` e sem Esc; vários `<h1>`; contraste do laranja 3,1:1; logo diferente em cada página; menção a outra marca no rodapé; CSS duplicado entre as personas.

Ainda pendentes: meta description nas personas (feita na v7), Open Graph, canonical e `sitemap.xml`; páginas de Privacidade e Termos; medição de cliques (ver PLANO-DE-ACAO.md, backlog).
