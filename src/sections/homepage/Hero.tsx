export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="min-h-[320px] sm:min-h-[400px] flex flex-col items-center justify-center text-center px-6"
        style={{
          background:
            "url('https://i.ibb.co/BVnG0bpQ/monta-a.jpg') center/cover no-repeat",
        }}
      >
        {/* Título con sombra mejorada */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-xl">
          Bienvenidos a{" "}
          <span className="text-[var(--gv-primary)] bg-white/80 px-2 rounded">
            Guana
          </span>
          <span className="text-[var(--gv-accent)] bg-white/80 px-2 rounded">
            Vive
          </span>
        </h1>

        {/* Descripción */}
        <p className="mt-3 max-w-2xl text-[var(--gv-text)] bg-white/70 px-4 py-2 rounded-lg text-lg">
          Descubrí la cultura guanacasteca y conocé a los artistas locales: música,
          danza, artesanía y más.
        </p>

        {/* Botones */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <a href="/categorias" className="btn btn-primary">
            Explorar categorías
          </a>

        </div>
      </div>
    </section>
  );
}
