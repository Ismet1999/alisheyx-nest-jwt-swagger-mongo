import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1675805553304 implements MigrationInterface {
    name = 'FirstMigration1675805553304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" json NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")); COMMENT ON COLUMN "category"."id" IS 'The id unique identifier'`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "name" json NOT NULL, "description" json NOT NULL DEFAULT '{}', "price" integer NOT NULL DEFAULT '0', "discount_price" integer NOT NULL DEFAULT '0', "discount" integer NOT NULL DEFAULT '0', "variables" json NOT NULL DEFAULT '{}', "format" character varying NOT NULL DEFAULT 'DOCX', "image" character varying NOT NULL DEFAULT '', "images" character varying NOT NULL DEFAULT '', "editor" json NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id")); COMMENT ON COLUMN "contract"."id" IS 'The id unique identifier'; COMMENT ON COLUMN "contract"."category_id" IS 'The id unique identifier'`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'The id unique identifier'`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_702a41ef3fa9ee0bacd3ea1954b" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_702a41ef3fa9ee0bacd3ea1954b"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
