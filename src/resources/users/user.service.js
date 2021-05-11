const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const addUser = (userRow) => usersRepo.addUser(userRow);

const getUser = (userId) => usersRepo.getUser(userId);

module.exports = { getAll, addUser, getUser };
