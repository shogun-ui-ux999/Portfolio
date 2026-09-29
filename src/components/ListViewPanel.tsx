import { useEffect, useMemo, useState } from "react";
import type { Artifact } from "../data/artifacts";
import { allArtifacts, bedroomArtifacts, failureArtifacts } from "../data/artifacts";

type ListFilter = "all" | "bedroom" | "failures" | "secret";

interface ListViewPanelProps {
  onSelectArtifact: (artifact: Artifact) => void;
  onClose: () => void;
}

const filterTabs: Array<{ id: ListFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "bedroom", label: "Bedroom" },
  { id: "failures", label: "Failures" },
  { id: "secret", label: "Secret" },
];

/**
 * The Master Catalog — an accessible list of every artifact in
 * the museum, with filter tabs. Secrets are always listed but
 * carry a "Private Item" tag. Selecting an item opens its plaque.
 */
export default function ListViewPanel({
  onSelectArtifact,
  onClose,
}: ListViewPanelProps) {
  const [filter, setFilter] = useState<ListFilter>("all");

  // Escape closes the catalog.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const items: Artifact[] = useMemo(() => {
    switch (filter) {
      case "bedroom":
        return bedroomArtifacts;
      case "failures":
        return failureArtifacts;
      case "secret":
        return allArtifacts.filter((a) => a.isSecret);
      default:
        return allArtifacts;
    }
  }, [filter]);

  return (
    <div
      className="fixed inset-0 z-[110] overflow-y-auto bg-night-950/90 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="list-view-title"
        className="mx-auto w-full max-w-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 rounded-t-xl border border-paper-400/15 bg-night-850/90 px-5 py-4">
          <div>
            <p className="museum-eyebrow">Master Catalog</p>
            <h2
              id="list-view-title"
              className="mt-1 font-serif text-xl font-semibold text-paper-50"
            >
              Every Artifact in the Museum
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close artifact list"
            className="rounded-full border border-paper-400/25 p-2 text-paper-300 transition-colors hover:border-amber-lamp/60 hover:text-amber-glow"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 border-x border-t border-paper-400/15 bg-night-900/90 px-5 py-3">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              aria-pressed={filter === tab.id}
              className={`rounded-full px-4 py-1.5 font-type text-[0.6rem] uppercase tracking-[0.25em] transition-colors ${
                filter === tab.id
                  ? "bg-amber-lamp/15 text-amber-glow"
                  : "border border-paper-400/20 text-paper-300 hover:text-paper-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <ul className="space-y-3 rounded-b-xl border border-paper-400/15 bg-night-900/90 p-5">
          {items.map((artifact) => (
            <li key={artifact.id}>
              <button
                type="button"
                onClick={() => onSelectArtifact(artifact)}
                aria-label={`Open ${artifact.exhibitNumber}: ${artifact.title}`}
                className="w-full rounded-md border border-paper-400/10 bg-night-800/60 p-4 text-left transition-colors hover:border-amber-lamp/40"
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-type text-[0.6rem] uppercase tracking-[0.3em] ${
                      artifact.isFailure ? "text-brick-400" : "text-amber-lamp/80"
                    }`}
                  >
                    {artifact.exhibitNumber}
                  </span>
                  {artifact.isSecret && (
                    <span className="rounded-full border border-gold-400/40 bg-gold-400/10 px-2 py-0.5 font-type text-[0.55rem] uppercase tracking-[0.2em] text-gold-400">
                      Private Item
                    </span>
                  )}
                  {artifact.isFailure && (
                    <span className="rounded-full border border-brick-400/40 bg-brick-400/10 px-2 py-0.5 font-type text-[0.55rem] uppercase tracking-[0.2em] text-brick-400">
                      Failure Exhibit
                    </span>
                  )}
                </span>
                <span className="mt-1.5 block font-serif text-sm font-semibold text-paper-100">
                  {artifact.title}
                </span>
                <span className="mt-0.5 block text-xs italic text-paper-400">
                  {artifact.objectName}
                </span>
                <span className="mt-2 block text-[0.7rem] text-paper-300/70">
                  <span className="capitalize">{artifact.category}</span>
                  <span className="mx-1.5">·</span>
                  <span className="capitalize">{artifact.position}</span>
                </span>
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="rounded-md border border-paper-400/10 p-4 text-sm text-paper-400">
              Nothing catalogued in this wing yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
