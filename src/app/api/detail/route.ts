import { prisma } from "./../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const jobDetail = await prisma.job.findUnique({
      where: {
        id: body.id,
      },
    });
    const companyDetail = await prisma.company.findUnique({
      where: {
        id: jobDetail?.company_id,
      },
    });
    if (!jobDetail) {
      return NextResponse.json({ success: false, message: "job not found" });
    }
    return NextResponse.json({
      success: true,
      message: "job details found successfully",
      jobDetail,
      companyDetail,
    });
  } catch (error) {
    console.log(error);
  }
};
