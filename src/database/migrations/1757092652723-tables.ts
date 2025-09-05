import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757092652723 implements MigrationInterface {
    name = 'Tables1757092652723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posta_personal_personal" ("postaPostaId" int NOT NULL, "personalPersonalId" int NOT NULL, CONSTRAINT "PK_be9eefe2c5c5f9e0f5f110b3c2c" PRIMARY KEY ("postaPostaId", "personalPersonalId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ebc8323c89901d8fb239765e5" ON "posta_personal_personal" ("postaPostaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b67fb97cbd22182aa64f4e501" ON "posta_personal_personal" ("personalPersonalId") `);
        await queryRunner.query(`ALTER TABLE "posta_personal_personal" ADD CONSTRAINT "FK_1ebc8323c89901d8fb239765e5c" FOREIGN KEY ("postaPostaId") REFERENCES "posta"("postaId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posta_personal_personal" ADD CONSTRAINT "FK_3b67fb97cbd22182aa64f4e5012" FOREIGN KEY ("personalPersonalId") REFERENCES "personal"("personalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posta_personal_personal" DROP CONSTRAINT "FK_3b67fb97cbd22182aa64f4e5012"`);
        await queryRunner.query(`ALTER TABLE "posta_personal_personal" DROP CONSTRAINT "FK_1ebc8323c89901d8fb239765e5c"`);
        await queryRunner.query(`DROP INDEX "IDX_3b67fb97cbd22182aa64f4e501" ON "posta_personal_personal"`);
        await queryRunner.query(`DROP INDEX "IDX_1ebc8323c89901d8fb239765e5" ON "posta_personal_personal"`);
        await queryRunner.query(`DROP TABLE "posta_personal_personal"`);
    }

}
