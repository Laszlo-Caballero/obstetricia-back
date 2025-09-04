import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756957459227 implements MigrationInterface {
    name = 'Tables1756957459227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "posta" ADD "ruc" nvarchar(255) NOT NULL CONSTRAINT "DF_d90cf73a5c1ab064d71d5ca8e2d" DEFAULT '00000000000'`);
        await queryRunner.query(`ALTER TABLE "posta" ADD "altitud" nvarchar(255) NOT NULL CONSTRAINT "DF_a74b9744d1096f4eb23f904c1ba" DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "posta" ADD "fechaInicioActividad" date`);
        await queryRunner.query(`ALTER TABLE "posta" ADD "fechaCreacion" date NOT NULL CONSTRAINT "DF_2f020ff940d4f4d342ed9d34d7b" DEFAULT GETDATE()`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP CONSTRAINT "DF_2f020ff940d4f4d342ed9d34d7b"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP COLUMN "fechaCreacion"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP COLUMN "fechaInicioActividad"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP CONSTRAINT "DF_a74b9744d1096f4eb23f904c1ba"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP COLUMN "altitud"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP CONSTRAINT "DF_d90cf73a5c1ab064d71d5ca8e2d"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP COLUMN "ruc"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
