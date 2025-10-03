// src/sections/homepage/guanacaste.tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Guanacaste() {
  const { t } = useTranslation("guanacaste");

  return (
    <section
      className="py-12 md:py-16"
      style={{ background: "var(--bg)" }} // oscuro/claro desde index.css
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "#1f6fb2", textShadow: "0 2px 0 rgba(0,0,0,0.12)" }}
          >
            {t("TITLE", { defaultValue: "Esto es Guanacaste" })}
          </h2>

          <p
            className="mt-6 text-lg leading-8"
            style={{ color: "var(--text)" }}
          >
            {t("INTRO", {
              defaultValue:
                "Guanacaste es la provincia del sol, la cultura y la naturaleza exuberante de Costa Rica. Con una población de 354,154 (2022), es famosa por sus Más de 70 playas reconocidas de arena dorada y aguas cristalinas.",
            })}
          </p>

          <div
            className="mt-4 space-y-2 text-lg leading-8"
            style={{ color: "var(--text)" }}
          >
            <p>
              <span className="font-bold">{t("WHAT_DO", { defaultValue: "¿Qué se puede hacer?" })}</span>{" "}
              {t("WHAT_DO_TEXT", {
                defaultValue:
                  "Surf, avistamiento de tortugas, cabalgatas, senderismo, fiestas típicas, gastronomía, tours de hacienda, deportes acuáticos y más.",
              })}
            </p>
            <p>
              <span className="font-bold">{t("FAUNA_LABEL", { defaultValue: "Fauna:" })}</span>{" "}
              {t("FAUNA_TEXT", {
                defaultValue:
                  "Monos, iguanas, venados, tortugas marinas, aves exóticas, cocodrilos, jaguares.",
              })}
            </p>
            <p>
              <span className="font-bold">{t("FLORA_LABEL", { defaultValue: "Flora:" })}</span>{" "}
              {t("FLORA_TEXT", {
                defaultValue:
                  "Guanacaste (árbol nacional), ceibas, pochotes, manglares, bosques secos y tropicales.",
              })}
            </p>
          </div>

          <p
            className="mt-6 text-lg leading-8"
            style={{ color: "var(--text-soft)" }}
          >
            {t("OUTRO", {
              defaultValue:
                "Un destino donde la tradición y la biodiversidad se encuentran bajo el sol del Pacífico.",
            })}
          </p>
        </motion.div>

        {/* Tarjeta con mapa */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-3xl shadow-xl ring-1"
          style={{
            background: "var(--card)",
            borderColor: "var(--card-border)",
            // Tailwind ring usa color fijo; forzamos uno suave cross-theme:
            boxShadow: "var(--shadow)",
          }}
        >
          <div className="p-4 sm:p-6">
            <div
              className="rounded-2xl p-3 sm:p-4"
              style={{ background: "var(--bg-soft)" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/61/Mapa_de_Guanacaste.JPG"
                alt={t("ALT_MAP", {
                  defaultValue: "Mapa de Costa Rica con Guanacaste destacada",
                })}
                className="mx-auto h-[360px] w-full max-w-[760px] object-contain"
              />
            </div>

            {/* Línea decorativa inferior */}
            <div
              className="mt-6 border-b-2"
              style={{ borderColor: "var(--card-border)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
