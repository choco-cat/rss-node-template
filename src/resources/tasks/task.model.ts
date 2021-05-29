// @ts-nocheck
const { v4: uuid } = require('uuid');
/**
 * Task class
 *
 * @class
 */
class Task {
  constructor({
    boardId,
    id = uuid(),
    title,
    order,
    description,
    userId,
    columnId
  } = {}) {
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
