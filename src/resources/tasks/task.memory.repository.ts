const Task = require('./task.model.ts');
const ValidationError = require("../../middleware/validationError.ts");

type ITask =  typeof Task;
let Tasks: ITask[] = [];
/**
 * Returns all tasks
 *
 * @param {string} boardId id of board from which to select task
 * @returns {Promise<Array.<Task>>} array of tasks objects
 */
const getAll = async (boardId: string): Promise<ITask[]> => {
  if (!Array.isArray(Tasks)) {
    throw new ValidationError('Server error', '500');
  }
  return Tasks.filter((el) => el.boardId === boardId);
}
/**
 * Adds a new task object to array of tasks objects, returns new task
 *
 * @param {Task} taskRow task to add
 * @returns {Promise<Task>} task new object
 */
const addTask = async (taskRow: ITask): Promise<ITask> => {
  if (!Array.isArray(Tasks)) {
    throw new ValidationError('Server error', '500');
  }
  Tasks.push(taskRow);
  return taskRow;
}
/**
 * Returns the task by its id
 *
 * @param {string} boardId id of board from which to select task
 * @param {string} taskId task id
 * @returns {Promise<Task>} task object
 */
const getTask = async (boardId: string, taskId: string): Promise<ITask> => {
  const task = Tasks.find((el) =>  el.id === taskId && el.boardId === boardId) || null;
  if (!task) {
    throw new ValidationError(`Task with id = ${taskId} not found`, '404');
  }
  return task;
}
/**
 * Deletes all user tasks
 *
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} An updated array of tasks objects
 */
const deleteTasksFromUser = async (userId: string): Promise<ITask[]> => {
  if (!Array.isArray(Tasks)) {
    throw new ValidationError('Server error', '500');
  }
  Tasks = Tasks.map((el) =>  el.userId === userId ? { ...el, userId: null } : el);
  return Tasks;
}
/**
 * Updates task data, returns updated task
 *
 * @param {Task} taskRow task to update
 * @returns {Promise<Task>} updated task
 */
const updateTask = async (taskRow: ITask): Promise<ITask> => {
  const task = Tasks.find((el) =>  el.id === taskRow.id && el.boardId === taskRow.boardId) || null;
  if (!task) {
    throw new ValidationError(`Task with id = ${taskRow.id} not found`, '404');
  }
  if (task !== undefined) {
    task.title = taskRow.title;
    task.order = taskRow.order;
    task.description = taskRow.description;
    task.userId = taskRow.userId;
    task.columnId = taskRow.columnId;
  }
  return task;
}
/**
 * Deletes the task
 *
 * @param {string} taskId task id
 * @returns {Promise<boolean>} Returns true if the item has been removed and false if not removed
 */
const deleteTask = async (taskId: string): Promise<boolean> => {
  const task = Tasks.find((el) =>  el.id === taskId);
  if (!task) {
    throw new ValidationError(`Task with id = ${taskId} not found`, '404');
  }
  const index = Tasks.indexOf(task);
  if (index > -1) {
    Tasks.splice(index, 1);
  }
  return index !== -1 ;
}

module.exports = { getAll, addTask, getTask, updateTask, deleteTask, deleteTasksFromUser };
export {};
