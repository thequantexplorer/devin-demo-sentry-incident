# Devin demo: Sentry incident to root cause to PR

**What it shows:** Devin as the 3 a.m. on-call engineer. It reads a live Sentry issue through MCP, reproduces it locally, fixes it with a regression test, and comments the PR link back on the Sentry issue.

**Needs:** GitHub, a Sentry account, and the Sentry MCP connected in Devin

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## Set it up

1. Click **Use this template → Create a new repository** (or fork it) into your own GitHub account or org.
2. In Devin, open **Settings → Integrations → GitHub** and make sure Devin can access the new repository.
3. Create a free [Sentry](https://sentry.io) project (platform: Node.js) and copy its DSN.
4. Generate a real production-style incident from your laptop:

   ```sh
   npm install
   SENTRY_DSN=<your-dsn> npm start     # :4200
   npm run traffic                     # in a second terminal; run it 2-3 times
   ```

   Sentry should now show an unresolved `TypeError` with about 10 events.
5. In Devin, connect Sentry from the MCP marketplace (or Plugins) and finish the OAuth sign-in.

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org, and fill in your Sentry org and project slugs.

```text
It's 3am and checkout is throwing 500s in production. You're on call.

Use the Sentry MCP (org <your-sentry-org>, project <your-sentry-project>) to pull the top unresolved issue, its stack trace, and event breadcrumbs/tags. Then clone https://github.com/<you>/devin-demo-sentry-incident, reproduce the failure locally (`npm run traffic` replays production carts against a local server), find the root cause, and ship a PR with the fix plus a regression test that fails before and passes after. In the PR, include the Sentry issue ID, blast radius (which carts/codes are affected), and a short incident summary. Do not resolve the Sentry issue until the PR is up; then comment on it with the PR link.
```
