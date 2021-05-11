const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:userid').get(async (req, res) => {
  const userId = req.params.userid;
  const user = await usersService.getUser(userId);
  if (user === undefined) {
    res.status(404);
  }
  res.json(user);
});

router.route('/').post(async (req, res) => {
  const newUser = await usersService.addUser(new User(req.body));
  res.status(201).json(newUser);
});

module.exports = router;
