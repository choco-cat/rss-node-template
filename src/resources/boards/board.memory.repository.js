const Boards = [];

const getAll = async () => Boards;
/**
 *
 * @param boardRow
 * @returns {Promise<*>}
 */
const addBoard = async (boardRow) => {
  Boards.push(boardRow);
  return boardRow;
}

const getBoard = async (boardId) => {
  const board = Boards.find((el) =>  el.id === boardId);
  return board;
}

const updateBoard = async (boardRow) => {
  const board = Boards.find((el) =>  el.id === boardRow.id);
  if (board !== undefined) {
    board.title = boardRow.title;
    board.columns = [...boardRow.columns]
  }
  return board;
}

const deleteBoard = async (boardId) => {
  const board = Boards.find((el) =>  el.id === boardId);
  const index = Boards.indexOf(board);
  if (index > -1) {
    Boards.splice(index, 1);
  }
  return index !== -1 ;
}


module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
