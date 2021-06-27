import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 35, nullable: true })
  title: string;

  @Column('jsonb', { nullable: true })
  public columns: [];

  constructor({
    id,
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
