# Status e caminho até o MVP — Landing Volta Express Brasil

> Atualizado em 06/11/2026. Fonte: `CHANGELOG.md`, `docs/PLANO-DE-ACAO.md`, `docs/RELATORIO.md`, o backlog do README e o estado do repositório.
> **MVP** aqui é: a landing publicada no domínio oficial com HTTPS, levando cada persona direto ao cadastro certo da plataforma, com links legais (LGPD) e medição do funil.

## Onde estamos
| Item | Situação |
|---|---|
| Código | v7.0.1 em `main` (commit `9a7d899`, 28/10/2026) |
| GitHub | Repositório público `VoltaExpress/voltaexpressbrasil` |
| Hospedagem | GitHub Pages com domínio `voltaexpressbrasil.com.br`; último deploy com sucesso em 28/10/2026. **HTTPS não está forçado** no Pages |
| Documentação | `docs/`: relatório, plano de ação, decisões (D6–D13), design system, listas de imagens órfãs e originais |

## O que já foi feito
- **v7.0 (26/10/2026):** performance (sem ScrollReveal, uma fonte, `defer`), design system em `shared/` (tokens, componentes e JS comum), contraste AA, header, rodapé e WhatsApp iguais nas 3 páginas, hero com 2 ações, alvos ≥ 44 px, FAQ nativo, modal acessível.
- **v7.0.1 (28/10/2026):** contato oficial unificado com a plataforma e o Hub (e-mail e WhatsApp) e redes sociais (Instagram, Facebook, YouTube, X e TikTok) nas 3 páginas.
- Páginas por persona: Home, Quero Carregar (caminhoneiro) e Quero Transportar (embarcador), com mural de cargas e veículos, trajeto no mapa, vantagens, depoimentos e FAQ.

## O que falta para o MVP
| # | Tarefa | Origem | Pronto quando |
|---|---|---|---|
| 1 | Ativar "Enforce HTTPS" no GitHub Pages (precisa de admin do repositório) | API do Pages | `http://` redireciona para `https://voltaexpressbrasil.com.br` |
| 2 | CTAs levando à persona certa: `voltaexpress.com.br/cadastro?perfil=caminhao` e `?perfil=carga` (hoje vão para a raiz da plataforma) | Backlog "Integração de CTAs" e X8 da plataforma | Cadastro abre com a persona marcada a partir das 3 páginas |
| 3 | Links de Política de Privacidade e Termos de Uso no rodapé (apontando para a plataforma) | Backlog "Documentação no rodapé" | Rodapé das 3 páginas com os dois links |
| 4 | Depoimentos marcados como ilustrativos, ou trocados por depoimentos reais autorizados | Curadoria do Hub (06/11/2026) | Nenhum depoimento fictício apresentado como real |
| 5 | Medição do funil (analytics com consentimento) nos CTAs e no WhatsApp | B5.2 do Hub | Cliques por CTA aparecem num relatório mensal |
| 6 | Teste manual T1–T11 e PageSpeed mobile das 3 URLs registrado no RELATORIO | Etapas 0 e 6 do plano | Tabela de testes preenchida e notas do PageSpeed anotadas |
| 7 | Remover as imagens órfãs (`docs/imagens-orfas.txt`) | Etapa 7 do plano | Nenhum 404 nas 3 páginas e repositório menor |
| 8 | Atualizar ou fechar as issues antigas #5, #11, #13 e #18 (hospedagem e domínio já resolvidos) | Issues abertas | Só issues atuais abertas |

**Depois do MVP:** formulário de ouvidoria ("Conte para a gente"), newsletter, galeria com telas reais da plataforma, cards com peso, volume e data limite, seção "Sobre nós" com vídeo e fundadores.

## Issues para criar (manualmente)
| # | Título | Rótulo |
|---|---|---|
| 1 | Hospedagem: forçar HTTPS no GitHub Pages | `bug` |
| 2 | Conversão: CTAs com `/cadastro?perfil=` da plataforma | `enhancement` |
| 3 | LGPD: links de Privacidade e Termos no rodapé | `enhancement` |
| 4 | Conteúdo: marcar depoimentos como ilustrativos ou trocar por reais | `enhancement` |
| 5 | Medição: analytics do funil com consentimento | `enhancement` |
| 6 | QA: teste manual T1–T11 e PageSpeed da v7 | `documentation` |
| 7 | Limpeza: remover imagens órfãs | `enhancement` |
| 8 | Organização: revisar issues antigas #5, #11, #13 e #18 | `documentation` |
