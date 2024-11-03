/*
  Warnings:

  - Changed the type of `type` on the `Assessment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `entryId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/

/*
* Custom migration to change the type and insert the required value
*/
Alter table "Assessment" drop column "type",
add column "type" text not null;

ALTER TABLE "Response" ADD COLUMN "entryId" TEXT NOT NULL;

drop type "AssessmentType";

ALTER TABLE "Assessment"
alter column "type" set not null;