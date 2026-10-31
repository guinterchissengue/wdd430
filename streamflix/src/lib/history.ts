import { cassandraClient } from "@/lib/cassandra";

export async function saveViewingHistory(
  userId: string,
  movieId: string,
  movieTitle: string,
  progressSeconds: number
) {
  const query = `
    INSERT INTO viewing_history (
      user_id,
      watched_at,
      movie_id,
      movie_title,
      progress_seconds
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  await cassandraClient.execute(
    query,
    [
      userId,
      new Date(),
      movieId,
      movieTitle,
      progressSeconds,
    ],
    { prepare: true }
  );
}

export async function getViewingHistory(userId: string) {
  const query = `
    SELECT movie_id, movie_title, watched_at, progress_seconds
    FROM viewing_history
    WHERE user_id = ?
    LIMIT 50
  `;

  const result = await cassandraClient.execute(
    query,
    [userId],
    { prepare: true }
  );

  return result.rows;
}
