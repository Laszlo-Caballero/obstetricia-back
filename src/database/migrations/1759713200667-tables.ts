import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1759713200667 implements MigrationInterface {
    name = 'Tables1759713200667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programa" ADD "cupoMaximo" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "programa" ADD "deribacion" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personal" ADD "asignadoProgramaId" int`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_f008ced4434acb498564df8c8e6" FOREIGN KEY ("asignadoProgramaId") REFERENCES "programa"("programaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_f008ced4434acb498564df8c8e6"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "asignadoProgramaId"`);
        await queryRunner.query(`ALTER TABLE "programa" DROP COLUMN "deribacion"`);
        await queryRunner.query(`ALTER TABLE "programa" DROP COLUMN "cupoMaximo"`);
    }

}
