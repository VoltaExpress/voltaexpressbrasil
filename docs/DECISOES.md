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
