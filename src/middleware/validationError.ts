const { BAD_REQUEST } = require('http-status-codes');

class ValidationError extends Error {
    status;

    constructor(message: string, status = BAD_REQUEST) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

module.exports = ValidationError;
