/*
  Warnings:

  - A unique constraint covering the columns `[version,type]` on the table `Assessment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assessment_version_type_key" ON "Assessment"("version", "type");
