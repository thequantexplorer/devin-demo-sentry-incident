process.env.NODE_ENV = 'test';
const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../src/app');

test('checkout confirms an order', async () => {
  const res = await request(createApp()).post('/checkout').send({ items: [{ sku: 'SKU-MUG', qty: 2 }] });
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.status, 'confirmed');
});

test('rejects unknown promo codes', async () => {
  const res = await request(createApp()).post('/checkout').send({ items: [{ sku: 'SKU-MUG', qty: 1 }], promoCode: 'BOGUS' });
  assert.strictEqual(res.status, 400);
});

test('checkout with a fully redeemed gift card does not 500', async () => {
  const res = await request(createApp()).post('/checkout').send({ items: [{ sku: 'SKU-LAMP', qty: 1 }], giftCard: 'GC-3000' });
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.giftCardCents, 0);
  assert.strictEqual(res.body.totalCents, 4699);
});
