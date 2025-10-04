// src/sections/Routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import GlobalLayout from "../layout/globalLayout";
import HomePage from "../pages/Homepage";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/Register";
import AdminDashboard from "../pages/AdminDashboard";
import NotFoundPage from "../pages/NotFoundPage";
import CategoriesDetail from "./categories/CategoriesDetail";
import Gallery from "./homepage/gallery";
import GalleryDetail from "./gallery/GalleryDetail";

export default function AppRoutes() {
  return (
    <Routes>
      {/* LANDING: Solo Header + Navbar */}
      <Route element={<GlobalLayout showTop />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* Combino lo tuyo y lo de tu compa */}
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/galeria/:id" element={<GalleryDetail />} />
        <Route path="/categorias/:slug" element={<CategoriesDetail />} />
      </Route>

      {/* ADMIN: solo Footer */}
      <Route element={<GlobalLayout showTop={false} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* AUTH sin layout */}
      <Route path="/auth">
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Alias planos y redirecciones */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/register" element={<Navigate to="/auth/register" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
