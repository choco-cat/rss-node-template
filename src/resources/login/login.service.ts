const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { FORBIDDEN } = require('http-status-codes');
const ValidationError = require("../../middleware/validationError.ts");
const User = require('../../entities/User.ts');

type IUser =  typeof User;

const EXPIRE_TOKEN = 60 * 60 * 24
// eslint-disable-next-line consistent-return
const getToken = (user: IUser, password: string, callback: (response: string, err: Error | null) => void) => {
  const { JWT_SECRET_KEY } = process.env;
  if (user === undefined) {
    return callback("", new ValidationError(`Incorrect login`, FORBIDDEN));
  }
  bcrypt.compare(password, user.password, (_err: Error, matches: boolean) => {
    let token: string;
    if (matches) {
      token = jwt.sign({id: user.id, login: user.login}, JWT_SECRET_KEY, {expiresIn: EXPIRE_TOKEN});
    } else {
      return callback("", new ValidationError(`Incorrect password`, FORBIDDEN));
    }
    return callback(token, null);
  });
};

module.exports = { getToken};
export {};