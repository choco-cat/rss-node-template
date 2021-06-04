const User = require('./user.model.ts');
const ValidationError = require("../../middleware/validationError.ts");

type IUser =  typeof User;
const Users: IUser[] = [];

/**
 * Returns all users
 *
 * @returns {Promise<Array<User>>} array of users objects
 */
const getAll = async (): Promise<IUser[]> => {
  if (!Array.isArray(Users)) {
    throw new ValidationError('Server error', '500');
  }
  return Users.map(User.toResponse);
}

/**
 * Adds a new user object to array of users objects, returns new user
 *
 * @param {User} userRow user to add
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const addUser = async (userRow: IUser): Promise<IUser> => {
  if (!Array.isArray(Users)) {
    throw new ValidationError('Server error', '500');
  }
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
  const user = Users.find((el) =>  el.id === userId) || null;
  if (!user) {
    throw new ValidationError(`User with id = ${userId} not found`, '404');
  }
  return User.toResponse(user);
}
/**
 * Updates user data, returns updated user
 *
 * @param {User} userRow user to update
 * @returns {Promise<{name: string, id: string, login: string}>} New user data without password
 */
const updateUser = async (userRow: IUser) => {
  const user = Users.find((el) =>  el.id === userRow.id) || null;
  if (!user) {
    throw new ValidationError(`User with id = ${userRow.id} not found`, '404');
  }
  if (user !== null && (typeof user === "object")) {
    user.name = userRow.name;
    user.login = userRow.login;
    user.password = userRow.password;
  }
  return User.toResponse(user);
}
/**
 * Deletes the user
 *
 * @param {string} userId user id
 * @returns {Promise<boolean>} Returns true if the user has been removed and false if not removed
 */
const deleteUser = async (userId: string): Promise<boolean> => {
  const user = Users.find((el) => el.id === userId) || null;
  if (!user) {
    throw new ValidationError(`User with id = ${userId} not found`, '404');
  }
  const index = Users.indexOf(user);
  if (index > -1) {
    Users.splice(index, 1);
  }
  return index !== -1 ;
}

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
export {};
