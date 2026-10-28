# Devin demo: Production error to root cause to PR

**What it shows:** Checkout is returning 500 errors. Devin reproduces them by replaying production traffic locally, finds the cause in the logs, and opens a fix PR with a regression test. If you use Sentry, it can start from the live Sentry issue instead.

**Needs:** GitHub. Sentry is optional.

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## Set it up

1. Click **Use this template → Create a new repository**, choose your GitHub account or org as the owner, and keep the name `devin-demo-sentry-incident`. The links and prompt below assume that name. Use the template rather than a fork: pull requests on a fork go to the original repo by default.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org.

```text
It's 3am and checkout is throwing 500s in production. You're on call.

Clone https://github.com/<you>/devin-demo-sentry-incident, start the server, and reproduce the failure with `npm run traffic` (it replays a slice of production checkout traffic against the local server). Use the server logs and stack trace to find the root cause, then ship a PR with the fix plus a regression test that fails before and passes after. In the PR, include the blast radius (which carts/codes are affected) and a short incident summary.
```

## Optional: start from Sentry

If you use Sentry, Devin can read the live issue (stack trace, breadcrumbs, event count) instead of finding the error in the logs, and comment the PR link back on the issue.

1. Create a free [Sentry](https://sentry.io) project (platform: Node.js) and copy its DSN.
2. Save the DSN in Devin as a secret named `SENTRY_DSN` on the [Secrets page](https://app.devin.ai/settings/secrets). Devin starts the server with it and sends the failing checkouts to Sentry.
3. In Devin, open **Customize → Browse marketplace**, install the Sentry plugin, then click **Connect** under **Customize → MCPs** to finish the sign-in.
4. Start a Devin session and paste this prompt instead, filling in your Sentry org and project slugs:

```text
It's 3am and checkout is throwing 500s in production. You're on call.

Clone https://github.com/<you>/devin-demo-sentry-incident, start the server with the `SENTRY_DSN` secret set, and run `npm run traffic` two or three times so the failing production checkouts reach Sentry. Then use the Sentry MCP (org <your-sentry-org>, project <your-sentry-project>) to pull the top unresolved issue, its stack trace, and event breadcrumbs/tags. Find the root cause from the Sentry issue, and ship a PR with the fix plus a regression test that fails before and passes after. In the PR, include the Sentry issue ID, blast radius (which carts/codes are affected), and a short incident summary. Do not resolve the Sentry issue until the PR is up; then comment on it with the PR link.
```
