const Boards = [
  {
    id: "d56rfg-j",
    title: "board1",
    columns: [{ id: "string", title: "string", order: 0 }]
  }
];

const getAll = async () => Boards;

const addBoard = async (boardRow) => {
  Boards.push(boardRow);
  return boardRow;
}

const getBoard = async (boardId) => {
  const board = Boards.find((el) =>  el.id === boardId);
  return board;
}

/*
const updateBoard = async (boardRow) => {
  const board = Boards.find((el) =>  el.id === boardRow.id);
  if (board !== undefined) {
    board.name = boardRow.name;
    board.login = boardRow.login;
    board.password = boardRow.password;
  }
  const { password, ...expectedBoard } = board;
  return expectedBoard;
}

const deleteBoard = async (boardId) => {
  const board = Boards.find((el) =>  el.id === boardId);
  const index = Boards.indexOf(board);
  return index !== -1 ;
}
*/

module.exports = { getAll, addBoard, getBoard };
