import { getRepository } from "typeorm";

const { NOT_FOUND } = require('http-status-codes');
const User = require('../../entities/User.ts');
const ValidationError = require("../../middleware/validationError.ts");

type IUser =  typeof User;

/**
 * Returns all users
 *
 * @returns {Promise<Array<User>>} array of users objects
 */
const getAll = async (): Promise<IUser[]> => {
  const usersRepository = getRepository(User);
  const allUsers = await usersRepository.find();
  return allUsers;
}
/**
 * Adds a new user object to array of users objects, returns new user
 *
 * @param {User} userRow user to add
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const addUser = async (userRow: IUser): Promise<IUser> => {
  const usersRepository = getRepository(User);
  const newStudent = await usersRepository.create(userRow);
  const saveStudent = await usersRepository.save(newStudent);
  return User.toResponse(saveStudent);
}
/**
 * Returns the user by its id
 *
 * @param {string} userId user id
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const getUser = async (userId: string): Promise<Partial<IUser>> => {
  const usersRepository = getRepository(User);
  const findUser = await usersRepository.findOne(userId);
  if(!findUser) {
    throw new ValidationError(`User with id = ${userId} not found`, NOT_FOUND);
  }
  return User.toResponse(findUser);
}
/**
 * Updates user data, returns updated user
 *
 * @param {User} userRow user to update
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const updateUser = async (userRow: IUser) => {
  const usersRepository = getRepository(User);
  await usersRepository.update(userRow.id, { name: userRow.name, login: userRow.login, password: userRow.password } );
  const findUser = await usersRepository.findOne(userRow.id);
  if(!findUser) {
    throw new ValidationError(`User with id = ${userRow.id} not found`, NOT_FOUND);
  }
  return User.toResponse(findUser);
}
/**
 * Deletes the user
 *
 * @param {string} userId user id
 * @returns {Promise<boolean>} Returns true if the user has been removed and false if not removed
 */
const deleteUser = async (userId: string): Promise<boolean> => {
  const usersRepository = getRepository(User);
  const deletionRes = await usersRepository.delete(userId);
  if (!deletionRes.affected) {
    throw new ValidationError(`User with id = ${userId} not found`, NOT_FOUND);
  }
  return !!deletionRes.affected;
}

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
export {};
