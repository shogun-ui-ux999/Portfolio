import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { secretArtifacts } from "../data/artifacts";

interface MuseumState {
  /** Artifact ids the visitor has opened */
  viewedIds: Set<string>;
  /** Opens the Artifact Modal for an id (and records it as viewed) */
  openArtifact: (id: string) => void;
  /** Currently open artifact id, if any */
  activeArtifactId: string | null;
  closeArtifact: () => void;
  /** Quick Tour overlay open state */
  tourOpen: boolean;
  openTour: () => void;
  closeTour: () => void;
  /** List View overlay open state */
  listViewOpen: boolean;
  openListView: () => void;
  closeListView: () => void;
  /** Set once both secret artifacts have been viewed */
  foundSecretCollection: boolean;
  /** Whether the visitor has entered the museum (Entrance → Bedroom) */
  entered: boolean;
  setEntered: (v: boolean) => void;
}

const MuseumContext = createContext<MuseumState | null>(null);

export function MuseumProvider({ children }: { children: ReactNode }) {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [listViewOpen, setListViewOpen] = useState(false);
  const [foundSecretCollection, setFoundSecretCollection] = useState(false);
  const [entered, setEntered] = useState(false);

  const openArtifact = useCallback((id: string) => {
    setActiveArtifactId(id);
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  // Subtle reward once the private collection has been fully viewed
  useEffect(() => {
    if (secretArtifacts.every((a) => viewedIds.has(a.id))) {
      setFoundSecretCollection(true);
    }
  }, [viewedIds]);

  const closeArtifact = useCallback(() => setActiveArtifactId(null), []);
  const openTour = useCallback(() => setTourOpen(true), []);
  const closeTour = useCallback(() => setTourOpen(false), []);
  const openListView = useCallback(() => setListViewOpen(true), []);
  const closeListView = useCallback(() => setListViewOpen(false), []);

  const value = useMemo(
    () => ({
      viewedIds,
      openArtifact,
      activeArtifactId,
      closeArtifact,
      tourOpen,
      openTour,
      closeTour,
      listViewOpen,
      openListView,
      closeListView,
      foundSecretCollection,
      entered,
      setEntered,
    }),
    [
      viewedIds,
      openArtifact,
      activeArtifactId,
      closeArtifact,
      tourOpen,
      openTour,
      closeTour,
      listViewOpen,
      openListView,
      closeListView,
      foundSecretCollection,
      entered,
    ]
  );

  return <MuseumContext.Provider value={value}>{children}</MuseumContext.Provider>;
}

export function useMuseum(): MuseumState {
  const ctx = useContext(MuseumContext);
  if (!ctx) throw new Error("useMuseum must be used within MuseumProvider");
  return ctx;
}
