import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

interface SearchJobBody {
  title?: string;
  job_location?: string;
  job_is_remote?: boolean;
  salary?: string | number;
}

interface JobWhereInput {
  job_title?: {
    contains: string;
    mode: "insensitive";
  };
  job_location?: string;
  job_is_remote?: boolean;
  job_salary?: {
    gte: number;
  };
}

export const POST = async (req: NextRequest) => {
  try {
    const body: SearchJobBody = await req.json();

    let andFilters = [] as Array<JobWhereInput>;

    if (body.title?.trim()) {
      andFilters.push({
        job_title: {
          contains: body.title,
          mode: "insensitive",
        },
      });
    }

    if (body.job_location?.trim()) {
      andFilters.push({
        job_location: body.job_location,
      });
    }

    if (typeof body.job_is_remote === "boolean") {
      andFilters.push({
        job_is_remote: body.job_is_remote,
      });
    }

    if (body.salary) {
      const salaryNumber = typeof body.salary === "string" ? parseInt(body.salary) : body.salary;
      if (!isNaN(salaryNumber)) {
        andFilters.push({
          job_salary: {
            gte: salaryNumber,
          },
        });
      }
    }
    const whereClause = andFilters.length > 0 ? { AND: andFilters } : {};

    const jobs = await prisma.job.findMany({
      where: whereClause,
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
    return NextResponse.json({ success: true, jobs });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
