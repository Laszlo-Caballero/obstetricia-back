import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756313603574 implements MigrationInterface {
    name = 'Tables1756313603574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "especialidad" ("especialidadId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL, CONSTRAINT "PK_f442dfb0d7ea22ff65393bcb49b" PRIMARY KEY ("especialidadId"))`);
        await queryRunner.query(`CREATE TABLE "obstetra" ("obstetraId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "apellido_paterno" nvarchar(255) NOT NULL, "apellido_materno" nvarchar(255) NOT NULL, "especialidadEspecialidadId" int, CONSTRAINT "PK_f0cbe80b69141054f00f5c15e6c" PRIMARY KEY ("obstetraId"))`);
        await queryRunner.query(`ALTER TABLE "obstetra" ADD CONSTRAINT "FK_3c0e05a2e0cad663728b37dd6ae" FOREIGN KEY ("especialidadEspecialidadId") REFERENCES "especialidad"("especialidadId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "obstetra" DROP CONSTRAINT "FK_3c0e05a2e0cad663728b37dd6ae"`);
        await queryRunner.query(`DROP TABLE "obstetra"`);
        await queryRunner.query(`DROP TABLE "especialidad"`);
    }

}
