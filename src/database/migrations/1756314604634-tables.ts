import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756314604634 implements MigrationInterface {
    name = 'Tables1756314604634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "especialidad" ADD "estado" bit NOT NULL CONSTRAINT "DF_3139ab76ffe80e1e26c6db04c80" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "especialidad" DROP CONSTRAINT "DF_3139ab76ffe80e1e26c6db04c80"`);
        await queryRunner.query(`ALTER TABLE "especialidad" DROP COLUMN "estado"`);
    }

}
