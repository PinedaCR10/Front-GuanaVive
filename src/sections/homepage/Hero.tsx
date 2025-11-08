import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const images = [
  "/images/homepage/667a3893-a888-4ca7-b1e6-8c35979e8823.JPG",
  "/images/homepage/a2023438-cc55-4d91-b682-9615d596032e.JPG",
  "/images/homepage/ac0f70a4-f026-451a-a830-18a328fdf6d3.JPG",
  "/images/homepage/c9a9cbfb-a9ce-4551-b93c-b5ddfaa799b8.JPG",
  "/images/homepage/fd94e815-c568-4b0f-8e10-9d88df5d729b.JPG",
];

export default function Hero() {
  const { t } = useTranslation("hero");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden h-screen">
      {/* Carrusel de imágenes */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      {/* Overlay sutil para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 z-0" />
      
      {/* Contenido */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-4">
          {/* Título con mejor diseño sin fondo */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-2xl leading-tight">
            <span className="block mb-2 text-white drop-shadow-lg">{t("WELCOME", { defaultValue: "Bienvenidos a" })}</span>
            <span className="inline-block">
              <span className="inline-block text-[var(--gv-primary)] drop-shadow-lg">
                {t("GUANA", { defaultValue: "Guana" })}
              </span>
              <span className="inline-block text-red-500 drop-shadow-lg">
                {t("VIVE", { defaultValue: "Vive" })}
              </span>
            </span>
          </h1>

          {/* Descripción mejorada */}
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-medium leading-relaxed px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 shadow-xl">
            <span className="block mb-2 text-red-500 font-bold drop-shadow-lg">
              {t("DISCOVER", { defaultValue: "Descubrí la cultura guanacasteca" })}
            </span>
            <span className="text-white drop-shadow-lg">
              {t("AND_KNOW", { defaultValue: "y conocé a los artistas locales:" })}{" "}
              <span className="font-bold text-red-500">{t("MUSIC", { defaultValue: "música" })}</span>,{" "}
              <span className="font-bold text-[var(--gv-primary)]">{t("DANCE", { defaultValue: "danza" })}</span>,{" "}
              <span className="font-bold text-red-500">{t("CRAFTS", { defaultValue: "artesanía" })}</span> {t("AND_MORE", { defaultValue: "y más." })}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
