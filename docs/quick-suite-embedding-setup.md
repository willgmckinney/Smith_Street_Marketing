# Quick Suite Embed Demo — setup guide

The `/quick-demo` route on this site embeds an Amazon Quick Suite (formerly
QuickSight) dashboard, the Generative Q&A panel, and a Quick Chat agent. All
three render inside iframes mounted by the `amazon-quicksight-embedding-sdk`.
Embed URLs are minted by a Vercel Serverless Function (`/api/embed-url`) that
calls `quicksight:GenerateEmbedUrlForRegisteredUser` against a shared Quick
Suite reader user. Visitors authenticate through Amazon Cognito Hosted UI before
the function will issue an embed URL.

This document is the runbook for everything that lives outside the codebase:
the Quick Suite account, the Cognito User Pool, the IAM user, and the Vercel
project.

## Architecture at a glance

```
Visitor ── Cognito Hosted UI ──┐
                               │ access_token
SPA  ──── POST /api/embed-url ─┤  (Bearer)
                               │
        ┌──────────────────────┘
        ▼
Vercel Function
  ├─ Verify JWT against Cognito JWKS
  └─ quicksight:GenerateEmbedUrlForRegisteredUser
        ▼
   embed URL (5-min redemption, 10-hour session)
        ▼
SPA  ──── QuickSightEmbedding SDK ──── iframe
```

## 1. Quick Suite (AWS) one-time setup

You'll do this in the AWS Console + a couple of `aws` CLI calls.

### 1.1. Make sure Quick Suite is on Enterprise edition

Embedding requires Quick Suite Enterprise. From the AWS Console open Quick Suite
and verify the edition under **Manage Quick Suite → Account settings**.

### 1.2. Create the dedicated demo reader

We mint every embed URL on behalf of one shared Quick Suite-native user, not
your AWS root account. This is the user the SPA visitors "appear as" to Quick
Suite. From a terminal with admin AWS credentials:

```bash
aws quicksight register-user \
  --aws-account-id <AWS_ACCOUNT_ID> \
  --namespace default \
  --identity-type QUICKSIGHT \
  --user-role READER_PRO \
  --user-name smithave-demo-viewer \
  --email demo-viewer@smithaveinsights.com
```

Capture the returned `User.Arn` — it looks like:

```
arn:aws:quicksight:us-east-1:<account-id>:user/default/smithave-demo-viewer
```

That value becomes `QUICKSIGHT_USER_ARN` in the Vercel env.

> **Why `READER_PRO`?** Pro readers can consume Amazon Q in Quick Suite
> features (Q&A, executive summaries, Quick Chat). A standard `READER` cannot.

### 1.3. Share the dashboard with the demo reader

For our first dashboard (id `94f59731-6dc9-4e54-b78d-f709c79ac841`):

```bash
aws quicksight update-dashboard-permissions \
  --aws-account-id <AWS_ACCOUNT_ID> \
  --dashboard-id 94f59731-6dc9-4e54-b78d-f709c79ac841 \
  --grant-permissions Principal="arn:aws:quicksight:us-east-1:<account-id>:user/default/smithave-demo-viewer",Actions="quicksight:DescribeDashboard","quicksight:ListDashboardVersions","quicksight:QueryDashboard"
```

### 1.4. Q Topic for Generative Q&A

Create or pick an existing Q **Topic** (Quick Suite → Topics) and share it with
the demo reader the same way. Grab its Topic ID from the topic's URL — this
becomes `QUICKSIGHT_TOPIC_ID`.

### 1.5. Quick Chat agent

The agent link you provided
(`us-east-1.quicksight.aws.amazon.com/sn/account/smithaveinsights/spaces/528a851f-6cf7-4f79-a21f-2d020d670610`)
is a Space, not the agent itself. Open the space, find the agent inside it, and
copy its **Agent ID** — that's the value for `QUICKSIGHT_AGENT_ID` /
`VITE_QUICKSIGHT_AGENT_ID`.

Share the agent with `smithave-demo-viewer` via the agent's permissions panel.

### 1.6. Allowed domains

In Quick Suite, **Manage Quick Suite → Domains and Embedding**, add both:

- `https://<your-vercel-prod-domain>` (e.g. `https://smithaveinsights.com`)
- `http://localhost:3000` (for `vercel dev`)

If you use Vercel preview URLs you can wildcard them with
`https://*.vercel.app`.

### 1.7. IAM user for the Vercel function

Create a programmatic-only IAM user named `vercel-quicksight-embed` with a
long-lived access key and attach the following inline policy. Substitute your
`<account-id>` and the IDs you captured above.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "GenerateEmbedUrl",
      "Effect": "Allow",
      "Action": [
        "quicksight:GenerateEmbedUrlForRegisteredUser"
      ],
      "Resource": [
        "arn:aws:quicksight:us-east-1:<account-id>:user/default/smithave-demo-viewer"
      ]
    },
    {
      "Sid": "ReadDashboardForEmbedding",
      "Effect": "Allow",
      "Action": [
        "quicksight:DescribeDashboard"
      ],
      "Resource": [
        "arn:aws:quicksight:us-east-1:<account-id>:dashboard/94f59731-6dc9-4e54-b78d-f709c79ac841"
      ]
    }
  ]
}
```

Note: `GenerateEmbedUrlForRegisteredUser` is gated on the `UserArn` — the
dashboard/topic/agent permissions are enforced separately when the embedded
session loads, based on what's shared with `smithave-demo-viewer`.

Capture the access key ID and secret — they go into Vercel as
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

## 2. Amazon Cognito setup

### 2.1. User Pool

In the AWS Console, **Cognito → User pools → Create user pool**. Suggested
settings for a simple gated demo:

- Sign-in identifier: **Email**
- Multi-factor: **Optional** (or off for the demo)
- Self-service sign-up: **off** (invite-only by default — you create users
  manually under **Users**). You can flip this on once you want prospects to
  self-register.
- Required attributes: `email`

Capture the **User Pool ID** (looks like `us-east-1_AbCdEf123`).

### 2.2. App Client

Inside the pool, **App integration → App clients → Create app client**:

- **Public client** (no client secret — required for SPA + PKCE).
- Authentication flows: **ALLOW_USER_SRP_AUTH** is sufficient.
- Hosted UI:
  - Allowed callback URLs:
    `http://localhost:3000/auth/callback`,
    `https://<your-vercel-prod-domain>/auth/callback`
  - Allowed sign-out URLs:
    `http://localhost:3000/`,
    `https://<your-vercel-prod-domain>/`
  - OAuth grant types: **Authorization code grant**
  - Scopes: `openid`, `email`, `profile`

Capture the **Client ID**.

### 2.3. Hosted UI domain

In the same App integration tab, set a **Cognito domain** prefix
(e.g. `smithave-demo`). Your domain ends up as
`smithave-demo.auth.us-east-1.amazoncognito.com` — that's
`VITE_COGNITO_DOMAIN`.

### 2.4. Values you'll need

| Env var | Where to find it |
|---|---|
| `VITE_COGNITO_AUTHORITY` / `COGNITO_ISSUER` | `https://cognito-idp.<region>.amazonaws.com/<user-pool-id>` |
| `VITE_COGNITO_CLIENT_ID` / `COGNITO_CLIENT_ID` | App Client → Client ID |
| `VITE_COGNITO_DOMAIN` | Hosted UI domain (no scheme) |

## 3. Vercel project

### 3.1. Connect the repo

In Vercel, **Add New → Project → Import** the GitHub repo. Vercel auto-detects
Vite. Confirm:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

The `vercel.json` in the repo handles SPA fallback for client-side routes.

### 3.2. Environment variables

Set all of the variables from `.env.example` under **Settings → Environment
Variables** for Production, Preview, and Development.

The variables are split into two groups:

- `VITE_*` — baked into the browser bundle at build time. Safe to expose.
- Everything else — only readable by the `/api/embed-url` serverless function.
  Treat as secrets.

### 3.3. Custom domain (optional)

If you point a custom domain at the project, add it to Quick Suite's allowed
domains (§1.6) and to the Cognito App Client callback / sign-out URLs (§2.2).

## 4. Local development

```bash
# Install once:
npm install -g vercel

# First time: link the local checkout to the Vercel project.
vercel link

# Pull the env vars Vercel stores into a local .env.local:
vercel env pull

# Run the SPA AND the serverless function on http://localhost:3000:
npm run dev:full
```

`npm run dev` (or `npm start`) runs only the SPA via Vite on `:5173` — the API
function won't be available, so the embed page will error out at the
`fetchEmbedUrl` call. Use `npm run dev:full` for end-to-end testing.

## 5. Troubleshooting

- **`Forbidden` / `Unauthorized` error on the iframe**: the embed URL expired
  (5-minute redemption window). The components auto-fetch a fresh URL on
  mount; reloading the tab fixes it.
- **`Invalid token` from `/api/embed-url`**: the visitor's Cognito access token
  expired or `COGNITO_ISSUER` / `COGNITO_CLIENT_ID` are wrong. Make the
  visitor sign in again; verify the env vars match the pool.
- **`AccessDeniedException` from QuickSight**: the IAM user is missing
  `quicksight:GenerateEmbedUrlForRegisteredUser`, OR the dashboard/topic/agent
  isn't shared with `smithave-demo-viewer`.
- **`UnsupportedUserEditionException`**: the Quick Suite account is on Standard
  edition — upgrade to Enterprise.
- **Iframe loads but says "domain not allowed"**: the Vercel domain isn't in
  Quick Suite's Allowed Domains list (§1.6).

## 6. Rotating credentials

- AWS access key: create a new key on the `vercel-quicksight-embed` IAM user,
  update Vercel env vars, deactivate the old key.
- Cognito client: in the App Client settings you can rotate the client ID by
  creating a new client and pointing the env var at it.
