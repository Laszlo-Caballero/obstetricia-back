import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756449777559 implements MigrationInterface {
    name = 'Tables1756449777559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "obstetra" ADD "estado" bit NOT NULL CONSTRAINT "DF_369fee1e1e620ae83c9711eef2e" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "obstetra" DROP CONSTRAINT "DF_369fee1e1e620ae83c9711eef2e"`);
        await queryRunner.query(`ALTER TABLE "obstetra" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
