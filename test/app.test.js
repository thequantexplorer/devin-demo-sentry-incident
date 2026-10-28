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
