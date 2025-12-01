import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1764595851783 implements MigrationInterface {
    name = 'Tables1764595851783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motivo" ADD "recetaRecetaId" int`);
        await queryRunner.query(`ALTER TABLE "diagnostico" ADD "descripcion" varchar(max) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD CONSTRAINT "FK_558a7380be2b5fd025c1b500dcb" FOREIGN KEY ("recetaRecetaId") REFERENCES "receta"("recetaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motivo" DROP CONSTRAINT "FK_558a7380be2b5fd025c1b500dcb"`);
        await queryRunner.query(`ALTER TABLE "diagnostico" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP COLUMN "recetaRecetaId"`);
    }

}
