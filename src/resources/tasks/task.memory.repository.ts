// @ts-nocheck
let Tasks = [];
/**
 * Returns all tasks
 *
 * @param {string} boardId id of board from which to select task
 * @returns {Promise<Array.<Task>>} array of tasks objects
 */
const getAll = async (boardId) => Tasks.filter((el) => el.boardId === boardId)
/**
 * Adds a new task object to array of tasks objects, returns new task
 *
 * @param {Task} taskRow task to add
 * @returns {Promise<Task>} task new object
 */
const addTask = async (taskRow) => {
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
const getTask = async (boardId, taskId) => {
  const task = Tasks.find((el) =>  el.id === taskId && el.boardId === boardId);
  return task;
}
/**
 * Deletes all user tasks
 *
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} An updated array of tasks objects
 */
const deleteTasksFromUser = async (userId) => {
  Tasks = Tasks.map((el) =>  el.userId === userId ? { ...el, userId: null } : el);
  return Tasks;
}
/**
 * Updates task data, returns updated task
 *
 * @param {Task} taskRow task to update
 * @returns {Promise<Task>} updated task
 */
const updateTask = async (taskRow) => {
  const task = Tasks.find((el) =>  el.id === taskRow.id && el.boardId === taskRow.boardId);
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
const deleteTask = async (taskId) => {
  const task = Tasks.find((el) =>  el.id === taskId);
  const index = Tasks.indexOf(task);
  if (index > -1) {
    Tasks.splice(index, 1);
  }
  return index !== -1 ;
}

module.exports = { getAll, addTask, getTask, updateTask, deleteTask, deleteTasksFromUser };
