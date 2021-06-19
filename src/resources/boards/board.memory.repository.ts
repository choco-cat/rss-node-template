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

const getAll = async ():Promise<IBoard[]> => {
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
const addColumns = async (boardRow: IBoard) => {
  const columnsRepository = getRepository(Columnboard);
  await boardRow.columns.forEach(async (column: IColumn) => {
    const newColumn = await columnsRepository.create({...column, board: boardRow});
    await columnsRepository.save(newColumn);
  });

}

const addBoard = async (boardRow: IBoard): Promise<IBoard> => {
  const boardsRepository = getRepository(Board);
  const newBoard = await boardsRepository.create(boardRow);
  const saveBoard = await boardsRepository.save(newBoard);
  await addColumns({ ...saveBoard, columns: [...boardRow.columns] });
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
  const findBoard = await boardsRepository.findOne(boardId);
  if(!findBoard) {
    throw new ValidationError(`Board with id = ${boardId} not found`, NOT_FOUND);
  }
  const columns1 = await columnsRepository.find({board: findBoard});
  console.log('-------------------------columns-----------------------',Columnboard.toResponse(columns1) );
  // @ts-ignore
  console.log('-------------------------result-----------------------',{...findBoard, columns: columns1 });
  // @ts-ignore
  return {...findBoard, columns: Columnboard.toResponse(columns1)};
  //return findBoard;
}

/*const updateColumns = async (boardRow: IBoard) => {
  const columnsRepository = getRepository(Columnboard);
  await boardRow.columns.forEach(async (column: IColumn) => {
    // const newColumn = await columnsRepository.create({...column, board: boardRow});
    await columnsRepository.update(boardRow.id, {...column, board: boardRow});
  });
} */

/**
 * Updates board data, returns updated board
 *
 * @param {Board} boardRow changed board
 * @returns {Promise<Board>} updated board
 */
const updateBoard = async (boardRow: IBoard): Promise<{ columns: never[]; id: string; title: string; prototype: undefined }> => {
  console.log('0-------------------------------------boardRow.columns',boardRow.columns);
  const boardsRepository = getRepository(Board);
  const findBoard = await boardsRepository.findOne(boardRow.id);
  if(!findBoard) {
    throw new ValidationError(`Board with id = ${boardRow.id} not found`, NOT_FOUND);
  }
  await boardsRepository.update(boardRow.id, { title: boardRow.title });
  const columnsRepository = getRepository(Columnboard);
  await columnsRepository.delete({ board: findBoard });
  await addColumns(boardRow);

  const columns = await columnsRepository.find({board: boardRow});
//  await updateColumns(boardRow);
 // await updateColumns(boardRow);
 // console.log('boardRow', boardRow);
 // await boardsRepository.update(boardRow.id, boardRow);

 // findBoard2.columns = [...boardRow.columns];
  console.log('-------------------------------------columns', columns);

 // console.log({...findBoard, columns: [...boardRow.columns]});

 // @ts-ignore
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
  const findBoard = await boardsRepository.findOne(boardId);

  if (findBoard === undefined) {
    throw new ValidationError(`Board not found`, NOT_FOUND);
  }
  const columnsRepository = getRepository(Columnboard);
  await columnsRepository.delete({board: findBoard});

  //const columns = await columnsRepository.find({ relations: ["board"] });

  const deletionRes = await boardsRepository.delete(boardId);

  if (!deletionRes.affected) {
    throw new ValidationError(`Board with id = ${boardId} not found`, NOT_FOUND);
  }

  return !!deletionRes.affected;

};

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
export {};
