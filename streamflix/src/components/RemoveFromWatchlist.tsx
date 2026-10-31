"use client";

import { useState } from "react";

export default function RemoveFromWatchlist({
  itemId,
}: {
  itemId: string;
}) {
  const [message, setMessage] = useState("");

  async function removeMovie() {
    const response = await fetch(
      `/api/watchlist/${itemId}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      setMessage("Unable to remove this movie.");
    }
  }

  return (
    <div>
      <button onClick={removeMovie}>
        Remove
      </button>
      {message && <p role="alert">{message}</p>}
    </div>
  );
}
