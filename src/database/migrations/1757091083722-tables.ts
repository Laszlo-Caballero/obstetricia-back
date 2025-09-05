import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757091083722 implements MigrationInterface {
    name = 'Tables1757091083722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_29b48f286dda5ff0e46b5cbbfbf"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "postaPostaId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" ADD "postaPostaId" int`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_29b48f286dda5ff0e46b5cbbfbf" FOREIGN KEY ("postaPostaId") REFERENCES "posta"("postaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
