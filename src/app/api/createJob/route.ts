// /app/api/addJob/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/token";
import { prisma } from "../../../../prisma/client";

interface DecodedToken {
  id: string;
  role: string;
  email: string;
}

export const POST = async (req: NextRequest) => {
  const cookie = await cookies();
  const decoded = decodeToken(cookie.get("token")?.value || "") as DecodedToken;
  const body = await req.json();

  const {
    job_title,
    job_logo,
    job_description,
    job_employment_type,
    job_is_remote,
    job_city,
    job_location,
    job_salary,
  } = body;

  const user = await prisma.user.findUnique({
    where:{
        id:decoded.id
    },
    include:{
        Company:true,
    }
  })

  try {
    const jobData: any = {
      job_title,
      job_logo,
      job_publisher:user?.Company?.name,
      job_description,
      job_employment_type,
      job_is_remote,
      job_city,
      job_location,
      job_salary: parseFloat(job_salary),
      user_id: decoded.id,
    };

    if (user?.Company?.id) {
      jobData.company_id = user.Company.id;
    }

    const newJob = await prisma.job.create({
      data: jobData,
    });

    return NextResponse.json(
      { message: "Job created successfully", job: newJob },
      { status: 201 }
    );
  } catch {
    console.error("Error creating job:");
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
