import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757091312221 implements MigrationInterface {
    name = 'Tables1757091312221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "personal_postas" ("personalId" int NOT NULL, "postaId" int NOT NULL, CONSTRAINT "PK_7366b38942c18dc4c8862d4637e" PRIMARY KEY ("personalId", "postaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a21d51eab426e92f4438e9b7af" ON "personal_postas" ("personalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f1275950dd47f9781da785ec83" ON "personal_postas" ("postaId") `);
        await queryRunner.query(`ALTER TABLE "personal_postas" ADD CONSTRAINT "FK_a21d51eab426e92f4438e9b7af5" FOREIGN KEY ("personalId") REFERENCES "personal"("personalId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "personal_postas" ADD CONSTRAINT "FK_f1275950dd47f9781da785ec830" FOREIGN KEY ("postaId") REFERENCES "posta"("postaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal_postas" DROP CONSTRAINT "FK_f1275950dd47f9781da785ec830"`);
        await queryRunner.query(`ALTER TABLE "personal_postas" DROP CONSTRAINT "FK_a21d51eab426e92f4438e9b7af5"`);
        await queryRunner.query(`DROP INDEX "IDX_f1275950dd47f9781da785ec83" ON "personal_postas"`);
        await queryRunner.query(`DROP INDEX "IDX_a21d51eab426e92f4438e9b7af" ON "personal_postas"`);
        await queryRunner.query(`DROP TABLE "personal_postas"`);
    }

}
