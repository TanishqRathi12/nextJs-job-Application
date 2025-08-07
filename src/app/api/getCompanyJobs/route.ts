import { decodeToken } from "@/utils/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

interface DecodedToken {
    id: string;
    email: string;
    name: string;
}

export const GET = async () => {
    try {
        const cookie = await cookies();
        const decoded = decodeToken(cookie.get("token")?.value || "") as DecodedToken;

        const jobs = await prisma.company.findUnique({
            where: { user_id: decoded.id },
            select: {
                Jobs: true,
                },
            },
        );
        if(!jobs){
            return NextResponse.json({ message: "No jobs found for this company.", success: false }, { status: 404 });
        }
        return NextResponse.json({ jobs: jobs.Jobs, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching company jobs:", error);
        return NextResponse.json({ message: "Internal server error.", success: false }, { status: 500 });
    }
}