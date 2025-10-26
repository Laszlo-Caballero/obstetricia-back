import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1761453552859 implements MigrationInterface {
    name = 'Tables1761453552859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_deb62bc6d6bde67ae6daccab25d"`);
        await queryRunner.query(`DROP INDEX "REL_7d8f392fa7e1c4fa880bc42942" ON "programa"`);
        await queryRunner.query(`DROP INDEX "REL_deb62bc6d6bde67ae6daccab25" ON "personal"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "programaId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" ADD "programaId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_deb62bc6d6bde67ae6daccab25" ON "personal" ("programaId") WHERE ([programaId] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_7d8f392fa7e1c4fa880bc42942" ON "programa" ("responsableId") WHERE ([responsableId] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_deb62bc6d6bde67ae6daccab25d" FOREIGN KEY ("programaId") REFERENCES "programa"("programaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
