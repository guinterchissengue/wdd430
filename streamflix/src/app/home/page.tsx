import MovieRow from "@/components/MovieRow";

export default function CataloguePage() {
  return (
    <main className="catalogue">
      <h1>Movie Catalogue</h1>
      <p>Explore our available movies.</p>
      <MovieRow />
    </main>
  );
}