import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import {getRepository} from "typeorm";

const { CREATED } = require('http-status-codes');
const loginService = require('./login.service.ts');
const User = require('../../entities/User.ts');

const router = express.Router();
type IUser =  typeof User;

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne({login: req.body.login}) as IUser;
  loginService.getToken(user, req.body.password, (response: string, err: Error) => {
    if (err) {
      next(err);
      return;
    }
    res.status(CREATED).json({ 'token': response });
  });
});

module.exports = router;
export {};
