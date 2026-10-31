"use client";

import { useState } from "react";

export default function AddToWatchlist({
  movieId,
}: {
  movieId: string;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function addMovie() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to add movie.");
      }

      setMessage("Added to your watchlist!");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className="primary-button"
        onClick={addMovie}
        disabled={loading}
      >
        {loading ? "Adding..." : "+ My List"}
      </button>

      {message && <p role="status">{message}</p>}
    </div>
  );
}
