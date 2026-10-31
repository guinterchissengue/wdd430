import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(movies);
  } catch {
    return NextResponse.json(
      { error: "Unable to retrieve movies." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const data = await request.json();

    if (
      !data.title ||
      !data.description ||
      !data.genre ||
      !data.posterUrl
    ) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        genre: data.genre,
        posterUrl: data.posterUrl,
        releaseYear: Number(data.releaseYear),
        duration: Number(data.duration),
      },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create movie." },
      { status: 500 }
    );
  }
}