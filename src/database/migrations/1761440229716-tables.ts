import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1761440229716 implements MigrationInterface {
    name = 'Tables1761440229716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "motivo" ("motivoId" int NOT NULL IDENTITY(1,1), "nombreTabla" nvarchar(255) NOT NULL, "razon" varchar(max) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_3e2f66c6fb333eadcd37a05c468" DEFAULT 1, CONSTRAINT "PK_88fed20695c14202fb3e7eaf129" PRIMARY KEY ("motivoId"))`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD "motivoMotivoId" int`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD CONSTRAINT "FK_332c3425940432b806e888a9ce2" FOREIGN KEY ("motivoMotivoId") REFERENCES "motivo"("motivoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicina" DROP CONSTRAINT "FK_332c3425940432b806e888a9ce2"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "motivoMotivoId"`);
        await queryRunner.query(`DROP TABLE "motivo"`);
    }

}
