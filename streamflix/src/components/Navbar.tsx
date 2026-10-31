import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link href="/" className="logo">
        STREAMFLIX
      </Link>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/home">Movies</Link>
        <Link href="/watchlist">My List</Link>

        <SignedOut>
          <Link href="/sign-in">Login</Link>
          <Link href="/sign-up">Sign Up</Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}