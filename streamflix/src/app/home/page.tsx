import Navbar from "@/components/Navbar";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";

export default function CataloguePage() {
  return (
    <>
      <Navbar />
      <main className="catalogue">
        <h1>Movie Catalogue</h1>
        <p>Explore our available movies.</p>
        <MovieRow />
      </main>
      <Footer />
    </>
  );
}
