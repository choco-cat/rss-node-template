import {NextFunction, Request, Response} from "express";

const { UNAUTHORIZED } = require('http-status-codes');
const jwt = require("jsonwebtoken");
const usersService = require("../resources/users/user.service.ts");

const checkAuthentification = (req: Request, res: Response, next: NextFunction) => {
  const {JWT_SECRET_KEY} = process.env;
  const sessionToken = `${req.headers.authorization}`.split(' ')[1];
  if (!sessionToken) {
    res.status(UNAUTHORIZED).send({auth: false, message: "Access token is missing or invalid"});
  } else {
    jwt.verify(sessionToken, JWT_SECRET_KEY, async (_err: Error, decoded: {login: string, id: string}) => {
      if (decoded) {
        const user = await usersService.loginUser(decoded.login);
        if (user) {
          next();
        } else {
          res.status(UNAUTHORIZED).send({error: "not authorized"})
        }
      }
    });
  }
}

module.exports = checkAuthentification;