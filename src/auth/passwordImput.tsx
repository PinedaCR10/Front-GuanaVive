import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput(props: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`w-full rounded-lg border border-[var(--gv-border)] bg-[var(--gv-surface)] text-[var(--gv-text)] px-4 py-2 pr-10 outline-none
          focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${props.className || ""}`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gv-muted)] hover:text-[var(--gv-text)]"
        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
