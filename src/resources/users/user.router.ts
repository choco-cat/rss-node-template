import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

const router = express.Router();
const User = require('./user.model.ts');
const usersService = require('./user.service.ts');
const tasksService = require("../tasks/task.service.ts");

const routeGetUsers = async (_req: Request, res: Response, _next: NextFunction) => {
  const response = await usersService.getAll();
  if (response instanceof Error) {
    throw response;
  } else {
    res.status(200).json(response);
  }
}
router.route('/').get(async (req: Request, res: Response, next: NextFunction) => routeGetUsers(req, res, next).catch(next));

const routeGetUser = async (req: Request, res: Response, _next: NextFunction) => {
  const  { userId } = req.params;
  const response = await usersService.getUser(userId);
  if (response instanceof Error) {
    throw response;
  } else {
    res.status(200).json(response);
  }
}
router.route('/:userId').get(async (req: Request, res: Response, next: NextFunction) => routeGetUser(req, res, next).catch(next));

const routeNewUser = async (req: Request, res: Response, _next: NextFunction) => {
  const newUser = await usersService.addUser(new User(req.body));
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400).json({message: 'User not created'});
  }
}
router.route('/').post(async (req: Request, res: Response, next: NextFunction) => routeNewUser(req, res, next).catch(next));

const routeUpdateUser = async (req: Request, res: Response, _next: NextFunction) => {
  const  { userId } = req.params;
  const updateUser = await usersService.updateUser(new User({id: userId, ...req.body}));
  if (updateUser instanceof Error) {
    throw updateUser;
  } else {
    res.status(200).json(updateUser);
  }
}
router.route('/:userId').put(async (req: Request, res: Response, next: NextFunction) => routeUpdateUser(req, res, next).catch(next));

const routeDeleteUser = async (req: Request, res: Response, _next: NextFunction) => {
  const  { userId } = req.params;
  const deleteUser = await usersService.deleteUser(userId);
  await tasksService.deleteTasksFromUser(userId);
  if (deleteUser) {
    res.status(204).json({message: 'User deleted'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
}
router.route('/:userId').delete(async (req: Request, res: Response, next: NextFunction) => routeDeleteUser(req, res, next).catch(next));

module.exports = router;
