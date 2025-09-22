// src/sections/Routes.tsx 
import { Routes, Route } from "react-router-dom";
import GlobalLayout from "../layout/globalLayout";
import HomePage from "../pages/Homepage";
import LoginPage from "../auth/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";
import NotFoundPage from "../pages/NotFoundPage";
import CategoriesDetail from "./categories/CategoriesDetail";
import Gallery from "./homepage/gallery";
import GalleryDetail from "./gallery/GalleryDetail";


export default function AppRoutes() {
  return (
    <Routes>
      {/* LANDING: Header + Navbar + Footer */}
      <Route element={<GlobalLayout showTop />}>
        <Route path="/" element={<HomePage />} />
        {/* Vista galería resumida */}
        <Route path="/gallery" element={<Gallery />} />
        {/* Vista detalle galería */}
        <Route path="/galeria" element={<GalleryDetail />} />
        {/* Vista detalle de categorías */}
        <Route path="/categorias/:slug" element={<CategoriesDetail />} />
      </Route>

      {/* INFORMATIVA / ADMIN: solo Footer */}
      <Route element={<GlobalLayout showTop={false} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        {/* también podrías anidar subrutas: /admin/* */}
      </Route>

      {/* LOGIN: sin Header, sin Navbar, sin Footer */}
      <Route path="/login" element={<LoginPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
