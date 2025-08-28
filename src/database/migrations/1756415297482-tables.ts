import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1756415297482 implements MigrationInterface {
    name = 'Tables1756415297482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "especialidad" ("especialidadId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_3139ab76ffe80e1e26c6db04c80" DEFAULT 1, CONSTRAINT "PK_f442dfb0d7ea22ff65393bcb49b" PRIMARY KEY ("especialidadId"))`);
        await queryRunner.query(`CREATE TABLE "obstetra" ("obstetraId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "apellido_paterno" nvarchar(255) NOT NULL, "apellido_materno" nvarchar(255) NOT NULL, "especialidadEspecialidadId" int, CONSTRAINT "PK_f0cbe80b69141054f00f5c15e6c" PRIMARY KEY ("obstetraId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" int NOT NULL IDENTITY(1,1), "user" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "obstetraObstetraId" int, "roleRoleId" int, CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_067997007d82c709b7efa6a0bc" ON "user" ("obstetraObstetraId") WHERE "obstetraObstetraId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "roles" ("roleId" int NOT NULL IDENTITY(1,1), "roleName" nvarchar(255) NOT NULL, CONSTRAINT "PK_39bf7e8af8fe54d9d1c7a8efe6f" PRIMARY KEY ("roleId"))`);
        await queryRunner.query(`ALTER TABLE "obstetra" ADD CONSTRAINT "FK_3c0e05a2e0cad663728b37dd6ae" FOREIGN KEY ("especialidadEspecialidadId") REFERENCES "especialidad"("especialidadId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_067997007d82c709b7efa6a0bc1" FOREIGN KEY ("obstetraObstetraId") REFERENCES "obstetra"("obstetraId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7" FOREIGN KEY ("roleRoleId") REFERENCES "roles"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_067997007d82c709b7efa6a0bc1"`);
        await queryRunner.query(`ALTER TABLE "obstetra" DROP CONSTRAINT "FK_3c0e05a2e0cad663728b37dd6ae"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP INDEX "REL_067997007d82c709b7efa6a0bc" ON "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "obstetra"`);
        await queryRunner.query(`DROP TABLE "especialidad"`);
    }

}
