import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1764594308174 implements MigrationInterface {
    name = 'Tables1764594308174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motivo" ADD "citaCitaId" int`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD CONSTRAINT "FK_7d1da7ac716d15c371065be2b25" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motivo" DROP CONSTRAINT "FK_7d1da7ac716d15c371065be2b25"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP COLUMN "citaCitaId"`);
    }

}
