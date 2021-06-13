import { Request, Response, NextFunction } from 'express';

const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const ValidationError = require("./validationError.ts");
const logger = require('./winston.ts');

const errorHandler = (err: Error | typeof ValidationError, _req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ValidationError) {
        res.status(err.status).send(err.message);
    } else {
        res.status(INTERNAL_SERVER_ERROR).send(err.message);
    }
    logger.error(err.message);
    next();
};

const uncaughtExceptionHandler = (err: Error): void => {
    logger.error(`Uncaught error: ${err}`, () => () => process.exit(1));
};

const unhandledRejectionHandler = (err: Error): void => {
    logger.error( `Unhandled rejection error: ${err}`, () => process.exit(1));
};

module.exports = { errorHandler, uncaughtExceptionHandler, unhandledRejectionHandler };
