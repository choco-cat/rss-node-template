const tasksRepo = require('./task.memory.repository');
/**
 * Returns array of tasks objects from tasksRepo
 * @param boardId {string} id of board from which to select tasks
 * @returns {Array.<Task>}
 */
const getAll = (boardId) => tasksRepo.getAll(boardId);
/**
 * Adds a new task object to array of tasks objects in tasksRepo, returns new task
 * @param {Task} taskRow task to add
 * @returns {Task}
 */
const addTask = (taskRow) => tasksRepo.addTask(taskRow);
/**
 * Returns the task by its id
 * @param {string} boardId id of board from which to select task
 * @param {string} TaskId task id
 * @returns {Task} task
 */
const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);
/**
 * Updates task data, returns updated task
 * @param {Task} taskRow task to update
 * @returns {Task}
 */
const updateTask = (taskRow) => tasksRepo.updateTask(taskRow);
/**
 * Deletes the task from tasksRepo
 * @param {string} TaskId task id
 * @returns {boolean} Returns true if the item has been removed and false if not removed
 */
const deleteTask = (taskId) => tasksRepo.deleteTask(taskId);
/**
 * Deletes all user tasks from tasksRepo
 * @param {string} userId user id
 * @returns {Array.<Task>} Returns an updated array of tasks objects
 */
const deleteTasksFromUser = (userId) => tasksRepo.deleteTasksFromUser(userId);

module.exports = { getAll, addTask, getTask, updateTask, deleteTask, deleteTasksFromUser };
