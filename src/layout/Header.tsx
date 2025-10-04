import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--gv-border)]">
      <div className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-1 select-none">
          <span className="text-2xl font-extrabold text-[var(--gv-primary)]">Guana</span>
          <span className="text-2xl font-extrabold text-[var(--gv-accent)]">Vive</span>
        </a>

        {/* Navbar */}
        <Navbar />
      </div>
    </header>
  );
}
