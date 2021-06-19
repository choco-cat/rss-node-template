import { Entity, PrimaryColumn, Column } from "typeorm";

const { v4: uuid } = require('uuid');

//const ColumnBoard = require("./Columnboard.ts");

//type IColumn =  typeof ColumnBoard;

interface IBoard {
  id: string;
  title: string;
  columns: [];
}
/**
 * Board class
 *
 * @class
 */
@Entity({name: 'board'})
class Board {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { length: 35, nullable: true })
  title: string;


 /* @OneToMany(() => ColumnBoard, (column: IColumn) => column.board)
  columnboard: [];*/

  // @ts-ignore
//  @OneToMany(() => ColumnBoard, (col) => col.board) // note: we will create author property in the Photo class below
  columns: [];

  constructor({
    id = uuid(),
    title,
    columns
  } = {} as IBoard) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
export {};
