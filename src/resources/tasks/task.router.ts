import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

const Task = require('./task.model.ts');
const tasksService = require('./task.service.ts');

const router = express.Router({mergeParams: true});

router.route('/').get(async (req: Request, res: Response) => {
  const  { boardId } = req.params;
  const response = await tasksService.getAllTasks(boardId);
  res.status(200).json(response);
});
const routeAddTask = async (req: Request, res: Response, _next: NextFunction) => {
  const { boardId } = req.params;
  const reqTask = { ...req.body, boardId };
  const response = await tasksService.addTask(new Task(reqTask));
  res.status(201).json(response);
}
router.route('/').post(async (req: Request, res: Response, next: NextFunction) => routeAddTask(req, res, next).catch(next));

const routeGetTask = async (req: Request, res: Response, _next: NextFunction) => {
  const { boardId, taskId } = req.params;
  console.log(req.params);
  const response = await tasksService.getTask(boardId, taskId);
  res.status(200).json(response);
}
router.route('/:taskId').get(async (req: Request, res: Response, next: NextFunction) => routeGetTask(req, res, next).catch(next));

const routeUpdateTask = async (req: Request, res: Response, _next: NextFunction) => {
  const { boardId, id } = req.params;
  const response = await tasksService.updateTask(new Task({ boardId, id, ...req.body }));
  res.status(200).json(response);
}
router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => routeUpdateTask(req, res, next).catch(next));

const routeDeleteTask = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await tasksService.deleteTask(id);
  res.status(204).json({message: 'Task deleted'});
}
router.route('/:id').delete(async (req: Request, res: Response, next: NextFunction) => routeDeleteTask(req, res, next).catch(next));

module.exports = router;
