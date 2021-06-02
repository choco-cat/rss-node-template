const morgan = require('morgan');
const { createWriteStream } = require('fs');

const morganDev = morgan('dev', {stream: createWriteStream('access.log')});
module.exports = morganDev;
