const Sentry = require('./instrument');
const express = require('express');
const log = require('./log');
const { quote } = require('./pricing');

let orderSeq = 5000;

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ ok: true }));

  app.post('/quote', (req, res, next) => {
    try {
      res.json(quote(req.body || {}));
    } catch (err) {
      next(err);
    }
  });

  app.post('/checkout', (req, res, next) => {
    try {
      const body = req.body || {};
      if (!Array.isArray(body.items) || body.items.length === 0) return res.status(400).json({ error: 'items required' });
      const totals = quote(body);
      const order = { id: 'ord_' + ++orderSeq, ...totals, status: 'confirmed' };
      log.info('checkout.confirmed', { orderId: order.id, totalCents: order.totalCents, giftCard: body.giftCard || null });
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  });

  Sentry.setupExpressErrorHandler(app);

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (status >= 500) log.error('request.failed', { path: req.path, error: err.message, stack: err.stack });
    res.status(status).json({ error: status >= 500 ? 'internal error' : err.message });
  });

  return app;
}

module.exports = { createApp };
