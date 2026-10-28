const Sentry = require('@sentry/node');

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'production',
    release: 'acme-checkout-api@' + require('../package.json').version,
    tracesSampleRate: 1.0,
  });
}

module.exports = Sentry;
