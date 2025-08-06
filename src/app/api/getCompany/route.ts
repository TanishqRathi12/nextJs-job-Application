import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/token";

interface DecodedToken {
  id:string,
  role:string,
  
    email: string;
}

export const GET = async () => {
  try {
    const cookie = await cookies();
    const decoded = decodeToken(
      cookie.get("token")?.value || ""
    ) as DecodedToken;

    const company = await prisma.company.findUnique({
      where: { user_id: decoded.id },
      include: { reviews: true },
    });

    if (!company) {
      return NextResponse.json(
        { message: "Company not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { company, reviews: company.reviews, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", success: false },
      { status: 500 }
    );
  }
};
