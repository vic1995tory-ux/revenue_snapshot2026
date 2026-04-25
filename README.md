# Revenue Snapshot 2026

Revenue Snapshot is a Next.js application for:

- marketing-facing landing pages;
- PayPal checkout and post-payment onboarding;
- personal accounts and result history;
- Revenue Snapshot questionnaire submission;
- On Rec result pages;
- Make-driven data storage and workflow automation.

This repo is the product frontend and a thin backend layer. Business state lives mostly in Make and related operational tools.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- iron-session for session cookies
- PayPal Expanded Checkout
- Make webhooks for account, payment, and result workflows
- OpenAI via Make for structured result generation

## Main Product Areas

- `/` — landing page, interactive preview, pricing, checkout entry
- `/services` — services and tools page
- `/cabinet-login` — login form
- `/start-page` — post-payment registration completion
- `/account/[token]` — personal cabinet
- `/snapshot-action/[token]` — questionnaire flow
- `/results/[token]` — result page
- `/payment-recovery` — payment recovery flow
- `/privacy-policy`, `/terms-of-use` — legal pages

## Architecture Overview

The application follows a split responsibility model:

1. **Website / Next.js**
   - renders UI;
   - manages sessions;
   - integrates with PayPal;
   - validates and normalizes inbound/outbound payloads;
   - forwards structured requests to Make.

2. **Make**
   - acts as automation and persistence layer;
   - stores account data, questionnaire answers, and generated results;
   - runs service orchestration;
   - coordinates with Notion and OpenAI where applicable.

3. **Notion**
   - stores operational content and templates;
   - is used for promo content and On Rec internal process data.

4. **PayPal**
   - handles payment authorization and capture;
   - is verified server-side before access is issued.

## Payment Flow

Current checkout uses **PayPal Expanded Checkout**.

### Flow

1. User opens checkout from landing page or account promo block.
2. Frontend renders PayPal JS SDK, buttons, and Card Fields.
3. Frontend calls `/api/paypal/create-order`.
4. Server creates a PayPal order using server-side credentials.
5. User approves payment.
6. Frontend calls `/api/paypal/capture-order`.
7. Server captures payment in PayPal.
8. Frontend redirects to `/start-page?tx=...&oid=...&st=...&amt=...&cc=...`.
9. `/start-page` calls `/api/paypal/resolve-session`.
10. `resolve-session` re-checks capture and order directly in PayPal.
11. If verified, Make receives a trusted resolve payload and returns/creates account access.
12. User completes registration and lands in `/account/[token]`.

### Important Security Rule

Access is not granted from URL params alone.  
`resolve-session` now verifies:

- capture status;
- order status;
- capture ID;
- order ID;
- amount;
- currency;
- PayPal `custom_id` / service code.

## Authentication Flow

### Registration

1. User finishes payment.
2. On `/start-page`, user sets:
   - full name
   - company name
   - WhatsApp
   - login
   - password
3. Password is sent to backend over HTTPS.
4. Backend hashes password using `scrypt`.
5. Backend forwards only:
   - `password_hash`
   - `password_salt`
   - `password_version`
   to Make.

### Login

1. User enters login and password on `/cabinet-login`.
2. Backend requests password metadata from Make through `MAKE_LOGIN_LOOKUP_WEBHOOK_URL`.
3. Backend derives `scrypt` hash locally.
4. Backend sends derived hash to the main login webhook.
5. Make compares stored hash and returns access token.

## Environment Variables

See [.env.example](/Users/victoria/Documents/Codex/2026-04-22-github-plugin-github-openai-curated-revenue/revenue_snapshot2026/.env.example).

Required:

- `SESSION_PASSWORD`
- `MAKE_LOGIN_WEBHOOK_URL`
- `MAKE_LOGIN_LOOKUP_WEBHOOK_URL`
- `MAKE_RESOLVE_WEBHOOK_URL`
- `MAKE_START_ACTION_WEBHOOK_URL`
- `MAKE_ACCOUNT_SESSION_WEBHOOK_URL`
- `MAKE_RESULTS_WEBHOOK_URL`
- `MAKE_PAYMENT_RECOVERY_WEBHOOK_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`

## Make Webhooks

### 1. Login Lookup

Env:
- `MAKE_LOGIN_LOOKUP_WEBHOOK_URL`

Request:

```json
{
  "action": "login_lookup",
  "login": "user_login"
}
```

Expected response:

```json
{
  "ok": true,
  "password_salt": "hex_salt",
  "password_version": "scrypt-v1"
}
```

### 2. Login

Env:
- `MAKE_LOGIN_WEBHOOK_URL`

Request:

```json
{
  "action": "login",
  "login": "user_login",
  "password_hash": "hex_hash",
  "password_salt": "hex_salt",
  "password_version": "scrypt-v1"
}
```

Expected response:

```json
{
  "ok": true,
  "access_token": "pg_xxx",
  "full_name": "Victoria",
  "company_name": "Growth Avenue"
}
```

### 3. Resolve Session

Env:
- `MAKE_RESOLVE_WEBHOOK_URL`

This webhook is only called after PayPal verification on the server.

Request shape:

```json
{
  "action": "resolve_session",
  "payment_id": "capture_id",
  "order_id": "paypal_order_id",
  "payment_status": "confirmed",
  "gross_amount": 93,
  "currency": "USD",
  "service_code": "pg",
  "verified_by_paypal": true,
  "verified_capture_id": "capture_id",
  "verified_order_id": "order_id",
  "verified_custom_id": "pg",
  "verified_capture_status": "COMPLETED",
  "verified_order_status": "COMPLETED",
  "access_token": "pg_generated_token"
}
```

### 4. Start Action

Env:
- `MAKE_START_ACTION_WEBHOOK_URL`

Request shape:

```json
{
  "action": "start_action",
  "payment_id": "capture_id",
  "access_token": "pg_xxx",
  "service_code": "pg",
  "full_name": "Victoria",
  "company_name": "Growth Avenue",
  "whatsapp": "+995...",
  "login": "victoria",
  "unique_login": "victoria_ab123",
  "password_hash": "hex_hash",
  "password_salt": "hex_salt",
  "password_version": "scrypt-v1"
}
```

### 5. Account Session

Env:
- `MAKE_ACCOUNT_SESSION_WEBHOOK_URL`

Provides account data, tools, limits, and results to `/account/[token]`.

### 6. Results Generation

Env:
- `MAKE_RESULTS_WEBHOOK_URL`

Receives:
- draft questionnaire saves;
- final questionnaire submissions;
- normalized result-generation payloads.

### 7. Payment Recovery

Env:
- `MAKE_PAYMENT_RECOVERY_WEBHOOK_URL`

Used by `/payment-recovery`.

## Security Assumptions

This codebase assumes:

1. All sensitive service-to-service secrets stay server-side.
2. PayPal payment is always re-verified server-side before access issuance.
3. Passwords are never stored or compared as plain text.
4. Make acts as a controlled processor, not an open trust boundary.
5. Vercel environment variables are configured correctly for production.

## Remaining Operational Requirements

Some things cannot be solved in code alone and must exist in Make / infrastructure:

- Make must support `MAKE_LOGIN_LOOKUP_WEBHOOK_URL`.
- Make must store:
  - `password_hash`
  - `password_salt`
  - `password_version`
- Make login logic must compare derived password hashes, not plain passwords.
- Old accounts created under legacy hashing may require migration.
- Vercel production env vars must be updated whenever credentials change.

## Tests

The repo now includes a minimal automated test layer using Vitest.

Current tests cover:

- service-code and token mapping;
- playground pricing tier logic;
- password hashing and verification behavior.

Run:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Development

Install:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

## Suggested Next Tests

Useful next additions:

- route tests for `/api/paypal/resolve-session`;
- route tests for `/api/auth/login`;
- integration tests for `/start-page` happy path;
- account payload normalization tests;
- snapshot payload normalization tests.
