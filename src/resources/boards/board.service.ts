const boardsRepo = require('./board.memory.repository.ts');
const Board = require('./board.model.ts');

type IBoard =  typeof Board;
/**
 * Returns array of boards objects from boardsRepo
 *
 * @returns {Promise<Array<Board>>} Array of boards objects
 */
const getAllBoards = async (): Promise<IBoard[]> => boardsRepo.getAll();
/**
 * Adds a new board object to array of boards objects in boardsRepo, returns new board
 *
 * @param {Board} boardRow board to add
 * @returns {Promise<Board>} added board
 */
const addBoard = async (boardRow: IBoard): Promise<IBoard> => boardsRepo.addBoard(boardRow);
/**
 * Returns the board by its id
 *
 * @param {string} boardId board id
 * @returns {Promise<Board>} board
 */
const getBoard = async (boardId: string): Promise<IBoard> => boardsRepo.getBoard(boardId);
/**
 * Updates board data, returns updated board
 *
 * @param {Board} boardRow board to update
 * @returns {Promise<Board>} updated board
 */
const updateBoard = async (boardRow: IBoard): Promise<IBoard> => boardsRepo.updateBoard(boardRow);
/**
 * Deletes the board from boardsRepo
 *
 * @param {string} boardId board id
 * @returns {Promise<boolean>} Returns true if the item has been removed and false if not removed
 */
const deleteBoard = async (boardId: string): Promise<boolean> => boardsRepo.deleteBoard(boardId);

module.exports = { getAllBoards, addBoard, getBoard, updateBoard, deleteBoard };
export {};