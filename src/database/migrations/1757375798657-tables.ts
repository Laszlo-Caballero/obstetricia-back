import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757375798657 implements MigrationInterface {
    name = 'Tables1757375798657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicina" ADD "fechaCreacion" date NOT NULL CONSTRAINT "DF_784fdb31b1aa235091886ccb754" DEFAULT GETDATE()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicina" DROP CONSTRAINT "DF_784fdb31b1aa235091886ccb754"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "fechaCreacion"`);
    }

}
