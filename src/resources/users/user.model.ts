const { v4: uuid } = require('uuid');

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
/**
 * User class
 *
 * @class
 */
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {} as IUser) {
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
  static toResponse(user: IUser): Partial<IUser> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
export {};