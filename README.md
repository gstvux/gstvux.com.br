# gstvux.com.br

Portfólio pessoal de Gustavo Luciano, concebido como um produto digital: uma plataforma de posicionamento profissional, prova de competência e conversão de oportunidades.

O projeto foi desenhado para apresentar casos, narrativa profissional e craft visual com a mesma disciplina aplicada em produtos reais: arquitetura previsível, conteúdo editável, design tokenizado e evolução contínua.

---

## Visão geral

Este projeto não é apenas um “site portfólio”.

Ele foi pensado como um sistema de comunicação e demonstração de valor, com foco em:

- apresentar autoridade técnica e visual
- reduzir fricção na leitura da trajetória profissional
- transformar experiência em narrativa orientada a problema, solução e impacto
- permitir manutenção contínua de conteúdo sem acoplamento excessivo ao código
- sustentar uma base escalável para evolução de branding, cases, componentes e design system

---

## Objetivos do projeto

- consolidar a marca pessoal `gstvux`
- tratar o portfólio como produto digital, com seus devidos processos.
- unir UX, UI Engineering, front-end e pensamento sistêmico em uma mesma experiência
- manter uma base de código legível, previsível e fácil de evoluir
- permitir edição de conteúdo via CMS (TinaCMS)
- estruturar o front-end com tokens, componentes reutilizáveis e separação clara entre conteúdo e apresentação

---

## Stack principal

- **Next.js**
- **React**
- **TypeScript**
- **TinaCMS**
- **Tailwind CSS**
- **CSS Variables / Design Tokens**
- **pnpm**

---

## Princípios de arquitetura

A base do projeto segue alguns princípios centrais:

### 1. Conteúdo desacoplado da UI
A interface consome estruturas de conteúdo editáveis, reduzindo acoplamento entre copy, dados e implementação visual.

### 2. Portfólio como produto
A navegação, a hierarquia visual e a seleção de conteúdo são tratadas com a mesma lógica de UX aplicada a produtos digitais.

### 3. Previsibilidade estrutural
A organização da aplicação foi refatorada para `/src`, melhorando:

- discoverability
- readability
- previsibilidade arquitetural
- manutenção futura

### 4. Design system progressivo
O projeto evolui com base em tokens, utilitários e componentes reutilizáveis, evitando decisões visuais arbitrárias espalhadas pelo código.

### 5. Conteúdo orientado a prova
Cada bloco do portfólio deve contribuir para demonstrar competência, contexto, decisão e resultado — não apenas estética.

---

## Estrutura do projeto

A estrutura abaixo representa a direção arquitetural atual do projeto:

```txt
.
├── public/
│   ├── shapes/
│   ├── images/
│   └── ...
├── src/
│   ├── app/
│   │   ├── features/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ...
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── theme.css
│   │   └── ...
│   ├── lib/
│   ├── data/
│   ├── types/
│   └── ...
├── tina/
│   ├── config.ts
│   └── __generated__/
├── content/
├── package.json
├── tsconfig.json
└── README.md