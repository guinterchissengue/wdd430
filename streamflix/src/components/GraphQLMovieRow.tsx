"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  posterUrl: string;
};

export default function GraphQLMovieRow() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                movies {
                  id
                  title
                  genre
                  releaseYear
                  posterUrl
                }
              }
            `,
          }),
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
          throw new Error("Unable to load catalogue.");
        }

        setMovies(result.data.movies);
      } catch {
        setError("Could not load movies.");
      }
    }

    loadMovies();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="movie-card"
        >
          <img src={movie.posterUrl} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.genre} · {movie.releaseYear}</p>
        </Link>
      ))}
    </div>
  );
}
