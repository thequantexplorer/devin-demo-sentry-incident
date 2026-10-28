const test = require('node:test');
const assert = require('node:assert');
const { quote } = require('../src/pricing');

test('percent promo and free shipping', () => {
  const q = quote({ items: [{ sku: 'SKU-TENT', qty: 1 }], promoCode: 'FALL10' });
  assert.deepStrictEqual(q, { subtotalCents: 34900, discountCents: 3490, shippingCents: 0, giftCardCents: 0, totalCents: 31410 });
});

test('small cart pays shipping', () => {
  assert.strictEqual(quote({ items: [{ sku: 'SKU-MUG', qty: 1 }] }).shippingCents, 799);
});

test('gift card covers part of the total', () => {
  const q = quote({ items: [{ sku: 'SKU-PACK', qty: 1 }], giftCard: 'GC-1000' });
  assert.strictEqual(q.giftCardCents, 2500);
  assert.strictEqual(q.totalCents, 13400);
});
