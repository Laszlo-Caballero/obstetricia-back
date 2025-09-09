import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757297505676 implements MigrationInterface {
    name = 'Tables1757297505676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" ADD "correo" nvarchar(255) NOT NULL CONSTRAINT "DF_a9d01748ea28312ddd4dac1db03" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "DF_a9d01748ea28312ddd4dac1db03"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "correo"`);
    }

}
