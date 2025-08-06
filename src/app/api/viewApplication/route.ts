import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../prisma/client";

export const POST = async (req: NextRequest) => {
    try {

        const { jobId } = await req.json();

        const application = await prisma.application.findMany({
            where: {
                job_id: jobId,
            },
        });

        if (!application || application.length === 0) {
            return NextResponse.json({ message: "No applications found" }, { status: 404 });
        }

        return NextResponse.json({application , message: "Application retrieved successfully"}, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error", details: (error as Error).message },
            { status: 500 }
        );
    }
};
