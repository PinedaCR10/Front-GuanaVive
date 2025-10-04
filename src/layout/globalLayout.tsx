// src/layout/GlobalLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

type GlobalLayoutProps = {
  /** Si true, muestra Header + Navbar. En false solo deja el Footer. */
  showTop?: boolean;
  /** Por si en alguna ruta futura quieres ocultar el Footer también */
  showFooter?: boolean;
};

export default function GlobalLayout({
  showTop = false,
  showFooter = true,
}: GlobalLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Solo mostrar el Header + Navbar si showTop es true */}
      {showTop && (
        <>
          <Header />
        </>
      )}

      {/* Contenido de la página */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
