// @ts-nocheck
const usersRepo = require('./user.memory.repository.ts');
/**
 * Returns all users
 *
 * @returns {Promise<Array<User>>} array of users objects
 */
const getAll = async () => usersRepo.getAll();
/**
 * Adds a new user object to array of users objects, returns new user
 *
 * @param {User} userRow user to add
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const addUser = async (userRow) => usersRepo.addUser(userRow);
/**
 * Returns the user by its id
 *
 * @param {string} userId user id
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const getUser = async (userId) => usersRepo.getUser(userId);
/**
 * Updates user data, returns updated user
 *
 * @param {User} userRow user to update
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const updateUser = async (userRow) => usersRepo.updateUser(userRow);
/**
 * Deletes the user
 *
 * @param {string} UserId user id
 * @param userId
 * @returns {Promise<boolean>} Returns true if the user has been removed and false if not removed
 */
const deleteUser = async (userId) => usersRepo.deleteUser(userId);

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
