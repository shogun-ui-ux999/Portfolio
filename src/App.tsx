import { useEffect, type ReactNode } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MuseumProvider } from "./context/MuseumContext";
import Nav from "./components/Nav";
import ArtifactModal from "./components/ArtifactModal";
import QuickTour from "./components/QuickTour";
import ListView from "./components/ListView";
import SecretToast from "./components/SecretToast";
import CursorGlow from "./components/CursorGlow";
import Starfield from "./components/Starfield";
import Entrance from "./pages/Entrance";
import Bedroom from "./pages/Bedroom";
import Failures from "./pages/Failures";
import Curator from "./pages/Curator";
import GiftShop from "./pages/GiftShop";

/** Scrolls to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

/** Removes the pre-React boot screen once the app has mounted */
function BootCleaner() {
  useEffect(() => {
    document.getElementById("museum-boot")?.remove();
  }, []);
  return null;
}

function MuseumShell() {
  return (
    <div className="relative min-h-dvh bg-deep-950 overflow-x-hidden">
      {/* Background layers — behind everything */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <Starfield />
        <div className="nebula animate-orbFloat1"
          style={{ width: "600px", height: "600px", top: "10%", right: "5%", background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="nebula animate-orbFloat2"
          style={{ width: "500px", height: "500px", bottom: "15%", left: "8%", background: "radial-gradient(circle, rgba(255,45,120,0.06) 0%, transparent 70%)" }}
        />
        <div className="vignette" />
        <div className="scanlines" />
      </div>

      {/* Cursor glow */}
      <CursorGlow />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <ScrollToTop />
        <BootCleaner />
        <Nav />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Entrance />} />
            <Route path="/bedroom" element={<Bedroom />} />
            <Route path="/failures" element={<Failures />} />
            <Route path="/curator" element={<Curator />} />
            <Route path="/gift-shop" element={<GiftShop />} />
            <Route path="*" element={<Entrance />} />
          </Routes>
        </main>
      </div>

      {/* Global overlays */}
      <Overlays />
    </div>
  );
}

function Overlays(): ReactNode {
  return (
    <>
      <ArtifactModal />
      <QuickTour />
      <ListView />
      <SecretToast />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <MuseumProvider>
        <MuseumShell />
      </MuseumProvider>
    </HashRouter>
  );
}
