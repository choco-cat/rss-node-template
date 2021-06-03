const { v4: uuid } = require('uuid');

interface IBoard {
  id: string;
  title: string;
  columns: [];
}
/**
 * Board class
 *
 * @class
 */
class Board {
  id: string;

  title: string;

  columns: [];

  constructor({
    id = uuid(),
    title,
    columns = []
  } = {} as IBoard) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    /** @type {Array.<string>} */
    this.columns = [...columns];
  }
}

module.exports = Board;
export {};
