function log(level, msg, fields = {}) {
  if (process.env.NODE_ENV === 'test') return;
  process.stdout.write(JSON.stringify({ ts: new Date().toISOString(), level, msg, service: 'checkout-api', ...fields }) + '\n');
}
module.exports = { info: (m, f) => log('info', m, f), error: (m, f) => log('error', m, f) };
