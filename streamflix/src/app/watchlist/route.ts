
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { z } from "zod";

const addSchema = z.object({
  movieId: z.string().min(1),
});

export async function GET() {
  try {
    const userId = await requireUser();

    const items = await prisma.watchlistItem.findMany({
      where: { userId },
      include: { movie: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    const status =
      error instanceof Error &&
      error.message === "UNAUTHORIZED" ? 401 : 500;

    return NextResponse.json(
      { error: "Unable to retrieve watchlist." },
      { status }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await requireUser();
    const { movieId } = addSchema.parse(
      await request.json()
    );

    const item = await prisma.watchlistItem.create({
      data: { userId, movieId },
      include: { movie: true },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid movie ID." },
        { status: 400 }
      );
    }

    if (error instanceof Error &&
        error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Please sign in." },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Movie already in your watchlist." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Unable to add movie." },
      { status: 500 }
    );
  }
}
