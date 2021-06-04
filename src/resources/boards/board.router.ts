import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

const router = express.Router();
const Board = require("./board.model.ts");
const boardsService = require('./board.service.ts');
const tasksService = require("../tasks/task.service.ts");
const Task = require("../tasks/task.model.ts");

type ITask =  typeof Task;

const routeGetBoards = async (_req: Request, res: Response, _next: NextFunction) => {
  const response = await boardsService.getAllBoards();
  if (response instanceof Error) {
    throw response;
  } else {
    res.status(200).json(response);
  }
}
router.route('/').get(async(req: Request, res: Response, next: NextFunction) => routeGetBoards(req, res, next).catch(next));

const routeGetBoard = async (req: Request, res: Response, _next: NextFunction) => {
  const  { boardId } = req.params;
  const response = await boardsService.getBoard(boardId);
  if (response instanceof Error) {
    throw response;
  } else {
    res.status(200).json(response);
  }
}
router.route('/:boardId').get(async (req: Request, res: Response, next: NextFunction) => routeGetBoard(req, res, next).catch(next));

const routeAddBoard = async (req: Request, res: Response, _next: NextFunction) => {
  const response = await boardsService.addBoard(new Board(req.body));
  if (response instanceof Error) {
    throw response;
  } else {
    res.status(201).json(response);
  }
}
router.route('/').post(async (req: Request, res: Response, next: NextFunction) => routeAddBoard(req, res, next).catch(next));

const routeUpdateBoard = async (req: Request, res: Response, _next: NextFunction) => {
  const  { boardId } = req.params;
  const response = await boardsService.updateBoard(new Board({ id: boardId, ...req.body }));
  if (response instanceof Error) {
    throw response;
  } else {
    res.status(200).json(response);
  }
}
router.route('/:boardId').put(async (req: Request, res: Response, next: NextFunction) => routeUpdateBoard(req, res, next).catch(next));

const routeDeleteBoard = async (req: Request, res: Response, _next: NextFunction) => {
  const  { boardId } = req.params;
  const response = await boardsService.deleteBoard(boardId);
  const tasksFromBoard = await tasksService.getAllTasks(boardId);
  await tasksFromBoard.forEach((task: ITask) => tasksService.deleteTask(task.id));
  if (response instanceof Error) {
    throw response;
  } else {
    res.status(204).json({message: 'Board deleted'});
  }
}
router.route('/:boardId').delete(async (req: Request, res: Response, next: NextFunction) => routeDeleteBoard(req, res, next).catch(next));

module.exports = router;
