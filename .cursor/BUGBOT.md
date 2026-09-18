# Code Connect — regras de review (Bugbot)

Faça uma revisão completa deste Pull Request. Analise:

- Qualidade e clareza do código
- Possíveis bugs ou problemas de lógica
- Segurança (OWASP top 10, injeções, XSS, etc.)
- Aderência às convenções do projeto (Atomic Design, REST, Conventional Commits)
- Cobertura de testes (todo componente deve ter teste co-localizado)
- Performance e boas práticas do React/NestJS

Deixe comentários inline nos pontos relevantes e um resumo geral no final.

## Contexto do monorepo

- `apps/web`: React 19 + Vite + TypeScript + Tailwind v4 (Atomic Design)
- `apps/api`: NestJS 12 + TypeScript ESM (REST resource-oriented)
- Package manager: pnpm only
- Testes: Vitest nos dois apps; a11y com axe no web

## Convenções que devem ser checadas

### Frontend (`apps/web`)

- Estrutura Atomic Design: `atoms` → `molecules` → `organisms` → `templates` → `pages`
- Estilo só com Tailwind e tokens de `@theme` — sem hex hardcoded nem tamanhos arbitrários (`text-[31px]`, `#81fe88`, etc.)
- Todo componente novo/alterado deve ter teste de uso essencial (render + interação/prop principal)
- Acessibilidade WCAG AA (labels, landmarks, foco)

### Backend (`apps/api`)

- URLs resource-oriented (`/users`, `/posts/:id`) — sem verbos no path
- Status HTTP corretos (`201` create, `404` not found, `409` conflict, etc.)
- Lógica de negócio nos services; controllers finos
- DTOs com validação; não expor entidades sensíveis (ex.: password hash)
- Mudanças de domínio devem manter/atualizar testes do service/controller

### Geral

- TypeScript estrito — evitar `any` sem necessidade
- Conventional Commits na mensagem do PR quando relevante
- Escopo mínimo: não misturar refactors não relacionados à feature do PR
