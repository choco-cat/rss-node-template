const { v4: uuid } = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title,
                // eslint-disable-next-line no-unused-vars
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [...columns];
  }

}

module.exports = Board;
