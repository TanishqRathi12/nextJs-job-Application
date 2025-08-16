import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

interface SearchJobBody {
  title?: string;
  location?: string;
  city?: string;
  is_remote?: boolean;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: SearchJobBody = await req.json();
    const jobs = await prisma.job.findMany({
      where: {
        OR: [
          { job_title: { contains: body.title, mode: "insensitive" } },
          { job_location: { contains: body.location, mode: "insensitive" } },
          { job_city: { contains: body.city, mode: "insensitive" } },
          { job_is_remote: { equals: body.is_remote } },
        ],
      },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, jobs });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
