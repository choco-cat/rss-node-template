import {getRepository} from "typeorm";

const { NOT_FOUND } = require('http-status-codes');
const Task = require('../../entities/Task.ts');
const ValidationError = require("../../middleware/validationError.ts");

type ITask =  typeof Task;

/**
 * Returns all tasks
 *
 * @param {string} boardId id of board from which to select task
 * @returns {Promise<Array.<Task>>} array of tasks objects
 */
const getAll = async (boardId: string): Promise<ITask[]> => {
  const tasksRepository = getRepository(Task);
  const allTasks = await tasksRepository.find({ boardId });
  return allTasks;
}
/**
 * Adds a new task object to array of tasks objects, returns new task
 *
 * @param {Task} taskRow task to add
 * @returns {Promise<Task>} task new object
 */
const addTask = async (taskRow: ITask): Promise<ITask> => {
  const tasksRepository = getRepository(Task);
  const newTask = await tasksRepository.create(taskRow);
  const saveTask = await tasksRepository.save(newTask);
  return saveTask;
}
/**
 * Returns the task by its id
 *
 * @param {string} boardId id of board from which to select task
 * @param {string} taskId task id
 * @returns {Promise<Task>} task object
 */
const getTask = async (boardId: string, taskId: string): Promise<ITask> => {
  const tasksRepository = getRepository(Task);
  const findTask = await tasksRepository.findOne({boardId, id: taskId});
  if(!findTask) {
    throw new ValidationError(`Task with id = ${taskId} not found`, NOT_FOUND);
  }
  return findTask;
}
/**
 * Deletes all user tasks
 *
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} An updated array of tasks objects
 */
const deleteTasksFromUser = async (userId: string): Promise<void> => {
  const tasksRepository = getRepository(Task);
  const tasksFromUser = await tasksRepository.find({userId});
  await Promise.all(tasksFromUser.map(async (el: ITask) => {
    await tasksRepository.update(el.id, {...el, userId: null});
  }));
}
/**
 * Updates task data, returns updated task
 *
 * @param {Task} taskRow task to update
 * @returns {Promise<Task>} updated task
 */
const updateTask = async (taskRow: ITask): Promise<ITask> => {
  const tasksRepository = getRepository(Task);
  await tasksRepository.update(taskRow.id, taskRow);
  const findTask = await tasksRepository.findOne(taskRow.id);
  return findTask;
}
/**
 * Deletes the task
 *
 * @param {string} taskId task id
 * @returns {Promise<boolean>} Returns true if the item has been removed and false if not removed
 */
const deleteTask = async (taskId: string): Promise<boolean> => {
  const tasksRepository = getRepository(Task);
  const deletionRes = await tasksRepository.delete({ id: taskId });
  if (!deletionRes.affected) {
    throw new ValidationError(`Task with id = ${taskId} not found`, NOT_FOUND);
  }
  return !!deletionRes.affected;
}

module.exports = { getAll, addTask, getTask, updateTask, deleteTask, deleteTasksFromUser };
export {};
