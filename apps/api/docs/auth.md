# Auth — Agent context

> **Audience:** AI agents and developers implementing future API features.
> **Keep in sync:** update this file whenever auth/users endpoints, guards, DTOs, or storage change.

## When to read this

Read this file **before** implementing any API work that involves:

- authenticated routes / JWT / `Authorization` headers
- users (register, lookup, profile, ownership)
- Swagger schemas related to auth or users
- replacing in-memory storage with a database

Do **not** reinvent auth: reuse `AuthGuard`, `UsersService`, and existing DTOs.

## What already exists

| Piece | Path | Reuse for |
|-------|------|-----------|
| Register user | `POST /users` → `UsersController` / `UsersService` | Any flow that needs a user account |
| Login (JWT) | `POST /auth/login` → `AuthService.signIn` | Issuing tokens |
| Current user | `GET /auth/me` → `AuthService.getProfile` | Profile / session check |
| Guard | `src/auth/auth.guard.ts` | Protecting new routes |
| JWT payload on request | `request.user` (`{ sub, email }`) | Knowing who called the API |
| User store | `UsersService` + Mongoose `Model<UserDocument>` | Finding users by id/email |
| Safe user shape | `UserResponseDto` / `toResponse()` | Never expose `password` |
| Public decorator | `@Public()` (ready, unused) | When/if guard becomes global |
| Swagger | `/api/docs` + DTO `@ApiProperty` | Document new auth-related inputs/outputs |

### Modules

```
AppModule
├── UsersModule  → UsersService (exported), UsersController
└── AuthModule   → AuthService, AuthController, AuthGuard
                 → imports UsersModule + JwtModule (global)
```

### Storage (current)

- Users are persisted in **MongoDB** via Mongoose (`@nestjs/mongoose`).
- Connection URI: `MONGODB_URI` env var (default: `mongodb://localhost:27017/code-connect`).
- Run `docker compose up -d` from the project root to start MongoDB with a named volume (`mongo_data`).
- `User` entity: `apps/api/src/users/entities/user.entity.ts` — `@Schema` class; `UserDocument = HydratedDocument<User>`.
- Model injected into `UsersService` via `@InjectModel(User.name)`.
- `user.id` is the Mongoose virtual getter for `_id.toString()` (ObjectId as string).

## Contracts (stable surface)

| Method | Route | Auth | Status | Notes |
|--------|------|------|--------|-------|
| `POST` | `/users` | Public | `201` | Body: `name`, `email`, `password` (≥6). `409` if email exists |
| `POST` | `/auth/login` | Public | `200` | Body: `email`, `password` → `{ access_token }`. `401` on failure |
| `GET` | `/auth/me` | Bearer | `200` | Returns `{ id, name, email }`. `401` without valid JWT |

### JWT payload

```ts
{ sub: string; email: string; iat: number; exp: number }
// sub === user.id; expiresIn: '1d'; secret: auth/constants.ts (dev only)
```

### Example bodies

```json
// POST /users
{ "name": "João Silva", "email": "joao@email.com", "password": "Senha@123" }

// POST /auth/login
{ "email": "joao@email.com", "password": "Senha@123" }

// GET /auth/me response
{ "id": "…", "name": "João Silva", "email": "joao@email.com" }
```

## Recipes for new features

### Protect a new endpoint

```typescript
import { UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, type JwtPayload } from '../auth/auth.guard.js';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Get('recurso')
handler(@Request() req: { user: JwtPayload }) {
  // req.user.sub → user id
}
```

### Need the full user in a service

1. Inject `UsersService` (import `UsersModule` in your feature module).
2. Call `findById(req.user.sub)` or `findByEmail(...)`.
3. Return data via `toResponse(user)` or map to your own DTO — **never** return `password`.

### New public vs protected routes

- Public today: decorate nothing special; only apply `@UseGuards(AuthGuard)` where needed.
- If auth becomes global later: mark open routes with `@Public()` from `auth/decorators/public.decorator.ts`.

### New module checklist (API)

1. Resource-oriented URL (nouns, plural) — see root `AGENTS.md`.
2. DTOs with `class-validator` + `@ApiProperty` (Swagger).
3. Unit tests colocated (`*.spec.ts`).
4. If the feature touches auth/users: **update this file**.

## Decisions (do not fight these unless asked)

| Choice | Implication for new work |
|--------|--------------------------|
| `@nestjs/jwt` without Passport | Use `AuthGuard` + `JwtService`, not Passport strategies |
| `bcryptjs` hashes | Compare with `compare()`; never store plain passwords |
| Mongoose / MongoDB | ODM chosen over TypeORM (legacy Mongo support) / Prisma (limited embedded docs) / MikroORM (smaller community for Mongo + NestJS) |
| ESM + `.js` import suffixes | Match existing Nest 12 ESM style |
| Swagger at `/api/docs` | Keep DTO decorators on new auth-related endpoints |
| CORS `origin: true` | Browser clients (e.g. Vite web app) can call the API |

## File map

```
apps/api/src/
├── auth/          # login, me, guard, JWT constants, DTOs
├── users/         # register + Mongoose model (MongoDB)
└── common/dto/    # UserResponseDto (shared response shape)
```

## Out of scope (until requested)

- JWT secret from env
- Refresh tokens
- Global `AuthGuard` + `@Public()` everywhere
