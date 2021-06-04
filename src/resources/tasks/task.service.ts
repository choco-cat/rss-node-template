const tasksRepo = require('./task.memory.repository.ts');
const Task = require('./task.model.ts');

type ITask =  typeof Task;

/**
 * Returns array of tasks objects from tasksRepo
 *
 * @param {string} boardId id of board from which to select tasks
 * @returns {Promise<Array<Task>>} array of tasks
 */
const getAllTasks = async (boardId: string): Promise<ITask[]> => tasksRepo.getAll(boardId);
/**
 * Adds a new task object to array of tasks objects in tasksRepo, returns new task
 *
 * @param {Task} taskRow task to add
 * @returns {Promise<Task>} added task
 */
const addTask = async (taskRow: typeof Task): Promise<ITask> => tasksRepo.addTask(taskRow);
/**
 * Returns the task by its id
 *
 * @param {string} boardId id of board from which to select task
 * @param {string} taskId task id
 * @returns {Promise<Task>} task
 */
const getTask = async (boardId: string, taskId: string): Promise<ITask> => tasksRepo.getTask(boardId, taskId);
/**
 * Updates task data, returns updated task
 *
 * @param {Task} taskRow task to update
 * @returns {Promise<Task>} updated task
 */
const updateTask = async (taskRow: typeof Task): Promise<ITask> => tasksRepo.updateTask(taskRow);
/**
 * Deletes the task from tasksRepo
 *
 * @param {string} taskId task id
 * @returns {Promise<boolean>} Returns true if the item has been removed and false if not removed
 */
const deleteTask = async (taskId: string): Promise<boolean> => tasksRepo.deleteTask(taskId);
/**
 * Deletes all user tasks from tasksRepo
 *
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} Returns an updated array of tasks objects
 */
const deleteTasksFromUser = async (userId: string): Promise<ITask[]> => tasksRepo.deleteTasksFromUser(userId);

module.exports = { getAllTasks, addTask, getTask, updateTask, deleteTask, deleteTasksFromUser };
export {};
