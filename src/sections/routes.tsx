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
      <Route element={<GlobalLayout showTop />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/galeria/:id" element={<GalleryDetail />} />
        <Route path="/categorias/:slug" element={<CategoriesDetail />} />
      </Route>

      <Route element={<GlobalLayout showTop={false} />}>
        {/* Importante: /* para que AdminDashboard maneje /admin y sus hijos */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Route>

      <Route path="/auth">
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/register" element={<Navigate to="/auth/register" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
