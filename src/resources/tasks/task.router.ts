import * as express from 'express';
import { Request, Response } from 'express';

const Task = require('./task.model.ts');
const tasksService = require('./task.service.ts');

const router = express.Router({mergeParams: true});

router.route('/').get(async (req: Request, res: Response) => {
  const  { boardId } = req.params;
  const tasks = await tasksService.getAllTasks(boardId);
  if (tasks.length > 0) {
    res.status(200).json(tasks);
  } else {
    res.status(404).json({message: 'Tasks not found'});
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const reqTask = { ...req.body, boardId };
  const newTask = await tasksService.addTask(new Task(reqTask));

  if (newTask) {
    res.status(201).json(newTask);
  } else {
    res.status(400).json({message: 'newTask not created'});
  }
});

router.route('/:taskId').get(async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getTask(boardId, taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({message: 'Task not found'});
  }
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { boardId, id } = req.params;
  const updateTask = await tasksService.updateTask(new Task({ boardId, id, ...req.body }));
  if (updateTask) {
    res.status(200).json(updateTask);
  } else {
    res.status(400).json({message: 'Task updated'});
  }
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteTask = await tasksService.deleteTask(id);
  if (deleteTask) {
    res.status(204).json({message: 'Task deleted'});
  } else {
    res.status(404).json({message: 'Task not found'});
  }
});

module.exports = router;
