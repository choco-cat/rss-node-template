const morgan = require('morgan');
const { createWriteStream } = require('fs');
const winston = require('./winston.ts');

const morganDev = morgan('dev', {stream: winston.stream});
module.exports = morganDev;
