import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <p>WELCOME TO STREAMFLIX</p>
        <h1>Discover your next favourite movie.</h1>
        <p>
          Explore movies, build your watchlist,
          and enjoy your personal movie experience.
        </p>
        <Link href="/home" className="primary-button">
          Explore Movies
        </Link>
      </div>
    </section>
  );
}
