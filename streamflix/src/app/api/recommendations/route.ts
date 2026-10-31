import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommendations";

export async function GET() {
  try {
    const recommendations = await getRecommendations();
    return NextResponse.json(recommendations);
  } catch {
    return NextResponse.json(
      { error: "Unable to load recommendations." },
      { status: 500 }
    );
  }
}
