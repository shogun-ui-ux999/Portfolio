import { useEffect, useState } from "react";
import { useMuseum } from "../context/MuseumContext";
import { artifacts, type Artifact } from "../data/artifacts";

type Filter = "all" | "bedroom" | "failures" | "secret";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bedroom", label: "Bedroom" },
  { id: "failures", label: "Failures" },
  { id: "secret", label: "Secret" },
];

/**
 * Accessibility fallback — every artifact as a clean, readable list.
 * Opens the same ArtifactModal used everywhere else.
 */
export default function ListView() {
  const { listViewOpen, closeListView, openArtifact } = useMuseum();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (listViewOpen) setFilter("all");
  }, [listViewOpen]);

  useEffect(() => {
    if (!listViewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeListView();
    };
    window.addEventListener("keydown", onKey, true);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = "";
    };
  }, [listViewOpen, closeListView]);

  if (!listViewOpen) return null;

  const visible: Artifact[] = artifacts.filter((a) => {
    switch (filter) {
      case "bedroom":
        return a.position !== "failure-wing";
      case "failures":
        return a.position === "failure-wing";
      case "secret":
        return a.isSecret;
      default:
        return true;
    }
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full artifact list"
      className="animate-fade-in fixed inset-0 z-[82] flex items-start justify-center overflow-y-auto bg-night-950/88 p-4 backdrop-blur-sm sm:p-8"
      onClick={closeListView}
    >
      <div
        className="animate-fade-up my-6 w-full max-w-3xl rounded-2xl border border-museum-gold/35 bg-night-800 shadow-[0_24px_80px_rgba(0,0,0,0.75)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-6 sm:px-8 sm:pt-8">
          <div>
            <p className="museum-label text-[0.55rem] text-museum-gold">Collection Index</p>
            <h2 className="mt-1.5 font-serif text-2xl text-paper-50 sm:text-3xl">
              Every Artifact, On Record
            </h2>
            <p className="mt-1.5 text-sm text-paper-300/70">
              All twelve exhibits, from both wings of the museum.
            </p>
          </div>
          <button
            type="button"
            onClick={closeListView}
            aria-label="Close artifact list"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper-400/25 text-paper-300 transition-colors hover:border-amber-glow/60 hover:text-amber-glow"
          >
            <span aria-hidden className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter artifacts"
          className="mt-5 flex flex-wrap gap-2 px-5 sm:px-8"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`museum-label rounded-full border px-3.5 py-2 text-[0.55rem] transition-colors duration-300 ${
                filter === f.id
                  ? "border-amber-glow/70 bg-amber-glow/10 text-amber-glow"
                  : "border-paper-400/25 text-paper-300/70 hover:border-paper-300/50 hover:text-paper-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <ul className="px-3 pt-4 pb-6 sm:px-5 sm:pb-8">
          {visible.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => openArtifact(a.id)}
                className="group flex w-full items-center gap-4 rounded-xl border border-transparent px-3 py-3.5 text-left transition-all duration-300 hover:border-paper-400/20 hover:bg-night-700/50 focus-visible:border-museum-gold/50"
              >
                <span className="museum-label w-20 shrink-0 text-[0.55rem] text-museum-gold/80">
                  {a.exhibitNumber}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-[1.05rem] text-paper-50 group-hover:text-amber-glow">
                      {a.title}
                    </span>
                    {a.isSecret && (
                      <span className="museum-label rounded-sm border border-museum-gold/40 px-1.5 py-0.5 text-[0.45rem] text-museum-gold/80">
                        Private Item
                      </span>
                    )}
                    {a.isFailure && !a.isSecret && (
                      <span className="museum-label rounded-sm border border-fail-red/40 px-1.5 py-0.5 text-[0.45rem] text-fail-red">
                        Failure Exhibit
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate font-hand text-base text-paper-300/60">
                    {a.objectName}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-paper-200/70">
                    {a.shortLabel ?? a.story}
                  </span>
                </span>
                <span className="museum-label hidden shrink-0 text-[0.5rem] text-paper-300/40 sm:block">
                  {a.category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
