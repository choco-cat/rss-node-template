import { Request, Response } from 'express';

const morgan = require('morgan');
const winston = require('./winston.ts');

morgan.token('body', (req: Request, _res: Response) => JSON.stringify(req.body));
morgan.token('params', (req: Request, _res: Response) => JSON.stringify(req.params));
const morganDev = morgan(':method :url :status :response-time ms - params: :params - body: :body', {stream: winston.stream});

module.exports = morganDev;
