import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import {
  getViewingHistory,
  saveViewingHistory,
} from "@/lib/history";
import { z } from "zod";

const historySchema = z.object({
  movieId: z.string().min(1),
  movieTitle: z.string().min(1),
  progressSeconds: z.number().int().min(0),
});

export async function GET() {
  try {
    const userId = await requireUser();
    const history = await getViewingHistory(userId);

    return NextResponse.json(history);
  } catch (error) {
    const status =
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
        ? 401
        : 500;

    return NextResponse.json(
      { error: "Unable to retrieve viewing history." },
      { status }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await requireUser();

    const data = historySchema.parse(await request.json());

    await saveViewingHistory(
      userId,
      data.movieId,
      data.movieTitle,
      data.progressSeconds
    );

    return NextResponse.json(
      { message: "Viewing activity saved." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid viewing data." },
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        { error: "Please sign in." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Unable to save viewing activity." },
      { status: 500 }
    );
  }
}
