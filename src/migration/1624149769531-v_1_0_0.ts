import {MigrationInterface, QueryRunner} from "typeorm";

export class v1001624149769531 implements MigrationInterface {
    name = 'v1001624149769531'

    // eslint-disable-next-line class-methods-use-this
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(35), "columns" jsonb, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "task" ("boardId" character varying(45), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(45), "order" integer, "description" character varying(45), "userId" character varying(45), "columnId" character varying(45), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(45), "login" character varying(45), "password" character varying(60), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    // eslint-disable-next-line class-methods-use-this
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "user"`);
      await queryRunner.query(`DROP TABLE "task"`);
      await queryRunner.query(`DROP TABLE "board"`);
    }
}
