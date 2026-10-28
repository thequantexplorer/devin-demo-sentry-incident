require('./instrument');
const { createApp } = require('./app');
const log = require('./log');

const port = process.env.PORT || 4200;
createApp().listen(port, () => log.info('listening', { port }));
