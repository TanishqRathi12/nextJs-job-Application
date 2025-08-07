import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export const GET = async () => {
  try {
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        job_title: true,
        job_location: true,
        job_logo: true,
        job_publisher: true,
        job_employment_type: true,
        job_is_remote: true,
        job_city: true,
        job_salary: true,
      },
    });
    return NextResponse.json({
      success: true,
      jobs,
      message: "Jobs fetched Successfully",
    });
  } catch{
    return NextResponse.error();
  }
};
