import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const gatherings = await prisma.gathering.findMany({
      where: {
        status: "ACTIVE",
        date: {
          gte: new Date(),
        },
      },
      include: {
        registrations: {
          include: {
            member: {
              include: {
                group: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(gatherings);
  } catch (error) {
    console.error("Error fetching gatherings:", error);
    return NextResponse.json({ error: "Error fetching gatherings" }, { status: 500 });
  }
}
