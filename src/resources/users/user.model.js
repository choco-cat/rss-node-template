const { v4: uuid } = require('uuid');
/**
 * User class
 * @constructor
 */
class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.name = name;
    /** @type {string} */
    this.login = login;
    /** @type {string} */
    this.password = password;
  }

  /**
   * @param {User} user
   * @returns {{id: *, name: *, login: *}}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
