import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { validateRegister } from './validators';
import { useAuth } from '../features/auth';
import PasswordInput from './passwordImput';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateRegister(form);
    setErrors(v);
    setFormError(null);
    setSuccessMessage(null);
    if (Object.keys(v).length) return;

    try {
      await register(form);
      setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar';
      setFormError(errorMessage);
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

        {successMessage && (
          <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gv-text)]">Nombre</label>
            <input
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              placeholder="Tu nombre"
              className={`w-full rounded-lg border bg-[var(--gv-surface)] text-[var(--gv-text)] px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                errors.firstName ? 'border-red-400' : 'border-[var(--gv-border)]'
              }`}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gv-text)]">Apellido</label>
            <input
              value={form.lastName}
              onChange={(e) => set('lastName', e.target.value)}
              placeholder="Tu apellido"
              className={`w-full rounded-lg border bg-[var(--gv-surface)] text-[var(--gv-text)] px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                errors.lastName ? 'border-red-400' : 'border-[var(--gv-border)]'
              }`}
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--gv-text)]">Correo</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={`w-full rounded-lg border bg-[var(--gv-surface)] text-[var(--gv-text)] px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
              errors.email ? "border-red-400" : "border-[var(--gv-border)]"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--gv-text)]">Contraseña</label>
          <PasswordInput
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            placeholder="Ej: Password123"
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          {!errors.password && (
            <p className="mt-1 text-xs text-[var(--gv-muted)]">
              Debe contener mayúscula, minúscula y número (6-20 caracteres)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-[var(--gv-primary)] px-4 py-2 font-semibold text-white shadow hover:bg-[var(--gv-primary-600)] disabled:opacity-60"
        >
          {isLoading ? 'Creando cuenta...' : 'Registrarme'}
        </button>

        <Link
          to="/"
          className="block w-full text-center rounded-lg border border-[var(--gv-primary)] px-4 py-2 font-semibold text-[var(--gv-primary)] hover:bg-[var(--gv-primary)] hover:text-white transition"
        >
          Volver al inicio
        </Link>

        <p className="text-center text-sm text-[var(--gv-muted)]">
          ¿Ya tienes cuenta?{" "}
          <Link className="font-semibold text-[var(--gv-primary)] hover:underline" to="/auth/login">
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
