import { Request, Response, NextFunction } from 'express';

const { BAD_REQUEST } = require('http-status-codes');
const ValidationError = require("./validationError.ts");
const logger = require('./winston.ts');

const errorHandler = (err: Error|typeof ValidationError, _req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ValidationError) {
        res.status(err.status).send(err.message);
    } else {
        res.status(BAD_REQUEST).send(err.message);
    }
    logger.log('error', err.message);
    next();
}

const uncaughtExceptionHandler = (err: Error): void => {
    logger.log('error', `Uncaught error: ${err}`, () => process.exit(1));
}

const unhandledRejectionHandler = (reason: PromiseRejectionEvent): void => {
    logger.log('error', `Unhandled rejection error: ${JSON.stringify(reason)}`, () => process.exit(1));
}

module.exports = { errorHandler, uncaughtExceptionHandler, unhandledRejectionHandler };
