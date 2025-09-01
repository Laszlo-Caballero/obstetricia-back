import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756701183067 implements MigrationInterface {
    name = 'Tables1756701183067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`CREATE TABLE "region" ("regionId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, CONSTRAINT "PK_cb65449537268bed2e491f862ce" PRIMARY KEY ("regionId"))`);
        await queryRunner.query(`ALTER TABLE "posta" ADD "regionRegionId" int`);
        await queryRunner.query(`ALTER TABLE "posta" ADD CONSTRAINT "FK_0905b42bf15b41b2401a348056b" FOREIGN KEY ("regionRegionId") REFERENCES "region"("regionId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP CONSTRAINT "FK_0905b42bf15b41b2401a348056b"`);
        await queryRunner.query(`ALTER TABLE "posta" DROP COLUMN "regionRegionId"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
