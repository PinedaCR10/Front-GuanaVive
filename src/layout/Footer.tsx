import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="py-10 mt-16 text-white"
      style={{
        background: `
          linear-gradient(
            135deg,
            rgba(0, 56, 168, 0.7) 0%,    /* azul */
            rgba(0, 128, 0, 0.5) 40%,    /* verde */
            rgba(188, 0, 0, 0.7) 80%     /* rojo */
          ),
          rgba(0, 0, 0, 0.2)               /* overlay negro para contraste */
        `,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Información de derechos */}
        <p className="text-center md:text-left text-sm md:text-base font-semibold drop-shadow">
          &copy; {new Date().getFullYear()} GuanaVive. Todos los derechos reservados.
        </p>

        {/* Redes y contacto */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <a
            href="mailto:contacto@guanavive.cr"
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <FaEnvelope /> contacto@guanavive.cr
          </a>
          <a
            href="https://www.facebook.com/Guanavive"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <FaFacebookF /> Facebook
          </a>
          <a
            href="https://www.instagram.com/Guanavive"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <FaInstagram /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
