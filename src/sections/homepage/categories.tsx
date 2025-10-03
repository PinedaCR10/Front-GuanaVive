// src/sections/homepage/categories.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

// FABs / tema / i18n
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";

// Iconitos inline
const Sun = () => (<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79l1.8-1.79m10.48 0l1.79-1.79l1.79 1.79l-1.79 1.79l-1.79-1.79M12 4V1h0v3h0m0 19v-3h0v3h0M4 12H1v0h3v0m22 0h-3v0h3v0M6.76 19.16l-1.8 1.79l-1.79-1.79l1.79-1.79l1.8 1.79m10.48 0l1.79 1.79l1.79-1.79l-1.79-1.79l-1.79 1.79M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8Z"/></svg>);
const Moon = () => (<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20.742 13.045A8 8 0 0 1 11 3a8 8 0 1 0 9.742 10.045Z"/></svg>);
const Lang = () => (<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7h10v2h-4.08A15 15 0 0 1 20 17h-2a13 13 0 0 0-1.74-5H11V7Zm-1-4h2v2h-2V3ZM3 5h6v2H6.46A17 17 0 0 0 9.4 11h3.1v2H9.98c.44.88.98 1.72 1.62 2.5l-1.56 1.25A14 14 0 0 1 8.2 13H5v-2h2.36A15 15 0 0 1 5.6 7H3V5Z"/></svg>);

type Category = { slug: string; title: string; description: string; image: string };

const BASE: Omit<Category, "image">[] = [
  { slug: "bailes",      title: "Bailes",      description: "Expresiones de identidad y tradición a través del movimiento." },
  { slug: "musica",      title: "Música",      description: "Sonidos que cuentan la historia viva del folclor guanacasteco." },
  { slug: "retahileros", title: "Retahileros", description: "Narradores populares que preservan nuestras raíces orales." },
  { slug: "eventos",     title: "Eventos",     description: "Escenarios donde se vive la historia y tradición." },
  { slug: "artesanos",   title: "Artesanos",   description: "Manos que transforman cultura en piezas únicas." },
  { slug: "haciendas",   title: "Haciendas",   description: "Arquitectura y tradición de la pampa." },
];

const gridV: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardV: Variants = { hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.28 } } };

export default function Categories() {
  const navigate = useNavigate();

  // i18n de este componente: usa el namespace "categorias"
  const { t, i18n } = useTranslation("categorias");

  // tema para el FAB
  const { pref, setPref } = useTheme();
  const isDark = (() => {
    if (pref === "dark") return true;
    if (pref === "light") return false;
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  })();

  const categories: Category[] = useMemo(
    () => BASE.map((c, i) => ({ ...c, image: `https://picsum.photos/seed/gv-cat-${i}/1200/750` })),
    []
  );

  const go = (slug: string) => navigate(`/categorias/${slug}`);

  // estilos FAB (sin tocar tu CSS/TW)
  const fabWrap: React.CSSProperties = {
    position: "fixed", right: 20, bottom: 20, display: "flex", flexDirection: "column", gap: 12, zIndex: 50,
  };
  const fabBtn: React.CSSProperties = {
    width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center",
    borderRadius: 999, border: "1px solid rgba(0,0,0,.08)",
    background: "var(--card)", color: "var(--text)", boxShadow: "var(--shadow)",
  };

  return (
    <section className="py-8">
      {/* FABs */}
      <div style={fabWrap}>
        <button
          style={fabBtn}
          onClick={() => setPref(isDark ? "light" : "dark")}
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          title={isDark ? "Modo claro" : "Modo oscuro"}
        >
          {isDark ? <Sun/> : <Moon/>}
        </button>

        <button
          style={fabBtn}
          onClick={() => {
            const next = i18n.language?.startsWith("es") ? "en" : "es";
            i18n.changeLanguage(next);
            localStorage.setItem("i18nextLng", next);
            document.documentElement.setAttribute("lang", next);
          }}
          aria-label="Cambiar idioma ES/EN"
          title="Cambiar idioma ES/EN"
        >
          <Lang/>
        </button>
      </div>

      {/* Tu layout original */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <header className="mb-7">
          <h1 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("TITLE", { defaultValue: "Categorías" })}
          </h1>
        </header>

        <motion.div
          variants={gridV}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {categories.map((cat) => (
            <motion.article
  key={cat.slug}
  variants={cardV}
  onClick={() => go(cat.slug)}
  tabIndex={0}
  role="button"
  aria-label={`Abrir ${cat.title}`}
  className="group rounded-xl border shadow-sm outline-none transition
             hover:-translate-y-0.5 hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
  style={{
    background: "var(--card)",
    borderColor: "var(--card-border)",
    color: "var(--text)"
  }}
>
  <div className="w-full overflow-hidden rounded-t-xl"
       style={{ background: "var(--bg-soft)" }}>
    <img
      src={cat.image}
      alt={cat.title}
      className="h-[120px] sm:h-[135px] md:h-[150px] lg:h-[160px] w-full object-cover transition group-hover:scale-[1.03]"
      loading="lazy"
    />
  </div>

  <div className="space-y-2 p-3">
    <div>
      <h2
        className="text-sm md:text-base font-semibold"
        style={{ color: "var(--text)" }}
      >
        {t(`items.${cat.slug}.title`, { defaultValue: cat.title })}
      </h2>
      <p
        className="text-xs md:text-sm"
        style={{ color: "var(--text-soft)" }}
      >
        {t(`items.${cat.slug}.desc`, { defaultValue: cat.description })}
      </p>
    </div>
    <div className="pointer-events-none">
      <span className="inline-flex w-full items-center justify-center rounded-md bg-[#1f6fb2] text-white px-3 py-1.5 text-xs md:text-sm font-semibold">
        {t("SEE_MORE", { defaultValue: "Ver más" })}
      </span>
    </div>
  </div>
</motion.article>

          ))}
        </motion.div>
      </div>
    </section>
  );
}
