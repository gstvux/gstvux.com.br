---
title: 'Automação de Cadastro de Peças — Indústria Moveleira'
slug: automacao-de-cadastro-de-pecas-industria-moveleira
thumbnail: /images/cases/automacao-pecas/cover.svg
year: '2026'
client: ''
partner: ''
role:
  - Automação RPA
  - Arquitetura de Solução
  - Engenharia Python
status: published
taxonomy:
  - RPA
  - Automação de Processos
  - Python
  - Integração de Sistemas
  - Análise de Processos
responsibilities:
  - Mapeamento do processo operacional
  - Arquitetura de 3 robôs orquestrados
  - Desenvolvimento de engine Python de extração
  - Implementação de parser antifrágil com triple-fallback
  - Configuração de modos piloto/produção
  - Documentação técnica e arquitetural
stack: 'Rocketbot RPA, Python, Excel (xlsm), ERP Primus'
context: >
  Uma empresa do setor moveleiro mantinha um processo crítico de cadastro de peças completamente manual. Para cada produto (móvel ou módulo), a equipe precisava abrir planilhas PP — fichas técnicas com estrutura de blocos por etapa de produção — e transferir campo por campo para o sistema ERP interno. O volume crescia conforme novos fornecedores e linhas de produto eram adicionados, sem nenhuma forma de escala que não fosse contratar mais pessoas para digitar mais.
problem: >
  O gargalo era claro e mensurável: cada planilha continha múltiplos produtos, com 6 a 12 peças por produto e 29 campos por peça. Um único lote de produção representava mais de 14.000 inputs manuais — em trabalho repetitivo, sem valor agregado e com alto risco de erro de digitação. O processo também era frágil por design: formatado para um operador específico, dependente de memória sobre qual coluna tinha qual dado, e sem rastreabilidade de qual versão de planilha havia sido processada.
constraints:
  - Planilhas com estrutura variável por fornecedor (colunas em posições diferentes)
  - ERP legado sem API de integração direta
  - Múltiplos formatos de arquivo (.xls, .xlsx, .xlsm)
  - Requisito de modo piloto para validação antes de escrita no sistema
  - Arquivos de lock do Excel precisavam ser ignorados automaticamente
challenge: >
  O maior desafio técnico estava na leitura das planilhas: os arquivos de fornecedores diferentes usavam colunas em posições diferentes. Uma solução ingênua — que lesse por letra de coluna fixa — quebraria assim que a primeira exceção chegasse. A solução precisava ser agnóstica ao layout e ao mesmo tempo precisa o suficiente para extrair os 29 campos corretos de cada bloco de produto, independente de onde estivessem na planilha.
solution: >
  Projetei uma arquitetura de 3 robôs encadeados no Rocketbot RPA: um orquestrador pai (cadastroPecas) que coordena dois filhos — um para inventário de planilhas (setaPlanilhas) e outro para extração dos dados (lerPlanilhas). O orquestrador funciona como barramento explícito de variáveis, garantindo que a fila de arquivos identificada pelo primeiro filho chegue íntegra ao segundo — uma característica não trivial da plataforma que exigiu um pattern específico de declaração de variáveis.


  O coração da solução é uma engine Python de 180 linhas dentro do robô leitor. Em vez de endereçar colunas por letra, a engine usa ancoragem dinâmica: localiza blocos de processo por rótulo (Corte, Borda, Usinagem, Embalagem), mapeia os cabeçalhos dentro de cada bloco e extrai os campos por nome — não por posição. Isso torna o robô resistente a qualquer variação de layout entre fornecedores.


  Para garantir robustez no consumo da fila de arquivos, implementei um parser triple-fallback (json.loads → ast.literal_eval → splitlines) que lida com qualquer formato de serialização que a plataforma produza. O sistema também tem modo piloto (lê e loga, sem escrever no ERP) e modo produção (processa e move arquivos para pasta de concluídos ou erro), permitindo validação segura antes de qualquer commit no sistema.
outcomes:
  - '490 peças processadas em 27 segundos — vs. estimativa de 4h+ manuais por lote'
  - 'Redução de ~94% no tempo de cadastro por lote de produção'
  - '0 erros de digitação: extração programática elimina o risco de input manual'
  - 'Compatibilidade com múltiplos fornecedores sem reprogramação'
  - 'Rastreabilidade completa: logs estruturados por arquivo e resumo de execução'
  - 'Escala horizontal: novos lotes são processados pelo mesmo robô sem custo adicional'
strategy: >
  Tratar o problema como um desafio de arquitetura de dados antes de ser um problema de automação. A decisão de usar ancoragem semântica em vez de endereçamento de célula foi a que determinou a longevidade da solução — ela funcionará para qualquer novo fornecedor sem necessidade de ajuste, desde que a estrutura de blocos (rótulos de processo) seja mantida. O pattern de barramento explícito no orquestrador também foi uma escolha deliberada: documenta o contrato entre os robôs e facilita debug e evolução independente de cada componente.
interventions:
  - Mapeamento de processo e análise de gargalos operacionais
  - Arquitetura de orquestração com 3 robôs e barramento de variáveis
  - Engine Python com ancoragem dinâmica de blocos e colunas
  - Parser antifrágil com triple-fallback para consumo de filas
  - Sistema de modos piloto/produção para rollout seguro
  - Logs estruturados por arquivo com resumo e rastreabilidade
gallery:
  - kind: process
    image: /images/cases/automacao-pecas/cover.svg
    alt: Fluxo da automação — planilhas para ERP
    caption: 'Arquitetura do fluxo: 4 planilhas de múltiplos fornecedores → engine de extração → ERP'
---
