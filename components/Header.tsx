import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Guinter Chissengue</div>
        <nav aria-label="Main Navigation">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-1 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-1 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}