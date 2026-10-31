import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movies = [
  {
    title: "Inception",
    description: "A skilled thief enters people's dreams.",
    genre: "Sci-Fi",
    releaseYear: 2010,
    posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    duration: 148,
    featured: true,
  },
  {
    title: "Interstellar",
    description: "Explorers travel through space to find a new home.",
    genre: "Sci-Fi",
    releaseYear: 2014,
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    duration: 169,
    featured: true,
  },
  {
    title: "The Dark Knight",
    description: "Batman faces a dangerous criminal in Gotham.",
    genre: "Action",
    releaseYear: 2008,
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    duration: 152,
    featured: false,
  },
  {
    title: "The Matrix",
    description: "A programmer discovers the nature of reality.",
    genre: "Sci-Fi",
    releaseYear: 1999,
    posterUrl: "https://image.tmdb.org/t/p/w500/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
    duration: 136,
    featured: false,
  },
  {
    title: "The Shawshank Redemption",
    description: "Two prisoners develop a lasting friendship.",
    genre: "Drama",
    releaseYear: 1994,
    posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    duration: 142,
    featured: false,
  },
];

async function main() {
  for (const movie of movies) {
    const id = movie.title.toLowerCase().replaceAll(" ", "-");
    await prisma.movie.upsert({
      where: { id },
      update: movie,
      create: {
        ...movie,
        id,
      },
    });
  }

  console.log("Demo movies added.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
