
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import RemoveFromWatchlist from "@/components/RemoveFromWatchlist";

export default async function WatchlistPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const items = await prisma.watchlistItem.findMany({
    where: { userId },
    include: { movie: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="catalogue">
      <h1>My Watchlist</h1>

      {items.length === 0 && (
        <p>Your watchlist is empty. Explore our catalogue!</p>
      )}

      <div className="movie-grid">
        {items.map((item) => (
          <article key={item.id} className="movie-card">
            <Link href={`/movies/${item.movie.id}`}>
              <img
                src={item.movie.posterUrl}
                alt={item.movie.title}
              />
              <h3>{item.movie.title}</h3>
            </Link>

            <RemoveFromWatchlist itemId={item.id} />
          </article>
        ))}
      </div>
    </main>
  );
}
