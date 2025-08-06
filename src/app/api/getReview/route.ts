import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const reviews = await prisma.review.findMany({
            where: {
                company_id: body,
            },
        });

        if (!reviews || reviews.length === 0) {
            return NextResponse.json(
                { message: "No reviews found", reviews: [] },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "Reviews fetched successfully", reviews },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while fetching reviews", error: (error as Error).message },
            { status: 500 }
        );
    }
};
