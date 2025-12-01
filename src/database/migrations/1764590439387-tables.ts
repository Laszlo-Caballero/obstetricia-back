import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1764590439387 implements MigrationInterface {
    name = 'Tables1764590439387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicina" DROP CONSTRAINT "FK_332c3425940432b806e888a9ce2"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "motivoMotivoId"`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD "programaId" int`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD "medicinaMedicinaId" int`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD CONSTRAINT "FK_abf47c66563a77609b0a11dfe13" FOREIGN KEY ("programaId") REFERENCES "programa"("programaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD CONSTRAINT "FK_e46f01d3127c2d5f50378266109" FOREIGN KEY ("medicinaMedicinaId") REFERENCES "medicina"("medicinaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motivo" DROP CONSTRAINT "FK_e46f01d3127c2d5f50378266109"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP CONSTRAINT "FK_abf47c66563a77609b0a11dfe13"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP COLUMN "medicinaMedicinaId"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP COLUMN "programaId"`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD "motivoMotivoId" int`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD CONSTRAINT "FK_332c3425940432b806e888a9ce2" FOREIGN KEY ("motivoMotivoId") REFERENCES "motivo"("motivoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
