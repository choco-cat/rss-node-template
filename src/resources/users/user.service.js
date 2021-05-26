const usersRepo = require('./user.memory.repository');
/**
 * Returns all users
 * @returns {Array.<User>} array of users objects
 */
const getAll = () => usersRepo.getAll();
/**
 * Adds a new user object to array of users objects, returns new user
 * @param {User} userRow user to add
 * @returns {{name: string, id: string, login: string}} New user data without password
 */
const addUser = (userRow) => usersRepo.addUser(userRow);
/**
 * Returns the user by its id
 * @param {string} userId user id
 * @returns {{name: string, id: string, login: string}} New user data without password
 */
const getUser = (userId) => usersRepo.getUser(userId);
/**
 * Updates user data, returns updated user
 * @param {User} userRow user to update
 * @returns {{name: string, id: string, login: string}} New user data without password
 */
const updateUser = (userRow) => usersRepo.updateUser(userRow);
/**
 * Deletes the user
 * @param {string} UserId user id
 * @returns {boolean} Returns true if the user has been removed and false if not removed
 */
const deleteUser = (userId) => usersRepo.deleteUser(userId);

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
