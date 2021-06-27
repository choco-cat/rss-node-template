import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

interface ITask {
  boardId: string;
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
}
/**
 * Task class
 *
 * @class
 */
@Entity({name: 'task'})
class Task {
  @Column('varchar', { length: 45, nullable: true })
  boardId: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 45, nullable: true })
  title: string;

  @Column( 'integer', { nullable: true })
  order: number;

  @Column('varchar', { length: 45, nullable: true })
  description: string;

  @Column('varchar', { length: 45, nullable: true })
  userId: string;

  @Column('varchar', { length: 45, nullable: true })
  columnId: string;

  constructor({
    boardId,
    id ,
    title,
    order,
    description,
    userId,
    columnId
  } = {} as ITask) {
    /** @type {string} */
    this.boardId = boardId;
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    /** @type {number} */
    this.order = order;
    /** @type {string} */
    this.description = description;
    /** @type {string} */
    this.userId = userId;
    /** @type {string} */
    this.columnId = columnId;
  }
}

module.exports = Task;
export {};
