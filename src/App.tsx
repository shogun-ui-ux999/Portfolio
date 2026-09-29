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
    <div className="lamp-room grain min-h-dvh">
      <ScrollToTop />
      <BootCleaner />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Entrance />} />
          <Route path="/bedroom" element={<Bedroom />} />
          <Route path="/failures" element={<Failures />} />
          <Route path="/curator" element={<Curator />} />
          <Route path="/gift-shop" element={<GiftShop />} />
          <Route path="*" element={<Entrance />} />
        </Routes>
      </main>
      {/* Global overlays (CertificateView lives inside ArtifactModal) */}
      <Overlays />
    </div>
  );
}

/** Overlays render inside the shell so they share the museum context */
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
  // HashRouter keeps every deep link (e.g. /#/bedroom) working on static hosting
  return (
    <HashRouter>
      <MuseumProvider>
        <MuseumShell />
      </MuseumProvider>
    </HashRouter>
  );
}
