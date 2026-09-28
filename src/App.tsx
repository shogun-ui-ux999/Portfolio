import { Route, Routes } from "react-router-dom";
import MuseumLayout from "./components/MuseumLayout";
import EntrancePage from "./pages/EntrancePage";
import BedroomPage from "./pages/BedroomPage";
import FailuresPage from "./pages/FailuresPage";
import CuratorPage from "./pages/CuratorPage";
import GiftShopPage from "./pages/GiftShopPage";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * App shell — 5 museum wings + a graceful fallback.
 * The persistent museum-map navigation lives in MuseumLayout.
 */
export default function App() {
  return (
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
  );
}
