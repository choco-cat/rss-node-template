import { Request } from 'express';

const morgan = require('morgan');
const winston = require('./winston.ts');

morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('params', (req: Request) => JSON.stringify(req.params));
morgan.token('queryParams', (req: Request) => JSON.stringify(req.query));
const morganDev = morgan(':method :url :status :response-time ms - params: :params - query params: :queryParams - body: :body', {stream: winston.stream});

module.exports = morganDev;
