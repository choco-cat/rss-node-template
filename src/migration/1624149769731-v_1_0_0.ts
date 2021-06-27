import {MigrationInterface, QueryRunner} from "typeorm";

export class v1001624149769731 implements MigrationInterface {
    name = '1624149769731'

    // eslint-disable-next-line class-methods-use-this
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO "user"("id", "name", "login", "password") VALUES ('f5953b21-5226-43e1-889a-2fce1672ec95', 'admin', 'admin', '$2b$10$b2LFA9SI7gEJj4PzOxbUmepb0Tz5Wvp4xTC6XBbSwhEKSIBhF8YFq')`);
    }

    // eslint-disable-next-line class-methods-use-this
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE FROM "user" WHERE name = 'admin'`);
    }

}