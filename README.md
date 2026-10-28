# acme-checkout-api

Checkout pricing for the Acme storefront: carts, promo codes, gift cards, shipping and order totals.
Errors and traces go to Sentry (project `acme-checkout-api`) when `SENTRY_DSN` is set.

```sh
npm install
npm test
SENTRY_DSN=... npm start         # :4200
npm run traffic                  # replay a slice of production checkout traffic
```

Runbook: a spike of 5xx on `POST /checkout` pages the on-call. Check Sentry for the top issue, reproduce locally with `npm run traffic`, ship a fix with a regression test.

---

This repo is a starter for a Devin demo. See [DEVIN_DEMO.md](DEVIN_DEMO.md) for setup and the prompt.
