import { Entity, PrimaryColumn, Column } from "typeorm";

const { v4: uuid } = require('uuid');

//const ColumnBoard = require("./Columnboard.ts");

//type IColumn =  typeof ColumnBoard;

interface IBoard {
  id: string;
  title: string;
  columns: string[];
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

 /* @OneToMany(() => Column, column => column.user)
  columns: Column[]; */

 // @OneToMany(() => ColumnBoard, (column:IColumn) => column.board)
  columns: string[];

  constructor({
    id = uuid(),
    title,
    columns = []
  } = {} as IBoard) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    /** @type {Array.<string>} */
    this.columns = [...columns];
  }
}

module.exports = Board;
export {};
