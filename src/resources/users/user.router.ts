import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

const router = express.Router({mergeParams: true});
const User = require('../../entities/User.ts');
const usersService = require('./user.service.ts');
const tasksService = require('../tasks/task.service.ts');

const routeGetUsers = async (_req: Request, res: Response, _next: NextFunction) => {
  const response = await usersService.getAll();
  res.status(200).json(response);
}
router.route('/').get(async (req: Request, res: Response, next: NextFunction) => routeGetUsers(req, res, next).catch(next));

const routeGetUser = async (req: Request, res: Response, _next: NextFunction) => {
  const  { userId } = req.params;
  const response = await usersService.getUser(userId);
  res.status(200).json(response);
}
router.route('/:userId').get(async (req: Request, res: Response, next: NextFunction) => routeGetUser(req, res, next).catch(next));

const routeNewUser = async (req: Request, res: Response, _next: NextFunction) => {
  const response = await usersService.addUser(new User(req.body));
  res.status(201).json(response);
}
router.route('/').post(async (req: Request, res: Response, next: NextFunction) => routeNewUser(req, res, next).catch(next));

const routeUpdateUser = async (req: Request, res: Response, _next: NextFunction) => {
  const  { userId } = req.params;
  const response = await usersService.updateUser(new User({id: userId, ...req.body}));
  res.status(200).json(response);
}
router.route('/:userId').put(async (req: Request, res: Response, next: NextFunction) => routeUpdateUser(req, res, next).catch(next));

const routeDeleteUser = async (req: Request, res: Response, _next: NextFunction) => {
  const  { userId } = req.params;
  await usersService.deleteUser(userId);
  await tasksService.deleteTasksFromUser(userId);
  res.status(204).json({message: 'User deleted'});
}
router.route('/:userId').delete(async (req: Request, res: Response, next: NextFunction) => routeDeleteUser(req, res, next).catch(next));

module.exports = router;
