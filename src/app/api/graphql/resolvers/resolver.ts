import { comparePassword, hashPassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/token";
import { cookies } from "next/headers";
import { prisma } from "../../../../../prisma/client";

export const login = async (
  _: unknown,
  args: { email: string; password: string }
) => {
  try {
    console.log(args)
    const cookie = await cookies();
    const { email, password } = args;
    if (!email || !password) {
      return {
        message: "Email and password are required.",
        success: false,
      };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return {
        status: 404,
        message: "User not found.",
        success: false,
      };
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid password.",
        success: false,
      };
    }
    const token = generateToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });
    cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3,
    });
    return {
      message: "Login successful.",
      success: true,
      status: 200,
    };
  } catch {
    return {
      message: "Internal server error.",
      success: false,
      status: 500,
    };
  }
};

export const signup = async (
  _: unknown,
  args: { name: string; email: string; password: string }
) => {
  try {
    const cookie = await cookies();
    if (!args.name || !args.email || !args.password) {
      return {
        success: false,
        status: 400,
        message: "Name, email, and password are required.",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: args.email },
    });
    if (existingUser) {
      return {
        success: false,
        message: "User already exists.",
        status: 409,
      };
    }

    const hashedPassword = await hashPassword(args.password);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
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

    return {
      success: true,
      message: "User created successfully.",
      status: 201,
    };
  } catch {
    return {
      success: false,
      message: "Internal server error.",
      status: 500,
    };
  }
};
