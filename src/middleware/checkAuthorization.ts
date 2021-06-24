import {NextFunction, Request, Response} from "express";

const jwt = require("jsonwebtoken");
const usersService = require("../resources/users/user.service.ts");

const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const {JWT_SECRET_KEY} = process.env;
  const sessionToken = `${req.headers.authorization}`.split(' ')[1];
  console.log("sessionToken", sessionToken);
  if (!sessionToken) {
    res.status(401).send({auth: false, message: "Access token is missing or invalidNo token provided"});
  } else {
    jwt.verify(sessionToken, JWT_SECRET_KEY, async (_err: Error, decoded: {login: string, id: string}) => {
      if (decoded) {
        const user = await usersService.loginUser(decoded.login);
        if (user) {
          console.log('user authorized');
          next();
        }
        else {
          res.status(401).send({error: "not authorized"})
        }
      }
    });
  }
}

module.exports = checkAuthorization;
