import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";

const links = [
  { to: "/", label: "Entrance" },
  { to: "/bedroom", label: "Bedroom" },
  { to: "/failures", label: "Failures" },
  { to: "/curator", label: "Curator's Note" },
  { to: "/gift-shop", label: "Gift Shop" },
];

/**
 * Museum wayfinding: an "M" seal that opens a small map panel.
 * Collapses to a full-screen menu on mobile.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { openListView } = useMuseum();

  // Close the map whenever the route changes
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Seal */}
        <Link
          to="/"
          aria-label="Anchit's Museum — entrance"
          className="group flex items-center gap-3"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-museum-gold/50 bg-night-800/80 font-serif text-base text-museum-gold shadow-[0_0_18px_rgba(201,161,92,0.15)] transition-all duration-300 group-hover:border-museum-gold group-hover:shadow-[0_0_24px_rgba(201,161,92,0.35)]"
          >
            M
          </span>
          <span className="museum-label hidden text-[0.6rem] text-paper-300/70 sm:block">
            Anchit's Museum
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Museum map" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `museum-label rounded-full px-3.5 py-2 text-[0.6rem] transition-colors duration-300 ${
                  isActive
                    ? "bg-night-700/80 text-amber-glow"
                    : "text-paper-300/60 hover:bg-night-700/50 hover:text-paper-200"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={openListView}
            className="museum-label ml-1 rounded-full border border-paper-400/20 px-3.5 py-2 text-[0.6rem] text-paper-300/70 transition-colors duration-300 hover:border-amber-glow/40 hover:text-amber-glow"
          >
            Artifact List
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-map"
          aria-label={open ? "Close museum map" : "Open museum map"}
          className="museum-label flex items-center gap-2 rounded-full border border-paper-400/25 bg-night-800/80 px-4 py-2 text-[0.6rem] text-paper-200 md:hidden"
        >
          Map
          <span aria-hidden className="text-amber-glow">
            {open ? "×" : "≡"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-map"
          className="animate-fade-in mx-4 rounded-2xl border border-museum-gold/20 bg-night-800/95 p-4 shadow-2xl backdrop-blur-md md:hidden"
        >
          <nav aria-label="Museum map" className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `museum-label rounded-xl px-4 py-3 text-[0.65rem] transition-colors ${
                    isActive
                      ? "bg-night-700 text-amber-glow"
                      : "text-paper-300/80 hover:bg-night-700/60"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openListView();
              }}
              className="museum-label mt-1 rounded-xl border border-paper-400/20 px-4 py-3 text-left text-[0.65rem] text-paper-300/80 hover:border-amber-glow/40 hover:text-amber-glow"
            >
              Artifact List
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
