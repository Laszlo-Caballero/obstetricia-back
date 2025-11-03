import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1762206953306 implements MigrationInterface {
    name = 'Tables1762206953306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programa" ADD "postaId" int`);
        await queryRunner.query(`ALTER TABLE "programa" ADD CONSTRAINT "FK_6924ac2abddb4074e6953a614de" FOREIGN KEY ("postaId") REFERENCES "posta"("postaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programa" DROP CONSTRAINT "FK_6924ac2abddb4074e6953a614de"`);
        await queryRunner.query(`ALTER TABLE "programa" DROP COLUMN "postaId"`);
    }

}
