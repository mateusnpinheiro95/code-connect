# Code Connect — Agent Instructions

## Project layout

pnpm monorepo (`pnpm-workspace.yaml` → `apps/*`):

| App | Path | Stack |
|-----|------|--------|
| `web` | `apps/web` | React 19 + Vite + TypeScript |
| `api` | `apps/api` | NestJS 12 + TypeScript (ESM) |

Single Git repo at the **workspace root**. Never create nested `.git` inside `apps/*`.

## Commands

Run scripts from the root via pnpm filters — do not `cd` into apps unless necessary:

```bash
pnpm dev          # web + api in parallel
pnpm dev:web      # Vite
pnpm dev:api      # Nest watch
pnpm build:web / build:api
pnpm lint:web / lint:api
pnpm test:api
```

Package manager is **pnpm** only (`packageManager` in root `package.json`). Do not introduce npm/yarn lockfiles.

## Frontend (`apps/web`)

- Structure UI with **Atomic Design**: `atoms` → `molecules` → `organisms` → `templates` → `pages`.
- Style with **Tailwind CSS** only (utility classes; avoid ad-hoc CSS/modules unless unavoidable).
- Every component must ship with a test covering its **essential usage** (render + primary interaction/props). Colocate or mirror under the same atomic layer.

## Backend (`apps/api`)

Follow REST principles:

- Resource-oriented URLs (nouns, plural): `/users`, `/users/:id` — not verbs in paths.
- Correct HTTP methods and status codes (`GET`/`POST`/`PUT`/`PATCH`/`DELETE`; `200`/`201`/`204`/`400`/`404`/`409`, etc.).
- Stateless requests; identify resources via URI, not RPC-style actions.
- Consistent representations (JSON); use query params for filtering/pagination/sorting, not alternate endpoints when avoidable.
- Nest controllers map cleanly to resources; keep business logic in services.

## Git

Use **Conventional Commits** for the whole monorepo:

```
<type>(optional-scope): <description>
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`.  
Scopes when useful: `web`, `api`, or a feature name. Example: `feat(web): add Button atom with essential usage test`.

## Conventions

- Keep app-specific code inside its own `apps/<name>` package; share nothing across apps until an explicit shared package exists.
- Prefer TypeScript. Match existing tooling: Vite for web, Nest CLI for api, **oxlint** for lint in both apps, **vitest** for api tests.
- Respect root `.gitignore` (and any app-level ignore). Never commit `node_modules`, `dist`, `.env`, or coverage output.
- When adding root scripts, mirror the existing `pnpm --filter <app> <script>` pattern.

## Scope of changes

- Touch only files needed for the task.
- Do not refactor unrelated apps or add docs/markdown unless asked.
