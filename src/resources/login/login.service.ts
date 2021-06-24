const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ValidationError = require("../../middleware/validationError.ts");
const User = require('../../entities/User.ts');

type IUser =  typeof User;

// eslint-disable-next-line consistent-return
const getToken = (user: IUser, password: string, callback: (response: string, err: Error | null) => void) => {
  const { JWT_SECRET_KEY } = process.env;
  if (user === undefined) {
    return callback("", new ValidationError(`Incorrect login`, 403));
  }
  bcrypt.compare(password, user.password, (_err: Error, matches: boolean) => {
    let token: string;
    if (matches) {
      token = jwt.sign({id: user.id, login: user.login}, JWT_SECRET_KEY, {expiresIn: 60 * 60 * 24});
    } else {
      return callback("", new ValidationError(`Incorrect password`, 403));
    }
    return callback(token, null);
  });
};

module.exports = { getToken};
export {};