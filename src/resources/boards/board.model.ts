const { v4: uuid } = require('uuid');

interface IBoard {
  id: string;
  title: string;
  columns: string[];
}
/**
 * Board class
 *
 * @class
 */
class Board {
  id: string;

  title: string;

  columns: string[];

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
