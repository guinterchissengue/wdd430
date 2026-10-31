import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GraphQLMovieRow from "@/components/GraphQLMovieRow";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />

      <main className="catalogue">
        <h2>Explore Movies</h2>
        <GraphQLMovieRow />
      </main>

      <Footer />
    </>
  );
}