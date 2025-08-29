import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756446466127 implements MigrationInterface {
    name = 'Tables1756446466127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "obstetra" ADD "userUserId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f1b790eb1d89e716b809243d49" ON "obstetra" ("userUserId") WHERE "userUserId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "obstetra" ADD CONSTRAINT "FK_f1b790eb1d89e716b809243d492" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "obstetra" DROP CONSTRAINT "FK_f1b790eb1d89e716b809243d492"`);
        await queryRunner.query(`DROP INDEX "REL_f1b790eb1d89e716b809243d49" ON "obstetra"`);
        await queryRunner.query(`ALTER TABLE "obstetra" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
