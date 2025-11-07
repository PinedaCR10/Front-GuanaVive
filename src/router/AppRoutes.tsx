import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute, AdminRoute, PrivateRoute } from '../shared/guards';
import GlobalLayout from '../layout/globalLayout';
import HomePage from '../pages/Homepage';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/Register';
import AdminDashboard from '../pages/AdminDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import MyPublicationsPage from '../pages/MyPublications';
import CreateEditPublication from '../pages/CreateEditPublication';
import UserFeed from '../pages/UserFeed';
import UserHome from '../accessusers/UserHome';
import UserProfile from '../pages/UserProfile';
import UserDashboard from '../pages/UserDashboard';
import PlansPage from '../pages/PlansPage';
import CategoriesDetail from '../sections/categories/CategoriesDetail';
import Gallery from '../sections/homepage/gallery';
import GalleryDetail from '../sections/gallery/GalleryDetail';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes (anyone can access) */}
      <Route element={<GlobalLayout showTop />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/galeria/:id" element={<GalleryDetail />} />
        <Route path="/categorias/:slug" element={<CategoriesDetail />} />
      </Route>

      {/* Auth Routes (only for non-authenticated users) */}
       <Route element={<PublicRoute redirectTo="/" />}> 
        <Route path="/auth">
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route> 

      {/* Private Routes (only for authenticated users) */}
       <Route element={<PrivateRoute redirectTo="/auth/login" />}> 
        <Route element={<GlobalLayout showTop />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/feed" element={<UserFeed />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/my-publications" element={<MyPublicationsPage />} />
          <Route path="/my-publications/create" element={<CreateEditPublication />} />
          <Route path="/my-publications/edit/:id" element={<CreateEditPublication />} />
        </Route>
       </Route> 

      {/* Admin Routes (only for authenticated admin users) */}
       <Route element={<AdminRoute redirectTo="/" />}> 
        <Route element={<GlobalLayout showTop={false} />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
       </Route>

      {/* Redirects */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/register" element={<Navigate to="/auth/register" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
