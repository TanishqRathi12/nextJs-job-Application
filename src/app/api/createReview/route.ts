import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/token";

interface DecodedToken {
    id: string;
    email: string;
    role: string;
}

export const POST = async (req: NextRequest) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value || "";
        const decoded = decodeToken(token) as DecodedToken;

        if (!decoded?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        if (!body.companyId || !body.rating || !body.comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                user_id: decoded.id,
                company_id: body.companyId,
                rating: body.rating,
                comment: body.comment,
            },
        });

        return NextResponse.json({ review , message:"Review created successfully"}, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
