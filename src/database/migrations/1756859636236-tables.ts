import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756859636236 implements MigrationInterface {
    name = 'Tables1756859636236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`CREATE TABLE "modulo" ("moduloId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_4bfd673a83f5f000b8b4562bd1b" DEFAULT 1, CONSTRAINT "PK_03a2d9551b3eccc1585a7d0c116" PRIMARY KEY ("moduloId"))`);
        await queryRunner.query(`CREATE TABLE "prioridad" ("prioridadId" int NOT NULL IDENTITY(1,1), "nomrbe" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_979f784ff7424dfa360eb618080" DEFAULT 1, CONSTRAINT "PK_dcb1bfc7c713ce209235b82a10d" PRIMARY KEY ("prioridadId"))`);
        await queryRunner.query(`CREATE TABLE "tipo_consulta" ("tipoId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_77cd1054cb8d2052a72cc1f6194" DEFAULT 1, CONSTRAINT "PK_2e2480ccc91175c610e7f9adc47" PRIMARY KEY ("tipoId"))`);
        await queryRunner.query(`CREATE TABLE "consulta" ("consultaId" int NOT NULL IDENTITY(1,1), "asunto" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL, "correo" nvarchar(255) NOT NULL, "telefono" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_243906ff25962df62881b374ce9" DEFAULT 1, "moduloModuloId" int, "tipoTipoId" int, "prioridadPrioridadId" int, "userUserId" int, CONSTRAINT "PK_0a71902774529ec698ee6e910ad" PRIMARY KEY ("consultaId"))`);
        await queryRunner.query(`ALTER TABLE "consulta" ADD CONSTRAINT "FK_9f5b7854f9265f51a8f6986fbd3" FOREIGN KEY ("moduloModuloId") REFERENCES "modulo"("moduloId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consulta" ADD CONSTRAINT "FK_5b5d542a2e282b48a044b5c9be8" FOREIGN KEY ("tipoTipoId") REFERENCES "tipo_consulta"("tipoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consulta" ADD CONSTRAINT "FK_ed4deab3f389800d9981a13239e" FOREIGN KEY ("prioridadPrioridadId") REFERENCES "prioridad"("prioridadId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consulta" ADD CONSTRAINT "FK_51a951e81e6bdf4bb418308afbc" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" DROP CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8"`);
        await queryRunner.query(`ALTER TABLE "consulta" DROP CONSTRAINT "FK_51a951e81e6bdf4bb418308afbc"`);
        await queryRunner.query(`ALTER TABLE "consulta" DROP CONSTRAINT "FK_ed4deab3f389800d9981a13239e"`);
        await queryRunner.query(`ALTER TABLE "consulta" DROP CONSTRAINT "FK_5b5d542a2e282b48a044b5c9be8"`);
        await queryRunner.query(`ALTER TABLE "consulta" DROP CONSTRAINT "FK_9f5b7854f9265f51a8f6986fbd3"`);
        await queryRunner.query(`DROP TABLE "consulta"`);
        await queryRunner.query(`DROP TABLE "tipo_consulta"`);
        await queryRunner.query(`DROP TABLE "prioridad"`);
        await queryRunner.query(`DROP TABLE "modulo"`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_a6a600c4016087f677a0d7be5c8" FOREIGN KEY ("citaCitaId") REFERENCES "cita"("citaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laboratorio-cita" ADD CONSTRAINT "FK_aeccdb9f76d4d95e9c8ca7b79a8" FOREIGN KEY ("pruebaLaboratorioPruebaId") REFERENCES "prueba_laboratorio"("pruebaId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
