import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1764591513809 implements MigrationInterface {
    name = 'Tables1764591513809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motivo" ADD "personalPersonalId" int`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD "postaPostaId" int`);
        await queryRunner.query(`ALTER TABLE "cita" ADD "creadoPorPersonalId" int`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD CONSTRAINT "FK_e0258e981e58077665b829ae751" FOREIGN KEY ("personalPersonalId") REFERENCES "personal"("personalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "motivo" ADD CONSTRAINT "FK_44033c5e52a68cb7ca6a2c727f1" FOREIGN KEY ("postaPostaId") REFERENCES "posta"("postaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "FK_e63dfac296247f2dfd50b44d6a8" FOREIGN KEY ("creadoPorPersonalId") REFERENCES "personal"("personalId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "FK_e63dfac296247f2dfd50b44d6a8"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP CONSTRAINT "FK_44033c5e52a68cb7ca6a2c727f1"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP CONSTRAINT "FK_e0258e981e58077665b829ae751"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP COLUMN "creadoPorPersonalId"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP COLUMN "postaPostaId"`);
        await queryRunner.query(`ALTER TABLE "motivo" DROP COLUMN "personalPersonalId"`);
    }

}
