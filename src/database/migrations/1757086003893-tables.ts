import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757086003893 implements MigrationInterface {
    name = 'Tables1757086003893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurso" ADD "url" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurso" DROP COLUMN "url"`);
    }

}
