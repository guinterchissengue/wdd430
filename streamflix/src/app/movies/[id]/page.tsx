import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) notFound();

  return (
    <main className="movie-details">
      <img src={movie.posterUrl} alt={movie.title} />

      <div>
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p>{movie.genre}</p>
        <p>{movie.releaseYear}</p>
        <p>{movie.duration} minutes</p>
      </div>
    </main>
  );
}