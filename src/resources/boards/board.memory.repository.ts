import {getRepository} from "typeorm";

const { NOT_FOUND } = require('http-status-codes');

const Board = require('../../entities/Board.ts');
const Columnboard = require('../../entities/Columnboard.ts');

type IColumn =  typeof Columnboard;

const ValidationError = require("../../middleware/validationError.ts");

type IBoard =  typeof Board;


/**
 * Returns all boards
 *
 * @returns {Promise<Array<Board>>} array of boards objects
 */

const getAll = async (): Promise<IBoard[]> => {
  const boardsRepository = getRepository(Board);
  const allBoards = await boardsRepository.find();
    const columnsRepository = getRepository(Columnboard);
    return Promise.all(allBoards.map(async (brd: IBoard) => {
      const columns1 = await columnsRepository.find({board: brd});
      const columns2 = Columnboard.toResponse(columns1);
      const nBoard = new Board(brd);
      nBoard.columns = [...columns2];
      return nBoard;
    }));
}
/**
 * Adds a new board object to array of boards objects, returns new board
 *
 * @param {Board} boardRow board to add
 * @returns {Promise<Board>} board object
 */
const addColumns = (boardRow: IBoard): void => {
  const columnsRepository = getRepository(Columnboard);
  Promise.all(boardRow.columns.map(async (column: IColumn) => {
    const newColumn = await columnsRepository.create({...column, board: boardRow});
    await columnsRepository.save(newColumn);
  })).then();
}

const addBoard = async (boardRow: IBoard): Promise<IBoard> => {
  const boardsRepository = getRepository(Board);
  const newBoard = await boardsRepository.create(boardRow);
  const saveBoard = await boardsRepository.save(newBoard);
  await addColumns({...saveBoard, columns: [...boardRow.columns]});
  const res = {...saveBoard, columns: [...boardRow.columns] };

  return res;
}
/**
 * Returns the board by its id
 *
 * @param {string} boardId board id
 * @returns {Promise<Board>} board object
 */
const getBoard = async (boardId: string): Promise<IBoard> => {
  const boardsRepository = getRepository(Board);
  const columnsRepository = getRepository(Columnboard);
  const findBoard = await boardsRepository.findOne(boardId) as IBoard;
  if(!findBoard) {
    throw new ValidationError(`Board with id = ${boardId} not found`, NOT_FOUND);
  }
  const columns1 = await columnsRepository.find({board: findBoard});
  return {...findBoard, columns: Columnboard.toResponse(columns1)} ;
}

/**
 * Updates board data, returns updated board
 *
 * @param {Board} boardRow changed board
 * @returns {Promise<Board>} updated board
 */
const updateBoard = async (boardRow: IBoard): Promise<IBoard> => {
  const boardsRepository = getRepository(Board);
  const findBoard = await boardsRepository.findOne(boardRow.id) as IBoard;
  if(!findBoard) {
    throw new ValidationError(`Board with id = ${boardRow.id} not found`, NOT_FOUND);
  }

  const columnsRepository = getRepository(Columnboard);
  await columnsRepository.delete({ board: findBoard });
  await addColumns(boardRow);
  await boardsRepository.update(boardRow.id, { title: boardRow.title });
  return {...findBoard, columns: [...boardRow.columns]};
}
/**
 * Deletes the board
 *
 * @param {string} boardId board id
 * @returns {Promise<boolean>} returns true if the item has been removed and false if not removed
 */

const deleteBoard = async (boardId: string): Promise<boolean> => {
  const boardsRepository = getRepository(Board);
  const findBoard = await boardsRepository.findOne({id: boardId});
  if (findBoard === undefined) {
    throw new ValidationError(`Board not found`, NOT_FOUND);
  }

  const columnsRepository = getRepository(Columnboard);
  await columnsRepository.delete({board: findBoard});
  const deletionRes = await boardsRepository.delete(boardId);

  if (!deletionRes.affected) {
    throw new ValidationError(`Board with id = ${boardId} not deleted`, NOT_FOUND);
  }

  return !!deletionRes.affected;
};

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
export {};
