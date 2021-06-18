import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

const { v4: uuid } = require('uuid');
const Board = require("./Board.ts");

type IBoard =  typeof Board;
/**
 * Class to create a Column object
 */
@Entity({name: 'columnboard'})
  class Columnboard {
    @PrimaryColumn('varchar')
    id: string;

    @Column('varchar', { length: 35, nullable: true })
    title: string;

    @Column( 'integer', { nullable: true })
    order: number;

    @ManyToOne(() => Board, (board: IBoard) => board.columns)
    board: IBoard;

    constructor({
        id = uuid(),
        title = 'Default column',
        order = 1
    }: Partial<Columnboard> = {}) {

    this.id = id;
    this.title = title;
    this.order = order;
   }
 }

module.exports = Columnboard;
export {};