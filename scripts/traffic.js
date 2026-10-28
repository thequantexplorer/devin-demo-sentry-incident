// Replays a slice of real production checkout traffic against a running instance.
const base = process.env.BASE_URL || 'http://localhost:4200';
const carts = [
  { items: [{ sku: 'SKU-TENT', qty: 1 }], promoCode: 'FALL10' },
  { items: [{ sku: 'SKU-MUG', qty: 2 }] },
  { items: [{ sku: 'SKU-PACK', qty: 1 }, { sku: 'SKU-LAMP', qty: 1 }], giftCard: 'GC-1000' },
  { items: [{ sku: 'SKU-LAMP', qty: 1 }], giftCard: 'GC-3000' },
  { items: [{ sku: 'SKU-TENT', qty: 1 }], giftCard: 'GC-2000', promoCode: 'SAVE5' },
  { items: [{ sku: 'SKU-MUG', qty: 1 }], giftCard: 'GC-3000', promoCode: 'FALL10' },
];
const rounds = Number(process.env.ROUNDS || 5);

(async () => {
  const tally = {};
  for (let r = 0; r < rounds; r++) {
    for (const cart of carts) {
      const res = await fetch(base + '/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(cart) });
      tally[res.status] = (tally[res.status] || 0) + 1;
    }
  }
  console.log('status counts', tally);
})();
