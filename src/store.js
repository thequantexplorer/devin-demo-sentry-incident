const catalog = {
  'SKU-TENT': { name: 'Ultralight Tent', priceCents: 34900 },
  'SKU-PACK': { name: 'Trail Pack 40L', priceCents: 15900 },
  'SKU-MUG': { name: 'Camp Mug', priceCents: 1800 },
  'SKU-LAMP': { name: 'Head Lamp', priceCents: 3900 },
};

const promos = {
  FALL10: { type: 'percent', value: 10 },
  SAVE5: { type: 'fixed', valueCents: 500 },
};

// Gift cards are loaded from the payments ledger. A fully redeemed card has a null balance row.
const giftCards = {
  'GC-1000': { code: 'GC-1000', balance: { amountCents: 2500, currency: 'USD' } },
  'GC-2000': { code: 'GC-2000', balance: { amountCents: 100000, currency: 'USD' } },
  'GC-3000': { code: 'GC-3000', balance: null },
};

module.exports = { catalog, promos, giftCards };
