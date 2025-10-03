import React from "react";

type Props = { children: React.ReactNode; title?: string; subtitle?: string };

export default function AuthLayout({ children, title, subtitle }: Props) {
  return (
    <div className="min-h-screen bg-[#F4F7F5]">
      {/* grilla a pantalla completa, sin max-width */}
      <div className="grid min-h-screen w-screen grid-cols-1 lg:grid-cols-2">
        {/* Columna izquierda: ocupa toda la mitad y 100vh */}
        <div className="relative hidden min-h-screen lg:block">
          <img
            src="https://www.latamairlines.com/content/dam/latamxp/sites/vamos-latam/news-costa-rica/lista-latam/Lista3.png"
            alt="Vista de Guanacaste"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* overlay opcional para contraste del texto */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="pointer-events-none absolute bottom-10 left-10 z-10 text-white drop-shadow">
            <h1 className="text-5xl font-extrabold">Accede a GuanaVive</h1>
            <p className="mt-2 max-w-md text-lg">
              Descubre todo lo que Guanacaste tiene para ofrecerte.
            </p>
          </div>
        </div>

        {/* Columna derecha: card */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#1f6fb2]">GuanaVive</h2>
              <p className="text-sm text-gray-500">Panel Administrativo • Acceso</p>
            </div>

            {title && <h3 className="mb-1 text-lg font-semibold">{title}</h3>}
            {subtitle && <p className="mb-4 text-sm text-gray-500">{subtitle}</p>}

            {children}

            <div className="mt-8 h-px w-full bg-gray-200" />
            <p className="mt-3 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} GuanaVive • v2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
