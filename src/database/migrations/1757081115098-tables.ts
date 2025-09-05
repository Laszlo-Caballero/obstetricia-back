import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757081115098 implements MigrationInterface {
    name = 'Tables1757081115098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2e296917dc5febd63dd90646f03"`);
        await queryRunner.query(`DROP INDEX "REL_2e296917dc5febd63dd90646f0" ON "user"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "personalPersonalId"`);
        await queryRunner.query(`ALTER TABLE "personal" ADD "userId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_a26de179fa85b121b5562d1866" ON "personal" ("userId") WHERE "userId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_a26de179fa85b121b5562d18664" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_a26de179fa85b121b5562d18664"`);
        await queryRunner.query(`DROP INDEX "REL_a26de179fa85b121b5562d1866" ON "personal"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "personalPersonalId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_2e296917dc5febd63dd90646f0" ON "user" ("personalPersonalId") WHERE ([personalPersonalId] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2e296917dc5febd63dd90646f03" FOREIGN KEY ("personalPersonalId") REFERENCES "personal"("personalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
