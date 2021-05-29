// @ts-nocheck
const tasksRepo = require('./task.memory.repository.ts');
/**
 * Returns array of tasks objects from tasksRepo
 *
 * @param {string} boardId id of board from which to select tasks
 * @returns {Promise<Array<Task>>} array of tasks
 */
const getAll = async (boardId) => tasksRepo.getAll(boardId);
/**
 * Adds a new task object to array of tasks objects in tasksRepo, returns new task
 *
 * @param {Task} taskRow task to add
 * @returns {Promise<Task>} added task
 */
const addTask = async (taskRow) => tasksRepo.addTask(taskRow);
/**
 * Returns the task by its id
 *
 * @param {string} boardId id of board from which to select task
 * @param {string} taskId task id
 * @returns {Promise<Task>} task
 */
const getTask = async (boardId, taskId) => tasksRepo.getTask(boardId, taskId);
/**
 * Updates task data, returns updated task
 *
 * @param {Task} taskRow task to update
 * @returns {Promise<Task>} updated task
 */
const updateTask = async (taskRow) => tasksRepo.updateTask(taskRow);
/**
 * Deletes the task from tasksRepo
 *
 * @param {string} taskId task id
 * @returns {Promise<boolean>} Returns true if the item has been removed and false if not removed
 */
const deleteTask = async (taskId) => tasksRepo.deleteTask(taskId);
/**
 * Deletes all user tasks from tasksRepo
 *
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} Returns an updated array of tasks objects
 */
const deleteTasksFromUser = async (userId) => tasksRepo.deleteTasksFromUser(userId);

module.exports = { getAll, addTask, getTask, updateTask, deleteTask, deleteTasksFromUser };
