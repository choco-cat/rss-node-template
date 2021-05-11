const Users = [ {id: 'sdfsfkpo34', login: 'nata', name: 'natali', password: '12345'},
  {id: 'sdfsfkpo3423s', login: 'lili',  name: 'liliya', password: '123'} ];

const getAll = async () => Users;

// eslint-disable-next-line consistent-return
const addUser = async (userRow) => {
  Users.push(userRow);
  return {id: userRow.id, login: userRow.login, name: userRow.name};
}

const getUser = async (userId) => {
  const user = Users.find((el) =>  el.id === userId);
  return user;
}

module.exports = { getAll, addUser, getUser };
