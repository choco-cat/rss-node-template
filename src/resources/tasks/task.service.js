const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const addTask = (taskRow) => tasksRepo.addTask(taskRow);

const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const updateTask = (taskRow) => tasksRepo.updateTask(taskRow);

const deleteTask = (taskId) => tasksRepo.deleteTask(taskId);

module.exports = { getAll, addTask, getTask, updateTask, deleteTask };
