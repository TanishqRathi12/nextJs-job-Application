import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../prisma/client";
import { hashPassword } from "@/utils/bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/utils/token";

export const POST = async (req: NextRequest) => {
  try {
    const cookie = await cookies();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken({
      id: newUser.id,
      role: newUser.role,
      email: newUser.email,
    });
    cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3,
    });

    return NextResponse.json(
      { success: true, message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
};
