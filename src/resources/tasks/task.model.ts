const { v4: uuid } = require('uuid');

interface ITask {
  boardId: string;
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
}
/**
 * Task class
 *
 * @class
 */
class Task {
  boardId: string;

  id: string;

  title: string;

  order: number;

  description: string;

  userId: string;

  columnId: string;

  constructor({
    boardId,
    id = uuid(),
    title,
    order,
    description,
    userId,
    columnId
  } = {} as ITask) {
    /** @type {string} */
    this.boardId = boardId;
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    /** @type {number} */
    this.order = order;
    /** @type {string} */
    this.description = description;
    /** @type {string} */
    this.userId = userId;
    /** @type {string} */
    this.columnId = columnId;
  }
}

module.exports = Task;
export {};
