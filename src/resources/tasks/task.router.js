const router = require('express').Router({mergeParams: true});
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const  { boardId } = req.params;

  console.log('==================================================', boardId);
  const tasks = await tasksService.getAll(boardId);
  res.status(200).json(tasks);
  if (tasks.length > 0) {
    res.status(200).json(tasks);
  } else {
    res.sendStatus(404).json({message: 'Tasks not found'});
  }
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const reqTask = { ...req.body, boardId };
  const newTask = await tasksService.addTask(new Task(reqTask));

  if (newTask) {
    res.status(201).json(newTask);
  } else {
    res.sendStatus(400).json({message: 'newTask not created'});
  }
});

router.route('/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getTask(boardId, taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.sendStatus(404).json({message: 'Task not found'});
  }
});

router.route('/:id').put(async (req, res) => {
  const { boardId, id } = req.params;
  const updateTask = await tasksService.updateTask(new Task({ boardId, id, ...req.body }));
  if (updateTask) {
    res.status(200).json(updateTask);
  } else {
    res.sendStatus(400).json({message: 'Task updated'});
  }
});

router.route('/:id').delete(async (req, res) => {
  const deleteTask = await tasksService.deleteTask(req.params.id);
  if (deleteTask) {
    res.status(204).json({message: 'Task deleted'});
  } else {
    res.sendStatus(404).json({message: 'Task not found'});
  }
});

module.exports = router;
