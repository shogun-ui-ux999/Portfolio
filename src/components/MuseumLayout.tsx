import { NavLink, Link, Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

/** The five wings of the museum, in walking order. */
const wings = [
  { to: "/", label: "Entrance" },
  { to: "/bedroom", label: "The Bedroom" },
  { to: "/failures", label: "Museum of Failures" },
  { to: "/curator", label: "Curator's Note" },
  { to: "/gift-shop", label: "The Gift Shop" },
];

/**
 * Minimal, elegant museum navigation — a thin brass rail across
 * the top with a small wordmark. Collapses to a scrollable rail
 * on small screens.
 */
export default function MuseumLayout() {
  return (
    <div className="grain flex min-h-screen flex-col">
      <ScrollToTop />

      <header className="sticky top-0 z-40 border-b border-paper-400/10 bg-night-950/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex items-baseline gap-2 whitespace-nowrap"
          >
            <span className="font-serif text-lg font-semibold tracking-wide text-paper-50 transition-colors group-hover:text-amber-glow">
              Anchit&rsquo;s Museum
            </span>
            <span className="hidden font-type text-[0.6rem] uppercase tracking-[0.3em] text-amber-lamp/70 sm:inline">
              est. 2026
            </span>
          </Link>

          {/* Museum map rail */}
          <nav aria-label="Museum map" className="min-w-0 overflow-x-auto">
            <ul className="flex items-center gap-1 text-sm sm:gap-2">
              {wings.map((wing) => (
                <li key={wing.to}>
                  <NavLink
                    to={wing.to}
                    end={wing.to === "/"}
                    className={({ isActive }) =>
                      `whitespace-nowrap rounded-full px-3 py-1.5 transition-colors duration-200 ${
                        isActive
                          ? "bg-amber-lamp/15 text-amber-glow"
                          : "text-paper-300 hover:text-paper-50"
                      }`
                    }
                  >
                    {wing.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-paper-400/10 py-8">
        <p className="text-center font-type text-[0.65rem] uppercase tracking-[0.3em] text-paper-400/60">
          Anchit&rsquo;s Museum — The Bedroom Museum
        </p>
      </footer>
    </div>
  );
}
