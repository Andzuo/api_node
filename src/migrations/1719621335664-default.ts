import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719621335664 implements MigrationInterface {
    name = 'Default1719621335664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_room" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_f92bc05acd4e9471f066e6be012" PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d12cc6f5be52be1d779aa79063" ON "subject_room" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_debc7edb4ea83151a7e975a84b" ON "subject_room" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "subject_room" ADD CONSTRAINT "FK_d12cc6f5be52be1d779aa790639" FOREIGN KEY ("room_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subject_room" ADD CONSTRAINT "FK_debc7edb4ea83151a7e975a84ba" FOREIGN KEY ("subject_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_room" DROP CONSTRAINT "FK_debc7edb4ea83151a7e975a84ba"`);
        await queryRunner.query(`ALTER TABLE "subject_room" DROP CONSTRAINT "FK_d12cc6f5be52be1d779aa790639"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "description"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_debc7edb4ea83151a7e975a84b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d12cc6f5be52be1d779aa79063"`);
        await queryRunner.query(`DROP TABLE "subject_room"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
    }

}
