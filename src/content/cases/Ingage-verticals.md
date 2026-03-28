---
title: Ingage verticals
slug: ingage-verticals
thumbnail: /shapes/media-frame-polygon.svg
year: '2026'
client: teste
partner: teste part
role:
  - asdadsdas
  - sddsfsd2323
taxonomy:
  - tste
  - dasd
responsibilities:
  - teew
  - sfdsdf
stack: 'sdfsdf '
status: published
context: "Resultado ✅\nMedições finais\nCritério\tResultado\nFlicker some após save?\t✅ Sim — eliminado\nPreview continua atualizando via Tina?\t✅ Sim — WebSocket continua funcionando\nAlgum reload legítimo foi perdido?\t✅ Não — o HMR continua ocorrendo, só não serve dado cacheado\nBuild estático (pnpm build) ainda passa?\t✅ Exit code: 0\n"
problem: |-
  O que foi aplicado
  Apenas uma chave em next.config.ts, ativa exclusivamente em dev:

  typescript
  experimental: {
    serverComponentsHmrCache: false,  // ← a linha que resolve tudo
  },
  logging: {
    fetches: { hmrRefreshes: true },  // diagnóstico (visível no terminal)
  },
  Por que funcionou
  Com serverComponentsHmrCache: false, quando o Next.js detecta a mudança no arquivo JSON após o save, ele re-executa o Server Component sem cache — os logs confirmam: POST localhost:4001/graphql 200 (cache skip). O dado que chega ao cliente via props.data após o HMR já é o correto, então o useTina() nunca recebe dado antigo e não há mais rollback.

  O hook useMaybeTina ficou na sua forma mais simples — 3 linhas úteis, zero locks, zero timers, zero heurísticas. A spec foi cumprida pela Opção A da origem (servidor), exatamente como previsto.
constraints:
  - qwewqeeqw
  - eer
challenge: |-
  O que foi aplicado
  Apenas uma chave em next.config.ts, ativa exclusivamente em dev:

  typescript
  experimental: {
    serverComponentsHmrCache: false,  // ← a linha que resolve tudo
  },
  logging: {
    fetches: { hmrRefreshes: true },  // diagnóstico (visível no terminal)
  },
  Por que funcionou
  Com serverComponentsHmrCache: false, quando o Next.js detecta a mudança no arquivo JSON após o save, ele re-executa o Server Component sem cache — os logs confirmam: POST localhost:4001/graphql 200 (cache skip). O dado que chega ao cliente via props.data após o HMR já é o correto, então o useTina() nunca recebe dado antigo e não há mais rollback.

  O hook useMaybeTina ficou na sua forma mais simples — 3 linhas úteis, zero locks, zero timers, zero heurísticas. A spec foi cumprida pela Opção A da origem (servidor), exatamente como previsto.
solution: |-
  O que foi aplicado
  Apenas uma chave em next.config.ts, ativa exclusivamente em dev:

  typescript
  experimental: {
    serverComponentsHmrCache: false,  // ← a linha que resolve tudo
  },
  logging: {
    fetches: { hmrRefreshes: true },  // diagnóstico (visível no terminal)
  },
  Por que funcionou
  Com serverComponentsHmrCache: false, quando o Next.js detecta a mudança no arquivo JSON após o save, ele re-executa o Server Component sem cache — os logs confirmam: POST localhost:4001/graphql 200 (cache skip). O dado que chega ao cliente via props.data após o HMR já é o correto, então o useTina() nunca recebe dado antigo e não há mais rollback.

  O hook useMaybeTina ficou na sua forma mais simples — 3 linhas úteis, zero locks, zero timers, zero heurísticas. A spec foi cumprida pela Opção A da origem (servidor), exatamente como previsto.
outcomes:
  - 'eadfwef '
  - efwwef
strategy: |-
  O que foi aplicado
  Apenas uma chave em next.config.ts, ativa exclusivamente em dev:

  typescript
  experimental: {
    serverComponentsHmrCache: false,  // ← a linha que resolve tudo
  },
  logging: {
    fetches: { hmrRefreshes: true },  // diagnóstico (visível no terminal)
  },
  Por que funcionou
  Com serverComponentsHmrCache: false, quando o Next.js detecta a mudança no arquivo JSON após o save, ele re-executa o Server Component sem cache — os logs confirmam: POST localhost:4001/graphql 200 (cache skip). O dado que chega ao cliente via props.data após o HMR já é o correto, então o useTina() nunca recebe dado antigo e não há mais rollback.

  O hook useMaybeTina ficou na sua forma mais simples — 3 linhas úteis, zero locks, zero timers, zero heurísticas. A spec foi cumprida pela Opção A da origem (servidor), exatamente como previsto.
interventions:
  - afsasffas
gallery:
  - image: /images/contact-section-gustavo-luciano.png
    kind: screenshot
---

