import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

import { validateRegister } from "./validators";
import { useAuth } from "../hooks/useAuth";
import PasswordInput from "./passwordImput";

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateRegister(form);
    setErrors(v);
    setFormError(null);
    if (Object.keys(v).length) return;

    try {
      await register(form);
      navigate("/auth/login"); // al terminar registro, ir a login
    } catch (err: any) {
      setFormError(err?.message || "Error al registrar");
    }
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Regístrate para administrar tu plataforma"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {formError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Tu nombre"
              className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2] ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Usuario</label>
            <input
              value={form.username}
              onChange={(e) => set("username", e.target.value)}
              placeholder="usuario123"
              className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2] ${
                errors.username ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2] ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
          <PasswordInput
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            placeholder="Mínimo 6 caracteres"
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-[#1f6fb2] px-4 py-2 font-semibold text-white shadow hover:bg-[#195d92] disabled:opacity-60"
        >
          {loading ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link className="font-semibold text-[#1f6fb2] hover:underline" to="/auth/login">
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
