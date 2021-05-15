const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require("../tasks/task.service");

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
});

router.route('/:boardid').get(async (req, res) => {
  const boardId = req.params.boardid;
  const board = await boardsService.getBoard(boardId);
  if (board) {
    res.status(200).json(board);
  } else {
    res.sendStatus(404).json({message: 'Board not found'});
  }
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.addBoard(new Board(req.body));
  if (newBoard) {
    res.status(201).json(newBoard);
  } else {
    res.sendStatus(400).json({message: 'Board not created'});
  }
});

router.route('/:boardid').put(async (req, res) => {
  const updateBoard = await boardsService.updateBoard(new Board({ id: req.params.boardid, ...req.body }));
  if (updateBoard) {
    res.status(200).json(updateBoard);
  } else {
    res.sendStatus(400).json({message: 'Board updated'});
  }
});

router.route('/:boardid').delete(async (req, res) => {
  const deleteBoard = await boardsService.deleteBoard(req.params.boardid);
  const tasksFromBoard = await tasksService.getAll(req.params.boardid);
  await tasksFromBoard.forEach((task) => tasksService.deleteTask(task.id));
  if (deleteBoard) {
    res.status(204).json({message: 'Board deleted'});
  } else {
    res.sendStatus(404).json({message: 'Board not found'});
  }
});

module.exports = router;
