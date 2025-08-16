-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_company_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
