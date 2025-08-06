import { decodeToken } from "@/utils/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

interface DecodedToken {
  id:string,
  email:string,
  role:string,
}

export const DELETE = async () => {
  try {
     const cookie = await cookies();
    const decoded = decodeToken(cookie.get("token")?.value || "") as DecodedToken;

    if (!decoded.id) {
      return NextResponse.json(
        { message: "User not authenticated.", success: false },
        { status: 401 }
      );
    }

    const company = await prisma.company.findUnique({
      where: { user_id: decoded.id },
    });

    if (!company) {
      return NextResponse.json(
        { message: "Company not found.", success: false },
        { status: 404 }
      );
    }

    await prisma.company.delete({
      where: { user_id: decoded.id },
    });

    return NextResponse.json(
      { message: "Company deleted successfully.", success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error.", success: false },
      { status: 500 }
    );
  }
};
