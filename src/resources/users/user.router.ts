import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
const User = require('./user.model.ts');
const usersService = require('./user.service.ts');
const tasksService = require("../tasks/task.service.ts");

router.route('/').get(async (_req: Request, res: Response) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users);
});

router.route('/:userId').get(async (req: Request, res: Response) => {
  const  { userId } = req.params;
  const user = await usersService.getUser(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  const newUser = await usersService.addUser(new User(req.body));
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400).json({message: 'User not created'});
  }
});

router.route('/:userId').put(async (req: Request, res: Response) => {
  const  { userId } = req.params;
  const updateUser = await usersService.updateUser(new User({ id: userId, ...req.body }));
  if (updateUser) {
    res.status(200).json(updateUser);
  } else {
    res.status(400).json({message: 'User updated'});
  }
});

router.route('/:userId').delete(async (req: Request, res: Response) => {
  const  { userId } = req.params;
  const deleteUser = await usersService.deleteUser(userId);
  await tasksService.deleteTasksFromUser(userId);
  if (deleteUser) {
    res.status(204).json({message: 'User deleted'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

module.exports = router;
