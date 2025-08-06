import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("Search request body:", body);
    const filters: any = {
      AND: [],
    };

    if (body.title && body.title.trim() !== "") {
      filters.AND.push({
        job_title: {
          contains: body.title,
          mode: "insensitive",
        },
      });
    }

    if (body.job_location && body.job_location.trim() !== "") {
      filters.AND.push({
        job_location: body.job_location,
      });
    }

    if (typeof body.job_is_remote === "boolean") {
      filters.AND.push({
        job_is_remote: body.job_is_remote,
      });
    }

    if (body.salary) {
      filters.AND.push({
        job_salary: {
          gte: parseInt(body.salary),
        },
      });
    }

    const jobs = await prisma.job.findMany({
      where: filters,
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
    console.log("Jobs found:", jobs.length);

    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};