import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/token";

interface DecodedToken {
  id: string;
  email: string;
  name: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const cookie = await cookies();
    const decoded = decodeToken(
      cookie.get("token")?.value || ""
    ) as DecodedToken;
    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { message: "Job not found", success: false },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        user_id: decoded.id,
        job_id: jobId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this job.", success: false },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        user_id: decoded.id,
        job_id: jobId,
        name: user.name,
        email: user.email,
      },
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully.",
        application,
        success: true,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error.", success: false },
      { status: 500 }
    );
  }
};
