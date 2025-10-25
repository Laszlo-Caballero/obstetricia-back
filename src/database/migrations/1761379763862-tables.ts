import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1761379763862 implements MigrationInterface {
    name = 'Tables1761379763862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paciente" ADD "sexo" nvarchar(255) NOT NULL CONSTRAINT "DF_7981bca35086d795505e0ae465b" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paciente" DROP CONSTRAINT "DF_7981bca35086d795505e0ae465b"`);
        await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "sexo"`);
    }

}
