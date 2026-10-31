"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Movie {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  posterUrl: string;
}

export default function MovieRow() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error("Failed to load movies.");
        }

        const data: Movie[] = await response.json();
        setMovies(data);
      } catch {
        setError("Unable to load the movie catalogue.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;

  if (error) return <p>{error}</p>;

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
          className="movie-card"
        >
          <img src={movie.posterUrl} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>
            {movie.genre} · {movie.releaseYear}
          </p>
        </Link>
      ))}
    </section>
  );
}
