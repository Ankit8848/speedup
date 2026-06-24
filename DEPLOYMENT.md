# Deploying SpeedUp to Vercel

This app is a single Vercel project with three parts:

| Part | Where it runs |
| --- | --- |
| Frontend (`artifacts/speedup`, Vite SPA) | Vercel static hosting |
| API (`artifacts/api-server`, Express) | Vercel Serverless Function (`api/index.ts`) |
| Database | Neon serverless Postgres |
| Media uploads | Vercel Blob |

`vercel.json` wires it together: it builds the SPA, exposes the Express app as a
function, rewrites `/api/*` to that function, and serves `index.html` for all
client-side routes.

## 1. Push the code to GitHub

```bash
git push -u origin main --force   # replaces the old repo contents
```

(You need a GitHub Personal Access Token or SSH key configured — see the chat
notes. The force push is intentional: it removes the old code.)

## 2. Create the Vercel project

1. Go to <https://vercel.com/new> and import `Ankit8848/speedup`.
2. **Framework Preset:** Other (the included `vercel.json` controls the build).
3. **Root Directory:** leave as the repository root.
4. Don't deploy yet — add the environment variables first (next step).

## 3. Create a Vercel Blob store (for uploads)

In the Vercel project → **Storage → Create → Blob**. This adds a
`BLOB_READ_WRITE_TOKEN` env var automatically. (Without it, uploads fall back to
local disk, which does not persist on Vercel.)

## 4. Set environment variables

Project → **Settings → Environment Variables** (Production + Preview):

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Your Neon pooled connection string (from the Neon dashboard / chat) |
| `JWT_SECRET` | A long random string (e.g. `openssl rand -hex 32`) |
| `BLOB_READ_WRITE_TOKEN` | Added automatically when you create the Blob store |

`NODE_ENV=production` is set by Vercel automatically. The frontend needs no env
var — it calls `/api` on the same domain.

## 5. Deploy

Trigger a deploy (push to `main` or click **Deploy**). Vercel will:

- `pnpm install`
- build the SPA → `artifacts/speedup/dist/public`
- build `api/index.ts` into a serverless function

## 6. First login

Visit `https://<your-app>.vercel.app/admin` and sign in with the seeded admin:

- **Email:** `admin@speedup.com`
- **Password:** `admin12345`

**Immediately change the password** (Admins → your user) and make sure
`JWT_SECRET` is a strong value.

## Database

The schema lives in `lib/db/src/schema` (Drizzle). It has already been pushed and
seeded to Neon. To re-apply after schema changes:

```bash
DATABASE_URL='<neon-url>' pnpm --filter ./lib/db push
DATABASE_URL='<neon-url>' pnpm --filter ./lib/db seed   # idempotent: only creates the admin if missing
```

## Local development

Local dev is unchanged and uses a local Postgres + on-disk uploads:

```bash
pnpm --filter ./artifacts/api-server dev   # API on :8081
pnpm --filter ./artifacts/speedup dev      # web on :8080 (proxies /api)
```

Set the env vars from `.env.example` in a local `.env` file. To point local dev at
Neon instead, set `DATABASE_URL` to the Neon string.

## Notes / troubleshooting

- **API routing:** the function is `api/index.ts`; `vercel.json` rewrites
  `/api/(.*)` to it. The Express app keeps its routes mounted under `/api`.
- **Demo form:** set the Formspree endpoint in Admin → Content → *Demo request form*.
- **Cold starts:** the first request after idle may be slow (Neon compute +
  function spin-up); subsequent requests are fast.
