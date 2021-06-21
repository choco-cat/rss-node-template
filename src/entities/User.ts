import { Entity, PrimaryColumn, Column } from "typeorm";

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
@Entity({name: 'user'})
export class User implements IUser{
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { length: 35, nullable: true })
  name: string;

  @Column('varchar', { length: 35, nullable: true })
  login: string;

  @Column('varchar', { length: 45, nullable: true})
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