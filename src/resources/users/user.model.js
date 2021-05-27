const { v4: uuid } = require('uuid');
/**
 * User class
 *
 * @class
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
   * @param {User} user user object
   * @returns {{id: *, name: *, login: *}} user object without password
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
