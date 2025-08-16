-- DropForeignKey
ALTER TABLE "public"."Application" DROP CONSTRAINT "Application_job_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
