import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/token";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  const cookie = await cookies();
  const decoded = decodeToken(cookie.get("token")?.value || "") as DecodedToken;

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User not found.", success: false },
      { status: 404 }
    );
  }

  try {
    await prisma.job.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
};
