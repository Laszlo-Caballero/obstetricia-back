import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1757295230791 implements MigrationInterface {
    name = 'Tables1757295230791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria" ("categoriaId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_be309009f47eaaf240ebcb89417" DEFAULT 1, CONSTRAINT "PK_06ae70b19fcad5378ff15dc067a" PRIMARY KEY ("categoriaId"))`);
        await queryRunner.query(`CREATE TABLE "presentacion" ("presentacionId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_da0ba0653d555edc4d3e45871a2" DEFAULT 1, CONSTRAINT "PK_ce716d426186e7c9e3f7883d6af" PRIMARY KEY ("presentacionId"))`);
        await queryRunner.query(`CREATE TABLE "receta_medicina" ("recetamedicinaId" int NOT NULL IDENTITY(1,1), "dosis" nvarchar(255) NOT NULL, "indicacion" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_90c69d135472380e5bf42b35c4b" DEFAULT 1, "recetaRecetaId" int, "medicinaMedicinaId" int, CONSTRAINT "PK_51729265a3f6a601a7ab1b52521" PRIMARY KEY ("recetamedicinaId"))`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD "codigo" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD "categoriaCategoriaId" int`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD "presentacionPresentacionId" int`);
        await queryRunner.query(`ALTER TABLE "receta" ADD "detalle" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD CONSTRAINT "FK_5db4482024e823780ba4ccb7d0f" FOREIGN KEY ("categoriaCategoriaId") REFERENCES "categoria"("categoriaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicina" ADD CONSTRAINT "FK_89227fb52f6231763b4586e271f" FOREIGN KEY ("presentacionPresentacionId") REFERENCES "presentacion"("presentacionId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receta_medicina" ADD CONSTRAINT "FK_f7fa95ae2c8f6ea26f6c1d500df" FOREIGN KEY ("recetaRecetaId") REFERENCES "receta"("recetaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receta_medicina" ADD CONSTRAINT "FK_854946703ef35d472e29680fc72" FOREIGN KEY ("medicinaMedicinaId") REFERENCES "medicina"("medicinaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receta_medicina" DROP CONSTRAINT "FK_854946703ef35d472e29680fc72"`);
        await queryRunner.query(`ALTER TABLE "receta_medicina" DROP CONSTRAINT "FK_f7fa95ae2c8f6ea26f6c1d500df"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP CONSTRAINT "FK_89227fb52f6231763b4586e271f"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP CONSTRAINT "FK_5db4482024e823780ba4ccb7d0f"`);
        await queryRunner.query(`ALTER TABLE "receta" DROP COLUMN "detalle"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "presentacionPresentacionId"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "categoriaCategoriaId"`);
        await queryRunner.query(`ALTER TABLE "medicina" DROP COLUMN "codigo"`);
        await queryRunner.query(`DROP TABLE "receta_medicina"`);
        await queryRunner.query(`DROP TABLE "presentacion"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
    }

}
