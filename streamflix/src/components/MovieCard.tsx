import Link from "next/link";

type Props = {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  posterUrl: string;
};

export default function MovieCard(props: Props) {
  return (
    <Link
      href={`/movies/${props.id}`}
      className="movie-card"
    >
      <img src={props.posterUrl} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.genre} · {props.releaseYear}</p>
    </Link>
  );
}