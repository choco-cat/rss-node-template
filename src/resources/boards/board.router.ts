import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

const router = express.Router();
const Board = require("./board.model.ts");
const boardsService = require('./board.service.ts');
const tasksService = require("../tasks/task.service.ts");
const Task = require("../tasks/task.model.ts");

type ITask =  typeof Task;

router.route('/').get(async (_req: Request, res: Response) => {
  const boards = await boardsService.getAllBoards();
  res.status(200).json(boards);
});

const routeGetBoard = async (req: Request, res: Response, _next: NextFunction) => {
  const  { boardId } = req.params;
  const board = await boardsService.getBoard(boardId);
  if (board instanceof Error) {
    throw board;
  } else {
    res.status(200).json(board);
  }
};

router.route('/:boardId').get(async (req: Request, res: Response, next: NextFunction) => routeGetBoard(req, res, next).catch(next));

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.addBoard(new Board(req.body));
  if (newBoard) {
    res.status(201).json(newBoard);
  } else {
    res.sendStatus(400).json({message: 'Board not created'});
  }
});

router.route('/:boardId').put(async (req, res) => {
  const  { boardId } = req.params;
  const updateBoard = await boardsService.updateBoard(new Board({ id: boardId, ...req.body }));
  if (updateBoard) {
    res.status(200).json(updateBoard);
  } else {
    res.sendStatus(400).json({message: 'Board updated'});
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const  { boardId } = req.params;
  const deleteBoard = await boardsService.deleteBoard(boardId);
  const tasksFromBoard = await tasksService.getAllTasks(boardId);
  await tasksFromBoard.forEach((task: ITask) => tasksService.deleteTask(task.id));
  if (deleteBoard) {
    res.status(204).json({message: 'Board deleted'});
  } else {
    res.sendStatus(404).json({message: 'Board not found'});
  }
});

module.exports = router;
