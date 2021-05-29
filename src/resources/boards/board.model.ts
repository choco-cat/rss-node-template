// @ts-nocheck
const { v4: uuid } = require('uuid');
/**
 * Board class
 *
 * @class
 */
class Board {
  constructor({
    id = uuid(),
    title,
    columns = []
  } = {}) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    /** @type {Array.<string>} */
    this.columns = [...columns];
  }
}

module.exports = Board;
