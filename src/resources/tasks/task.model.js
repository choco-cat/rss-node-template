const { v4: uuid } = require('uuid');

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
    this.boardId = boardId;
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
  }
}

module.exports = Task;
