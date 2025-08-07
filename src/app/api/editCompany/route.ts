import { NextRequest,NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/token";

interface DecodedToken {
    id: string;
    email: string;
    name: string;   
}

export const PATCH = async (req:NextRequest) => {
    try {
        const cookie = await cookies();
        const decoded = decodeToken(cookie.get("token")?.value || "") as DecodedToken;
        const { name, logo, description } = await req.json();

        const updatedCompany = await prisma.company.update({
            where: { user_id: decoded.id },
            data: {
            ...(name && { name }),
            ...(logo && { logo }),
            ...(description && { description }),
            },
        });

        return NextResponse.json(
            { success: true, company: updatedCompany },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}