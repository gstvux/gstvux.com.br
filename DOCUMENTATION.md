# Documentação Técnica e de Produto — gstvux.com.br

Este documento serve como a fonte de verdade para a arquitetura, decisões técnicas e evolução do projeto **gstvux.com.br**. Ele detalha como o portfólio foi concebido não apenas como um site, mas como um produto digital escalável e de alta qualidade técnica.

---

## 1. Visão do Produto e Filosofia

### O Portfólio como Produto
Diferente de portfólios estáticos tradicionais, este projeto segue os princípios de **Engenharia de Produto**:
- **Conteúdo Desacoplado**: O front-end não "possui" o texto; ele consome dados via TinaCMS.
- **Design Tokenizado**: Uso rigoroso de variáveis CSS e Tailwind 4 para garantir que qualquer mudança visual seja sistêmica.
- **Prova de Competência**: Cada funcionalidade (como a automação de CV) é uma demonstração prática de habilidades em UI Engineering e Arquitetura de Software.

---

## 2. Stack Técnica e Racional

- **Next.js 15 (App Router)**: Escolhido pela performance de SSR/ISR e facilidade de roteamento baseado em arquivos.
- **React 19**: Aproveitando as melhorias de concorrência e hooks modernos.
- **TinaCMS**: Um CMS "headless" que vive dentro do repositório, permitindo edição visual (Visual Editing) sem perder o controle dos dados em JSON/Markdown.
- **Tailwind CSS 4**: Utilizado por seu motor de alta performance e integração nativa com CSS Variables (`@theme`).
- **TypeScript**: Tipagem estrita em todo o projeto para reduzir erros em tempo de execução.
- **pnpm**: Gerenciador de pacotes rápido e eficiente em disco.

---

## 3. Log de Funcionalidades e Engenharia

### 3.1. Pipeline de Publicação de CV (CV Publisher)
Um dos sistemas mais sofisticados do portfólio.
- **Objetivo**: Automatizar o fluxo de upload -> renomeação -> versionamento -> publicação.
- **Lógica de Versionamento**:
    - Primeirapublicação: `1.0`.
    - Mudanças menores: `1.1`, `1.2`.
    - Major Updates (via flag no CMS): `2.0`, `3.0`.
- **Padronização Canônica**: Arquivos são renomeados para `gustavo-luciano-cv-{mes}-{ano}-v{versao}.pdf`.
- **Insights**: O sistema limpa estados anteriores e garante que o link final (`/cv/arquivo.pdf`) seja sempre previsível e amigável para SEO/ATS.

### 3.2. Galeria de Cases e Taxonomia Dinâmica
- **Implementação**: Uma grid de cases que consome referências do TinaCMS.
- **Taxonomia**: Em vez de listas fixas de tags, o sistema foi desenhado para sugerir tags baseadas no que já existe no conteúdo (via GraphQL), mantendo a flexibilidade editorial.
- **UX**: Implementação de *Skeleton Loaders* e estados de vazio (empty states) para garantir uma navegação sem saltos visuais.

### 3.3. Hero Section e Local Time
- **Funcionalidade**: Exibe o horário local do autor no momento da visualização.
- **Desafio Técnico (Hydration)**: O tempo muda a cada segundo, o que causa discrepâncias entre o HTML gerado no servidor e o hidratado no cliente.
- **Solução**: Uso de `useEffect` com estado inicial vazio para garantir que o tempo só seja renderizado no lado do cliente, evitando o `Hydration Mismatch Error` do Next.js.

### 3.4. Micro-interações Premium
- **Scroll Affordance**: Um botão de "scroll down" com animação de bounce que desaparece ao rolar e reaparece após inatividade no topo da página.
- **Feedback de Celebração**: Integração com `canvas-confetti` para disparar animações de festa em pontos de conversão (ex: rodapé ou contato), humanizando a interação.

---

## 4. Gerenciamento de Desafios e Lições Aprendidas

### 4.1. Otimização de Imagens (O Pivot)
Durante o desenvolvimento, tentamos implementar uma pipeline complexa usando `sharp` e processamento manual de ativos para WebP/Avif.
- **Dificuldade**: O acoplamento com o fluxo de upload do TinaCMS tornou o build instável e a manutenção complexa.
- **Lição**: Decidimos fazer um **rollback** e focar em soluções nativas de otimização de imagem do Next.js combinadas com boas práticas de upload. "Simplicidade é a sofisticação máxima."

### 4.2. Ambiente de Build e Lockfile
Enfrentamos erros de `outdated lockfile` em ambientes de deploy remoto.
- **Solução**: Padronização estrita da versão do `pnpm` e scripts de pré-instalação para garantir paridade entre a máquina local e o servidor de produção.

---

## 5. Estrutura de Diretórios

```txt
scripts/        # Scripts de automação (CV Publish, Watchers)
src/
  app/          # Rotas e layouts (App Router)
  components/   # Componentes UI e Seções
    ui/         # Átomos e componentes base
    sections/   # Organismos e blocos de página
  content/      # Dados brutos (JSON/MD) consumidos pelo CMS
  lib/          # Clientes de API, Hooks e Utils
  styles/       # Tokens e CSS Global
tina/           # Configuração e esquemas do CMS
```

---

## 6. Futuro e Evolução
O projeto está preparado para:
- Adição de testes E2E para o fluxo de CV.
- Expansão da galeria de cases para suporte a vídeos de alta performance.
- Novas variantes linguísticas (i18n) já previstas na estrutura de dados do CV.
