const Users = [];
const User = require('./user.model');

const getAll = async () => Users.map(User.toResponse);

const addUser = async (userRow) => {
  Users.push(userRow);
  return User.toResponse(userRow);
}

const getUser = async (userId) => {
  const user = Users.find((el) =>  el.id === userId);
  return User.toResponse(user);
}

const updateUser = async (userRow) => {
  const user = Users.find((el) =>  el.id === userRow.id);
  if (user !== undefined) {
    user.name = userRow.name;
    user.login = userRow.login;
    user.password = userRow.password;
  }
  return User.toResponse(user);
}

const deleteUser = async (userId) => {
  const user = Users.find((el) => el.id === userId);
  const index = Users.indexOf(user);
  if (index > -1) {
    Users.splice(index, 1);
  }
  return index !== -1 ;
}

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
