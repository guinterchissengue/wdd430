
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const movieSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  genre: z.string().min(1),
  releaseYear: z.number().int().min(1888),
  posterUrl: z.string().url(),
  duration: z.number().int().positive(),
  featured: z.boolean().optional(),
});

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  context: Context
) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const data = movieSchema.partial().parse(
      await request.json()
    );

    const movie = await prisma.movie.update({
      where: { id },
      data,
    });

    return NextResponse.json(movie);
  } catch (error) {
    if (error instanceof Error &&
        error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Please sign in." },
        { status: 401 }
      );
    }

    if (error instanceof Error &&
        error.message === "FORBIDDEN") {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid movie data.", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Unable to update movie." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: Context
) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    await prisma.movie.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    if (error instanceof Error &&
        error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Please sign in." },
        { status: 401 }
      );
    }

    if (error instanceof Error &&
        error.message === "FORBIDDEN") {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Unable to delete movie." },
      { status: 500 }
    );
  }
}
