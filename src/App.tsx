import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MuseumLayout from "./components/MuseumLayout";
import EntrancePage from "./pages/EntrancePage";
import BedroomPage from "./pages/BedroomPage";
import FailuresPage from "./pages/FailuresPage";
import CuratorPage from "./pages/CuratorPage";
import GiftShopPage from "./pages/GiftShopPage";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * Preparing screen — the museum "unlocking" while fonts and the
 * bedroom scene warm up. The amber dot pulses like the lamp
 * coming on.
 */
function MuseumLoading({ done }: { done: boolean }) {
  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night-950 transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span
        className="h-3 w-3 rounded-full bg-amber-glow shadow-lamp"
        style={{ animation: "loadingGlow 1.4s ease-in-out infinite" }}
      />
      <p className="mt-5 font-type text-[0.65rem] uppercase tracking-[0.35em] text-paper-300/80">
        Preparing the museum&hellip;
      </p>
    </div>
  );
}

/**
 * App shell — 5 museum wings + a graceful fallback.
 * The persistent museum-map navigation lives in MuseumLayout.
 */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload the bedroom scene so the first step inside is instant.
    const img = new Image();
    const finish = () => setLoaded(true);

    img.onload = finish;
    img.onerror = finish; // never trap the visitor behind a missing asset
    img.src = "/assets/bedroom-background.svg";

    // Safety net: at most ~1.2s of "Preparing the museum..."
    const timer = window.setTimeout(finish, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <MuseumLoading done={loaded} />
      <Routes>
        <Route element={<MuseumLayout />}>
          <Route path="/" element={<EntrancePage />} />
          <Route path="/bedroom" element={<BedroomPage />} />
          <Route path="/failures" element={<FailuresPage />} />
          <Route path="/curator" element={<CuratorPage />} />
          <Route path="/gift-shop" element={<GiftShopPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
