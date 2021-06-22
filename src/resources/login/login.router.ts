import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import {getRepository} from "typeorm";

const router = express.Router();
const loginService = require('./login.service.ts');
const User = require('../../entities/User.ts');

type IUser =  typeof User;

const routeGetToken = async (req: Request, res: Response, next: NextFunction) => {
  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne({login: req.body.login}) as IUser;
  loginService.getToken(user, req.body.password, (response: string, err: Error) => {
    if (err) {
      next(err);
      return;
    }
    res.status(201).json(response);
  });
}
router.route('/').post(async (req: Request, res: Response, next: NextFunction) => routeGetToken(req, res, next).catch(next));

module.exports = router;
export {};
