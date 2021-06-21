import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

//const jwt = require("jsonwebtoken");

const router = express.Router();
const loginService = require('./login.service.ts');


const routeCryptPassword = async (req: Request, res: Response, _next: NextFunction) => {
  const response = await loginService.cryptPassword((req.body));
 // const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", { expiresIn: 60 * 60 * 24 });
 // console.log('req.body',req.body);
  res.status(201).json(response);
}
router.route('/').post(async (req: Request, res: Response, next: NextFunction) => routeCryptPassword(req, res, next).catch(next));

module.exports = router;
