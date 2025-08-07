// /app/api/addJob/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/token";
import { prisma } from "../../../../prisma/client";
import { Job } from "@prisma/client";

interface DecodedToken {
  id: string;
  role: string;
  email: string;
}

interface JobData {
  job_title: string;
  job_logo: string;
  job_publisher: string;
  job_description: string;
  job_employment_type: string;
  job_is_remote: boolean;
  job_city: string;
  job_location: string;
  job_salary: number;
  user_id: string;
  company_id?: string;
}

export const POST = async (req: NextRequest) => {
  const cookie = await cookies();
  const decoded = decodeToken(cookie.get("token")?.value || "") as DecodedToken;
  const body = await req.json();
console.log(body)
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
    const jobData: JobData = {
      job_title,
      job_logo,
      job_publisher: user?.Company?.name || "",
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
      data: jobData as Job,
    });

    return NextResponse.json(
      { message: "Job created successfully", job: newJob },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
