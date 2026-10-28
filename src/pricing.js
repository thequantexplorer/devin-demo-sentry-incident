const { catalog, promos, giftCards } = require('./store');

function subtotal(items) {
  return items.reduce((sum, { sku, qty }) => {
    const product = catalog[sku];
    if (!product) throw Object.assign(new Error('unknown sku ' + sku), { status: 400 });
    return sum + product.priceCents * qty;
  }, 0);
}

function promoDiscount(code, amountCents) {
  if (!code) return 0;
  const promo = promos[code];
  if (!promo) throw Object.assign(new Error('invalid promo code'), { status: 400 });
  if (promo.type === 'percent') return Math.round((amountCents * promo.value) / 100);
  return Math.min(promo.valueCents, amountCents);
}

function giftCardCredit(code, amountCents) {
  if (!code) return 0;
  const card = giftCards[code];
  if (!card) throw Object.assign(new Error('unknown gift card'), { status: 400 });
  return Math.min(card.balance.amountCents, amountCents);
}

function shipping(amountCents) {
  return amountCents >= 5000 ? 0 : 799;
}

function quote({ items, promoCode, giftCard }) {
  const sub = subtotal(items);
  const discount = promoDiscount(promoCode, sub);
  const afterDiscount = sub - discount;
  const ship = shipping(afterDiscount);
  const credit = giftCardCredit(giftCard, afterDiscount + ship);
  return { subtotalCents: sub, discountCents: discount, shippingCents: ship, giftCardCents: credit, totalCents: afterDiscount + ship - credit };
}

module.exports = { quote, subtotal, promoDiscount, giftCardCredit, shipping };
