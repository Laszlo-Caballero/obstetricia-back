import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1764797580555 implements MigrationInterface {
    name = 'Tables1764797580555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "DF_4e77a2abdb4f7c2bb4cc949d61a"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "cita" ADD "estado" nvarchar(255) NOT NULL CONSTRAINT "DF_4e77a2abdb4f7c2bb4cc949d61a" DEFAULT 'Pendiente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "DF_4e77a2abdb4f7c2bb4cc949d61a"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "cita" ADD "estado" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "DF_4e77a2abdb4f7c2bb4cc949d61a" DEFAULT 1 FOR "estado"`);
    }

}
