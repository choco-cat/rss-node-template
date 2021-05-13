const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users);
});

router.route('/:userid').get(async (req, res) => {
  const userId = req.params.userid;
  const user = await usersService.getUser(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.sendStatus(404).json({message: 'User not found'});
  }
});

router.route('/').post(async (req, res) => {
  const newUser = await usersService.addUser(new User(req.body));
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.sendStatus(400).json({message: 'User not created'});
  }
});

router.route('/:userid').put(async (req, res) => {
  const updateUser = await usersService.updateUser(new User({ id: req.params.userid, ...req.body }));
  if (updateUser) {
    res.status(200).json(updateUser);
  } else {
    res.sendStatus(400).json({message: 'User updated'});
  }
});

router.route('/:userid').delete(async (req, res) => {
  const deleteUser = await usersService.deleteUser(req.params.userid);
  if (deleteUser) {
    res.status(204).json({message: 'User deleted'});
  } else {
    res.sendStatus(404).json({message: 'User not found'});
  }
});

module.exports = router;
