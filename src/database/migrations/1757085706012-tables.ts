import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757085706012 implements MigrationInterface {
    name = 'Tables1757085706012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recurso" ("recursoId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "extension" nvarchar(255) NOT NULL, "fechaSubida" datetime NOT NULL CONSTRAINT "DF_e2c2fca0ca15e284c8792f00c45" DEFAULT GETDATE(), CONSTRAINT "PK_addad3785a13f3affc80269080d" PRIMARY KEY ("recursoId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recurso"`);
    }

}
