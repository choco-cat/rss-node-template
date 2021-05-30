const User = require('./user.model.ts');

type IUser =  typeof User;
const Users: IUser[] = [];

/**
 * Returns all users
 *
 * @returns {Promise<Array<User>>} array of users objects
 */
const getAll = async (): Promise<IUser[]> => Users.map(User.toResponse);
/**
 * Adds a new user object to array of users objects, returns new user
 *
 * @param {User} userRow user to add
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const addUser = async (userRow: IUser): Promise<IUser> => {
  Users.push(userRow);
  return User.toResponse(userRow);
}
/**
 * Returns the user by its id
 *
 * @param {string} userId user id
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const getUser = async (userId: string): Promise<Partial<IUser>> => {
  const user = Users.find((el) =>  el.id === userId);
  return User.toResponse(user);
}
/**
 * Updates user data, returns updated user
 *
 * @param {User} userRow user to update
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const updateUser = async (userRow: IUser) => {
  const user = Users.find((el) =>  el.id === userRow.id) || {};
    user.name = userRow.name;
    user.login = userRow.login;
    user.password = userRow.password;
  return User.toResponse(user);
}
/**
 * Deletes the user
 *
 * @param {string} userId user id
 * @returns {Promise<boolean>} Returns true if the user has been removed and false if not removed
 */
const deleteUser = async (userId: string): Promise<boolean> => {
  const user = Users.find((el) => el.id === userId);
  const index = Users.indexOf(user);
  if (index > -1) {
    Users.splice(index, 1);
  }
  return index !== -1 ;
}

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
