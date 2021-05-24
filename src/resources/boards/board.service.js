const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const addBoard = (boardRow) => boardsRepo.addBoard(boardRow);

const getBoard = (boardId) => boardsRepo.getBoard(boardId);

const updateBoard = (boardRow) => boardsRepo.updateBoard(boardRow);

const deleteBoard = (boardId) => boardsRepo.deleteBoard(boardId);

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
