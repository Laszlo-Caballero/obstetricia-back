import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1759713431317 implements MigrationInterface {
    name = 'Tables1759713431317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_f008ced4434acb498564df8c8e6"`);
        await queryRunner.query(`EXEC sp_rename "obstetra.dbo.personal.asignadoProgramaId", "asignadoId"`);
        await queryRunner.query(`ALTER TABLE "programa" ADD "responsableId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_7d8f392fa7e1c4fa880bc42942" ON "programa" ("responsableId") WHERE "responsableId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "programa" ADD CONSTRAINT "FK_7d8f392fa7e1c4fa880bc429429" FOREIGN KEY ("responsableId") REFERENCES "personal"("personalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_d938dec2bf860f61576c4f2833f" FOREIGN KEY ("asignadoId") REFERENCES "programa"("programaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_d938dec2bf860f61576c4f2833f"`);
        await queryRunner.query(`ALTER TABLE "programa" DROP CONSTRAINT "FK_7d8f392fa7e1c4fa880bc429429"`);
        await queryRunner.query(`DROP INDEX "REL_7d8f392fa7e1c4fa880bc42942" ON "programa"`);
        await queryRunner.query(`ALTER TABLE "programa" DROP COLUMN "responsableId"`);
        await queryRunner.query(`EXEC sp_rename "obstetra.dbo.personal.asignadoId", "asignadoProgramaId"`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_f008ced4434acb498564df8c8e6" FOREIGN KEY ("asignadoProgramaId") REFERENCES "programa"("programaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
