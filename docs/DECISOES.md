# Registro de Decisões — Landing Page

Cada decisão tem contexto, escolha e consequência. Mudou de ideia? Acrescente uma nova; não apague a anterior.

## D1 — Contato centralizado no WhatsApp de suporte
- **Contexto:** os cards ilustrativos tinham telefones fictícios.
- **Decisão:** todos os contatos da landing usam o número central `5532998615190`, com mensagem que identifica a carga ou o veículo.
- **Consequência:** nenhum clique cai em número inexistente; o suporte faz a triagem.

## D2 — Depoimentos mantidos
- **Decisão:** os depoimentos permanecem como estão nesta fase.
- **Consequência:** a revisão de conteúdo dos depoimentos fica fora do plano atual.

## D3 — Imagens em WebP geradas por script
- **Decisão:** conversão com `scripts/otimizar_imagens.py` (Python + Pillow), sem apagar os originais na geração, removendo o EXIF e com larguras por papel da imagem.
- **Consequência:** processo repetível; toda imagem nova passa pelo script antes de entrar na página.

## D4 — Preservar nome, logos e regras de negócio
- **Decisão:** as melhorias de performance, UX e UI não alteram a marca, as duas personas nem o fluxo de contato e cadastro.

## D5 — Imagens servidas só em WebP, originais mantidos até a A1.3
- **Decisão:** as páginas usam apenas os WebP gerados; os PNG/JPG originais continuam no repositório até a A1.3 (remoção), para permitir nova geração com outros tamanhos.
- **Consequência:** o site fica leve já, mas o repositório ainda é pesado até a A1.3.

## D6 — Número de WhatsApp de teste em um único lugar (v7, out/2026)
- **Contexto:** o número estava repetido em 4 arquivos JS e em 32 registros de dados, e 2 botões flutuantes usavam texto de exemplo.
- **Decisão:** o número de teste `5532988367667` (atualiza a D1 até a troca definitiva) fica em `shared/site.js` (`VEB.whatsapp`). Os registros de `cargas.js` e `viagens.js` não guardam mais número. Os `href` do HTML repetem o número só como reserva para quando o JS não carrega.
- **Consequência:** trocar o número exige 1 comando (ver PLANO-DE-ACAO.md); a mensagem de cada card continua identificando a carga ou o veículo.

## D7 — Todo CTA de plataforma aponta para `https://voltaexpress.com.br/`
- **Decisão:** "Entrar / Cadastrar", "Encontrar Carga", "Anunciar Carga" e "Ver ofertas na plataforma" levam à raiz da plataforma, sem parâmetros.
- **Consequência:** funil simples; medir a origem (UTM) fica no backlog.

## D8 — Sem bibliotecas de animação de terceiros
- **Contexto:** a home escondia header e título com `visibility: hidden` até o ScrollReveal (CDN sem versão) carregar e animar por 2 s; se a CDN falhasse, a página ficava em branco.
- **Decisão:** animação própria com `IntersectionObserver` (~30 linhas). O conteúdo nasce visível; o hero não anima.
- **Consequência:** um script de terceiros a menos por página; a página funciona sem JS.

## D9 — Uma família de fonte: Poppins
- **Decisão:** Poppins 400/600/700 via `<link>`. Saem Plus Jakarta Sans e Noto Sans e os `@import` dentro do CSS.
- **Consequência:** a home muda de fonte (antes Plus Jakarta Sans); as personas já usavam Poppins nos títulos.

## D10 — Design system compartilhado sem etapa de build
- **Decisão:** CSS e JS comuns em `shared/`. O HTML de header e rodapé continua repetido nas 3 páginas, mas idêntico.
- **Consequência:** sem ferramenta nova e sem mudança no deploy do GitHub Pages. Reavaliar um gerador (11ty) se a landing passar de 5 páginas.

## D11 — Hero no mesmo molde nas 3 páginas
- **Decisão:** fundo claro, texto à esquerda, banner à direita como `<img>`; a home deixa o fundo escuro com foto. Duas ações: plataforma (principal) e WhatsApp (secundária).
- **Consequência:** as 3 páginas parecem o mesmo produto; "Voltar para o início" sai do hero (o logo e o menu cumprem esse papel).

## D12 — Mural rotulado como "Exemplos ilustrativos"
- **Decisão:** selo acima da busca, com link para as ofertas reais na plataforma. Títulos, números e depoimentos foram mantidos (revisão de conteúdo fica no backlog).
- **Consequência:** expectativa honesta sem mudar a mensagem nesta versão.

## D13 — Rodapé único, sem links mortos
- **Decisão:** mesmo rodapé nas 3 páginas: navegação, contato (e-mail e WhatsApp) e redes. Saem os links `#` (Privacidade, Termos, CNAE/MEI), o telefone de exemplo e a menção "learnTECH Ecosystem".
- **Consequência:** as páginas de Privacidade e Termos voltam ao rodapé quando existirem (backlog).
