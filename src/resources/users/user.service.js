const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const addUser = (userRow) => usersRepo.addUser(userRow);

const getUser = (userId) => usersRepo.getUser(userId);

const updateUser = (userRow) => usersRepo.updateUser(userRow);

const deleteUser = (userId) => usersRepo.deleteUser(userId);

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
