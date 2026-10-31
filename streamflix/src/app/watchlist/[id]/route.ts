
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  request: Request,
  context: Context
) {
  try {
    const userId = await requireUser();
    const { id } = await context.params;

    const result = await prisma.watchlistItem.deleteMany({
      where: {
        id,
        userId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Watchlist item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Movie removed from watchlist.",
    });
  } catch (error) {
    const status =
      error instanceof Error &&
      error.message === "UNAUTHORIZED" ? 401 : 500;

    return NextResponse.json(
      { error: "Unable to remove movie." },
      { status }
    );
  }
}
