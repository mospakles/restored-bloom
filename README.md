# Restored Bloom

Website and staff dashboard for **Restored Bloom**, a foundation in Lagos, Nigeria focused on sexual abuse awareness, prevention education and survivor support. Schools, faith communities, community groups, organisations, workplaces and families can all invite it to run sessions. Founded by Motunrayo Odusina.

> **Before launch:** work through [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md). Policies, the founder biography, contact details and support contacts are drafts or empty until the founder confirms them.

## What's included

**Public site.** Home, About, Programmes, Invite Us (`/invite-us`; the old `/school-outreach` address redirects there), Get Involved, Support Our Work, Resources (searchable, by category, with downloads), Events (upcoming/past, detail pages, registration), Contact, Finding Support, and four policy pages. It also has a sitemap, robots rules, Open Graph images, and custom 404 and error pages.

**Working forms.** Outreach invitations (from any kind of host), volunteer, partner, sponsor and general enquiries, event registration and newsletter signup (double opt-in). Every form has:

- server-side validation with field-level errors
- a privacy consent record
- a honeypot field and a signed timing token against bots
- per-IP rate limiting backed by Postgres
- clear loading, success and error states

**Staff dashboard (`/admin`).**
- Sign-in, password reset by email, and password change. There is no public registration.
- Three roles, enforced on the server for every page, action and route.
- Enquiry management: filters, search, assignment, statuses (New → In review → Contacted → Approved → Closed), private notes and CSV export.
- Resources and events with draft, preview, publish and archive.
- Event registrations with cancel/reinstate and CSV export.
- Editable policy and support pages that carry a review flag.
- A verified support-contacts list.
- Site settings: contact details, founder biography, programme status, newsletter toggle, retention period.
- Newsletter subscribers, user management, an audit log, and data-retention deletion.

**Not included, on purpose:** online donations (no approved provider yet), public abuse reporting or case management, survivor stories, and public user accounts.

## Architecture

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript | Already in the repo; server actions keep forms working without client JS |
| Styling | Tailwind CSS 4, custom design tokens in `src/app/globals.css` | Existing setup; cream/plum/rose/sage palette |
| Database | PostgreSQL + Prisma 7 (`@prisma/adapter-pg`) | Brief requirement; typed queries and migrations |
| Auth | Better Auth (email + password, DB sessions, sign-up disabled) | Maintained, self-hosted, built-in password reset and rate limits |
| Email | Nodemailer over SMTP | Works with any provider; optional |
| Validation | Zod 4 (`src/lib/validation.ts`) | One schema per form, used on the server |

Code layout:

```
src/
  app/(site)/       public pages + public server actions (actions.ts)
  app/admin/        (auth) sign-in/reset pages, (dashboard) staff area + actions.ts
  app/api/          auth handler, file downloads, CSV export, upload
  server/           service layer: every protected function calls assertCan(actor, permission)
  lib/              validation, permissions matrix, content copy, env, email, security helpers
  components/       site, forms, admin, ui
prisma/             schema, migrations, development-only seed
scripts/            create-admin, reset-password (CLI)
tests/              unit + integration tests (Vitest)
```

Security notes:

- **Permissions.** The UI is never the only check. The service layer re-checks every permission (`src/lib/permissions.ts` and `src/server/actor.ts`). `src/proxy.ts` only redirects visitors with no session cookie.
- **What staff alerts contain.** Notification emails carry a reference and a link, never submission contents. The audit log stores identifiers and changed field names only.
- **IP addresses.** Raw IPs are never stored; only a keyed hash is used for rate limiting.
- **Uploads.** Files must be PDF, PNG or JPEG under 8 MB. The type is detected from the file's bytes, not its name. Files are stored in the database and served as attachments with `nosniff` and a sandbox CSP.
- **Response headers.** CSP, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` and HSTS (in production) are set in `next.config.ts`.
- **CSV exports.** Cells are escaped to prevent formula injection.
- **Accounts.** Deactivating a user ends their sessions immediately. The last active administrator cannot be demoted or deactivated.

### Roles

| | Administrator | Content editor | Outreach coordinator |
| --- | :-: | :-: | :-: |
| View/assign/update enquiries, private notes | ✔ | | ✔ |
| Export enquiries / registrations | ✔ | | ✔ |
| Delete enquiries | ✔ | | |
| Resources, events, policy pages | ✔ | ✔ | |
| Event registrations | ✔ | | ✔ |
| Newsletter subscribers | ✔ | ✔ | |
| Support contacts, site settings, users, audit log, data retention | ✔ | | |

## Local development

Requirements: Node.js 20.19+ (see `.nvmrc`) and a PostgreSQL database.

```bash
nvm use                       # Node 20.19
npm install                   # also runs `prisma generate`
cp .env.example .env          # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run db:migrate            # create tables
npm run db:seed               # OPTIONAL: synthetic dev data + 3 dev accounts (refuses in production)
npm run dev                   # http://localhost:3000
```

Without a local Postgres, `npx prisma dev` starts a temporary local Postgres-compatible server and prints a connection URL. It needs Node 22.13+, or Node 22.5+ with `NODE_OPTIONS=--experimental-sqlite`. That server only provides a single database, so run a second `prisma dev --name …` instance for tests.

The seed creates `admin@example.com`, `editor@example.com` and `coordinator@example.com` with the password `development-only-password`. Never seed a production database.

## Creating the first administrator

There is no public sign-up. On the server (or locally, pointed at the production `DATABASE_URL`):

```bash
npm run admin:create
```

The command prompts for name, email and password (12+ characters; input is hidden) and creates an administrator. That administrator can then add other staff under **Dashboard → Users**:

- **Email configured:** leave the password blank and the new user receives a "choose your password" link.
- **No email configured:** set an initial password and share it securely.

**Account recovery:**

- **Email configured:** use "Forgotten your password?" on `/admin/sign-in`.
- **No email, or locked out:** run `npm run admin:reset-password`. Add `-- --reactivate` to also re-enable a deactivated account. This signs the user out everywhere.

## Testing and checks

```bash
npm run lint
npm run typecheck
npm test                                   # unit tests; integration tests skip without TEST_DATABASE_URL
TEST_DATABASE_URL=postgresql://… npm test  # + integration tests (WIPES that database)
npm run build
```

Before running integration tests, migrate the test database: `DATABASE_URL=$TEST_DATABASE_URL npx prisma migrate deploy`.

The tests cover:

- form validation and field errors
- the permission matrix, and permission enforcement in services
- enquiry storage and consent records
- event registration: duplicates, capacity, and capacity under concurrent requests
- draft and published visibility for resources, files and events
- the rule that support contacts need verification before they can be published
- protection of the last administrator
- rate limiting, form timing tokens, CSV escaping and upload type detection

## Production deployment

Any Node.js host works (Vercel, Render, Railway, Fly.io or a VPS), with a managed PostgreSQL database such as Neon, Supabase, Railway or RDS.

1. Create the database and copy its connection string, with `sslmode=require`.
2. Set the environment variables from `.env.example` in your host. `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` are required **at build time and runtime**.
3. Build command: `npm run build`. Start command: `npm start`.
4. Apply migrations on each deploy: `npm run db:deploy` (`prisma migrate deploy`). Run it as a release step, or once from your machine pointed at the production database.
5. Run `npm run admin:create` once against production.
6. Serve over HTTPS on your own domain, and set both URL variables to that domain.
7. Optional: schedule a monthly reminder to run **Dashboard → Data retention**.

If the host sits behind a proxy or CDN, make sure it forwards `X-Forwarded-For` so that rate limiting sees real client IPs.

## Credentials you need

| Credential | Required? | Where to get it |
| --- | --- | --- |
| PostgreSQL `DATABASE_URL` | **Yes** | Your database provider's dashboard (e.g. Neon → Connection details) |
| `BETTER_AUTH_SECRET` | **Yes** | Generate: `openssl rand -base64 36`. Store only in the host's secret settings |
| Domain + HTTPS | **Yes** for launch | Domain registrar; HTTPS is usually automatic on the host |
| SMTP host/user/password + verified sender | Strongly recommended | An email provider (Brevo, Postmark, Resend, Zoho…). Verify the sending domain (SPF/DKIM) |
| `ADMIN_NOTIFICATION_EMAILS` | Recommended | Staff inbox(es) for new-submission alerts |
| Plausible domain | Optional | plausible.io (or self-hosted Plausible) |
| Payment provider keys | **Not used yet** | See below |

## Pending: features awaiting credentials or confirmation

These are **not operational** until the listed step is done:

- **Email.** Staff alerts, acknowledgements, password-reset emails, user invites and the newsletter (hidden until SMTP is configured *and* the newsletter is enabled in Site settings).
- **Online donations.** Not built. No payment provider or credentials have been approved. The Support Our Work page offers a sponsorship enquiry instead and says clearly that no payments are taken. To add donations later: choose a provider (e.g. Paystack or Flutterwave for NGN), then implement server-side transaction verification, webhook signature checks, idempotent event handling and pending/success/failed states, plus a Donations dashboard view. Do not show any payment UI before then.
- **Analytics.** Off unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. Loads only after visitor consent and never on `/admin`.
- **Support contacts.** None are listed. Each organisation must be verified and founder-approved in the dashboard before it appears.
- **Policies and founder biography.** Drafts, flagged publicly as awaiting review (see the launch checklist).
- **Programme status.** Every programme shows "Planned" until changed in Site settings.

## Editing content

- **In the dashboard:** policies and the support page (Pages & policies), contact details, social links, founder biography, programme status (Site settings), resources, events and support contacts.
- **In code (`src/lib/content.ts`, page files in `src/app/(site)`):** marketing copy such as programme descriptions, values, where we can help and how an invitation works. This is draft copy for founder review.

The previous front-end prototype (a different concept, with placeholder statistics and testimonials) was moved to `_archive/prototype/` for reference. It is excluded from the build and can be deleted.
