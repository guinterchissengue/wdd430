export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-6 mt-auto text-center border-t border-slate-800">
      <p className="text-sm">
        Copyright &copy; {currentYear} | Guinter Chissengue | All rights reserved
      </p>
    </footer>
  );
}