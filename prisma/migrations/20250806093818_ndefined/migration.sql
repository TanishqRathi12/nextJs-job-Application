-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_company_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
