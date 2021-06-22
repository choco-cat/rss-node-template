const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ValidationError = require("../../middleware/validationError.ts");
const User = require('../../entities/User.ts');

type IUser =  typeof User;

const getToken =  ( user: IUser, password: string, callback: any ): any => {
  const { JWT_SECRET_KEY } = process.env;
  if (user === undefined) {
    throw new ValidationError(`Incorrect login`, 403);
  }
  bcrypt.compare(password, user.password, (_err: Error, matches: any) => {
    let token: string;
    if (matches) {
      token = jwt.sign({id: user.id, login: user.login}, JWT_SECRET_KEY, {expiresIn: 60 * 60 * 24});
    } else {
      return callback(null, new ValidationError(`Incorrect password`, 403));
    }
    return callback({'token': token});
  });
};

module.exports = { getToken};
export {};