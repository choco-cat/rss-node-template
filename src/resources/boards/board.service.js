const boardsRepo = require('./board.memory.repository');
/**
 * Returns array of boards objects from boardsRepo
 * @returns {Array.<Board>}
 */
const getAll = () => boardsRepo.getAll();
/**
 * Adds a new board object to array of boards objects in boardsRepo, returns new board
 * @param {Board} boardRow board to add
 * @returns {Board}
 */
const addBoard = (boardRow) => boardsRepo.addBoard(boardRow);
/**
 * Returns the board by its id
 * @param {string} boardId board id
 * @returns {Board} board
 */
const getBoard = (boardId) => boardsRepo.getBoard(boardId);
/**
 * Updates board data, returns updated board
 * @param {Board} boardRow board to update
 * @returns {Board}
 */
const updateBoard = (boardRow) => boardsRepo.updateBoard(boardRow);
/**
 * Deletes the board from boardsRepo
 * @param {string} boardId board id
 * @returns {boolean} Returns true if the item has been removed and false if not removed
 */
const deleteBoard = (boardId) => boardsRepo.deleteBoard(boardId);

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
