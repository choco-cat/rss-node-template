const Boards = [];
/**
 * Returns all boards
 * @returns {Array.<Board>} array of boards objects
 */
const getAll = async () => Boards;
/**
 * Adds a new board object to array of boards objects, returns new board
 * @param {Board} boardRow board to add
 * @returns {Board} board object
 */
const addBoard = async (boardRow) => {
  Boards.push(boardRow);
  return boardRow;
}
/**
 * Returns the board by its id
 * @param {string} boardId board id
 * @returns {Board} board object
 */
const getBoard = async (boardId) => {
  const board = Boards.find((el) =>  el.id === boardId);
  return board;
}
/**
 * Updates board data, returns updated board
 * @param {Board} boardRow
 * @returns {Board} updated board
 */
const updateBoard = async (boardRow) => {
  const board = Boards.find((el) =>  el.id === boardRow.id);
  if (board !== undefined) {
    board.title = boardRow.title;
    board.columns = [...boardRow.columns]
  }
  return board;
}
/**
 * Deletes the board
 * @param {string} boardId board id
 * @returns {boolean} returns true if the item has been removed and false if not removed
 */
const deleteBoard = async (boardId) => {
  const index = Boards.findIndex((el) => el.id === boardId);
  if (index > -1) {
    Boards.splice(index, 1);
  }
  return index !== -1 ;
}

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
