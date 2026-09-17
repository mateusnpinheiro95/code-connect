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
pnpm test:web     # vitest (watch)
pnpm test:web:a11y # WCAG AA automated checks (axe / vitest-axe)
```

Package manager is **pnpm** only (`packageManager` in root `package.json`). Do not introduce npm/yarn lockfiles.

## Frontend (`apps/web`)

- Structure UI with **Atomic Design**: `atoms` → `molecules` → `organisms` → `templates` → `pages`.
- Style with **Tailwind CSS** only (utility classes; avoid ad-hoc CSS/modules unless unavoidable).
- Every component must ship with a test covering its **essential usage** (render + primary interaction/props). Colocate or mirror under the same atomic layer.

### Design tokens (`apps/web/src/index.css`)

Tokens live in Tailwind v4 `@theme`. **Never hardcode hex colors or arbitrary sizes** (`text-[31px]`, `rounded-[32px]`, `#81fe88`, etc.) in components — add or reuse a token, then use the utility.

#### Colors

| Token | Utility examples | Use |
|-------|------------------|-----|
| `primary` / `primary-dark` | `bg-primary`, `text-primary`, `hover:bg-primary-dark` | CTAs, accents, focus, links |
| `on-primary` | `text-on-primary` | Text on primary surfaces |
| `dark` | `bg-dark` | Page background |
| `dark-card` | `bg-dark-card` | Cards, auth shell |
| `dark-lighter` | `bg-dark-lighter`, `border-dark-lighter` | Inputs, borders, dividers |
| `text-primary` / `text-secondary` | `text-text-primary`, `text-text-secondary` | Body / muted text |
| `error` | `text-error`, `border-error` | Validation errors |
| `pattern` | (CSS / `.bg-auth-pattern`) | Watermark stroke |

#### Typography

| Token | Size | Utility | Use |
|-------|------|---------|-----|
| `display` | 31px | `text-display` | Page titles (Login, Cadastro) |
| `subtitle` | 22px | `text-subtitle` | Subtitles |
| `body` | 18px | `text-body` | Labels, buttons, footer |
| `body-sm` | 15px | `text-body-sm` | Inputs, helpers, checkbox/link default |
| `label` | 12.5px | `text-label` | Social button captions |

Font family: `font-sans` → Prompt (defined in `@theme`).

#### Radii & layout

| Token | Utility | Use |
|-------|---------|-----|
| `radius-auth` | `rounded-auth` | Auth card (32px) |
| `radius-button` | `rounded-button` | Buttons / social (8px) |
| `radius-input` | `rounded-input` | Inputs (4px) |
| `width-auth-banner` | `w-auth-banner` | Banner column (407px) |
| `width-auth-form-col` | `w-auth-form-col` | Form column (410px) |
| `max-width-auth-form` | `max-w-auth-form` | Fields / CTA width (318px) |
| `max-width-auth-card` | `max-w-auth-card` | Auth card max width (996px) |
| `spacing-auth-card-x` / `y` | `px-auth-card-x`, `py-auth-card-y` | Card padding (78px / 56px) |
| `width-logo` / `height-logo` | `w-logo`, `h-logo` | Logo box |
| `spacing-pattern` | via `.bg-auth-pattern` | Watermark tile size |

New visual values from Figma go into `@theme` first; components only consume the generated utilities.

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
