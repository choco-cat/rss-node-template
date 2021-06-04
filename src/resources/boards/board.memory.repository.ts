const Board = require('./board.model.ts');
const ValidationError = require("../../middleware/validationError.ts");

type IBoard =  typeof Board;
const Boards: IBoard[] = [];

/**
 * Returns all boards
 *
 * @returns {Promise<Array<Board>>} array of boards objects
 */
const getAll = async (): Promise<IBoard[]> => {
  if (!Array.isArray(Boards)) {
    throw new ValidationError('Server error', '500');
  }
  return Boards;
}
/**
 * Adds a new board object to array of boards objects, returns new board
 *
 * @param {Board} boardRow board to add
 * @returns {Promise<Board>} board object
 */
const addBoard = async (boardRow: IBoard): Promise<IBoard> => {
  if (!Array.isArray(Boards)) {
    throw new ValidationError('Server error', '500');
  }
  Boards.push(boardRow);
  return boardRow;
}
/**
 * Returns the board by its id
 *
 * @param {string} boardId board id
 * @returns {Promise<Board>} board object
 */
const getBoard = async (boardId: string): Promise<IBoard> => {
  const board = Boards.find((el) =>  el.id === boardId) || null;
  if (!board) {
    throw new ValidationError(`Board with id = ${boardId} not found`, '404');
  }
  return board;
}
/**
 * Updates board data, returns updated board
 *
 * @param {Board} boardRow changed board
 * @returns {Promise<Board>} updated board
 */
const updateBoard = async (boardRow: IBoard): Promise<IBoard> => {
  const board = await Boards.find((el) =>  el.id === boardRow.id) || null;
  if (!board) {
    throw new ValidationError(`Board with id = ${boardRow.id} not found`, '404');
  }
  if (board !== null && (typeof board === "object")) {
    board.title = boardRow.title;
    board.columns = [...boardRow.columns]
  }
  return board;
}
/**
 * Deletes the board
 *
 * @param {string} boardId board id
 * @returns {Promise<boolean>} returns true if the item has been removed and false if not removed
 */
const deleteBoard = async (boardId: string): Promise<boolean> => {
  const index = Boards.findIndex((el) => el.id === boardId);
  if (index === -1) {
    throw new ValidationError(`Board with id = ${boardId} not found`, '404');
  }
  Boards.splice(index, 1);
  return index !== -1 ;
}

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
export {};
