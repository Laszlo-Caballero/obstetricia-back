import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1764595381753 implements MigrationInterface {
    name = 'Tables1764595381753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD "fechaCreacion" datetime NOT NULL CONSTRAINT "DF_d13651c6a53af4f29f9ea29490f" DEFAULT GETDATE()`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD "documentoRecursoId" int`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD "responsablePersonalId" int`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD "pruebaLaboratorioPruebaId" int`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP CONSTRAINT "DF_35ee3df327be25e45784a4caebe"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD "estado" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD CONSTRAINT "FK_85ef31821af448c86fc2ae063f6" FOREIGN KEY ("documentoRecursoId") REFERENCES "recurso"("recursoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD CONSTRAINT "FK_a4758f94f4b48b1451de8f3d1cd" FOREIGN KEY ("responsablePersonalId") REFERENCES "personal"("personalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD CONSTRAINT "FK_30c4862e574133abbcc3c2f5ae7" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motivo" DROP CONSTRAINT "FK_30c4862e574133abbcc3c2f5ae7"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP CONSTRAINT "FK_a4758f94f4b48b1451de8f3d1cd"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP CONSTRAINT "FK_85ef31821af448c86fc2ae063f6"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD "estado" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" ADD CONSTRAINT "DF_35ee3df327be25e45784a4caebe" DEFAULT 1 FOR "estado"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP COLUMN "pruebaLaboratorioPruebaId"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP COLUMN "responsablePersonalId"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP COLUMN "documentoRecursoId"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP CONSTRAINT "DF_d13651c6a53af4f29f9ea29490f"`);
        await queryRunner.query(`ALTER TABLE "prueba_laboratorio" DROP COLUMN "fechaCreacion"`);
    }

}
