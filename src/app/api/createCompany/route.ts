import { NextResponse,NextRequest } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";
import {decodeToken} from "@/utils/token"

interface DecodedToken {
    id: string;
    role: string;
    email: string;
}

export const POST = async (req: NextRequest) => {
    const cookie = await cookies();
    const decoded = decodeToken(cookie.get("token")?.value || "") as DecodedToken;
    const { name, logo, description } = await req.json();
    if (!name || !logo || !description) {
        return NextResponse.json({ message: "Name, logo, and description are required.", success: false }, { status: 400 });
    }
    const existingCompany = await prisma.company.findUnique({
        where: {
            user_id: decoded.id,
        }
    })
    if (existingCompany) {
        return NextResponse.json({ message: "Company already exists for this user.", success: false }, { status: 400 });
    }
    const company = await prisma.company.create({
        data: {
            name,
            logo,
            description,
            user: {
                connect: {
                    id: decoded.id
                }
            }
        }
    });
    return NextResponse.json({ message: "Company created successfully.", success: true, company }, { status: 201 });
}