import {MigrationInterface, QueryRunner} from "typeorm";

export class v1001624149767331 implements MigrationInterface {
    name = 'v1001624149767331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board" ("id" character varying NOT NULL, "title" character varying(35), "columns" jsonb, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("boardId" character varying(45), "id" character varying NOT NULL, "title" character varying(45), "order" integer, "description" character varying(45), "userId" character varying(45), "columnId" character varying(45), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying(35), "login" character varying(35), "password" character varying(35), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }

}
