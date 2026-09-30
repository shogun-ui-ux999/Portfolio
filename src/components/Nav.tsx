import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";

const links = [
  { to: "/", label: "Entrance" },
  { to: "/bedroom", label: "Bedroom" },
  { to: "/failures", label: "Failures" },
  { to: "/curator", label: "Curator" },
  { to: "/gift-shop", label: "Gift Shop" },
];

/**
 * Museum wayfinding bar — glass strip across the top with a
 * glowing cyan "M" seal and subtle link pills.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { openListView } = useMuseum();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Seal — glowing cyan M */}
        <Link
          to="/"
          aria-label="Anchit's Museum — entrance"
          className="group flex items-center gap-3"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-800/80 font-display text-base font-bold text-cyan transition-all duration-300 group-hover:bg-cyan/10 group-hover:text-gold group-hover:shadow-[0_0_24px_rgba(0,212,255,0.4)]"
            style={{ textShadow: "0 0 12px rgba(0,212,255,0.6)" }}
          >
            M
          </span>
          <span className="hidden text-[0.55rem] text-paper-faint tracking-[0.3em] uppercase sm:block">
            Anchit&apos;s Museum
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
                `museum-label rounded-full px-3.5 py-2 text-[0.55rem] transition-all duration-300 ${
                  isActive
                    ? "bg-cyan/10 text-cyan shadow-[0_0_12px_rgba(0,212,255,0.15)]"
                    : "text-paper-faint hover:bg-white/5 hover:text-paper"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={openListView}
            className="museum-label ml-1 rounded-full border border-white/10 px-3.5 py-2 text-[0.55rem] text-paper-faint transition-all duration-300 hover:border-cyan/30 hover:text-cyan"
          >
            List
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-map"
          aria-label={open ? "Close museum map" : "Open museum map"}
          className="museum-label flex items-center gap-2 rounded-full border border-white/10 bg-deep-800/80 px-4 py-2 text-[0.55rem] text-paper-faint sm:hidden transition-all duration-300 hover:border-cyan/30 hover:text-cyan"
        >
          Map
          <span aria-hidden className="text-cyan">
            {open ? "×" : "≡"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-map"
          className="animate-fade-in mx-4 mt-2 rounded-2xl border border-cyan/20 bg-deep-800/95 p-4 shadow-[0_0_30px_rgba(0,212,255,0.08)] backdrop-blur-xl sm:hidden"
        >
          <nav aria-label="Museum map" className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `museum-label rounded-xl px-4 py-3 text-[0.6rem] transition-all duration-300 ${
                    isActive
                      ? "bg-cyan/10 text-cyan"
                      : "text-paper-faint hover:bg-white/5 hover:text-paper"
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
              className="museum-label mt-1 rounded-xl border border-white/10 px-4 py-3 text-left text-[0.6rem] text-paper-faint hover:border-cyan/30 hover:text-cyan"
            >
              Artifact List
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
