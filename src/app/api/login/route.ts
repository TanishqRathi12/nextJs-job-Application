import { NextRequest,NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { comparePassword} from "@/utils/bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/utils/token";


export const POST = async (req: NextRequest) => {
    try {
        const cookie = await cookies();
        const { email, password } = await req.json();   
         if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required." , success: false }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found." , success: false }, { status: 404 });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password.", success: false }, { status: 401 });
        }
        const token = generateToken({id: user.id, role: user.role, email: user.email});
        cookie.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 3,
        });
        return NextResponse.json({ message: "Login successful." , success: true }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error.", success: false }, { status: 500 });
    }
}