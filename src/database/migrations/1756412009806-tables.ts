import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756412009806 implements MigrationInterface {
    name = 'Tables1756412009806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("roleId" int NOT NULL IDENTITY(1,1), "roleName" nvarchar(255) NOT NULL, CONSTRAINT "PK_39bf7e8af8fe54d9d1c7a8efe6f" PRIMARY KEY ("roleId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
