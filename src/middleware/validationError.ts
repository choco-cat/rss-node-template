const { INTERNAL_SERVER_ERROR, StatusCodes, getReasonPhrase } = require('http-status-codes');

class ValidationError extends Error {
    status;

    constructor(message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), status = INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

module.exports = ValidationError;
