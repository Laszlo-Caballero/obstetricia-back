import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757087521155 implements MigrationInterface {
    name = 'Tables1757087521155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "recursoRecursoId" int`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ef73a3977a59250ba8743bef313" FOREIGN KEY ("recursoRecursoId") REFERENCES "recurso"("recursoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ef73a3977a59250ba8743bef313"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "recursoRecursoId"`);
    }

}
