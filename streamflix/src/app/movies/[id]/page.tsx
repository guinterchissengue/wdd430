import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import AddToWatchlist from "@/components/AddToWatchlist";
import Footer from "@/components/Footer";

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
    <>
      <Navbar />
      <main className="movie-details">
        <img src={movie.posterUrl} alt={movie.title} />

        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Duration:</strong> {movie.duration} minutes</p>
          <AddToWatchlist movieId={movie.id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
