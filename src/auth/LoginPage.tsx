import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { validateLogin } from './validators';
import { useAuth } from '../features/auth';
import PasswordInput from './passwordImput';

export default function LoginPage() {
  const { login, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateLogin(email, password);
    setErrors(v);
    setFormError(null);
    if (Object.keys(v).length) return;

    try {
      await login({ email, password });
      navigate(isAdmin ? '/admin' : '/feed');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setFormError(errorMessage);
    }
  }

  return (
    <AuthLayout title="Inicia sesión">
      <form onSubmit={onSubmit} className="space-y-4">
        {formError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500" />
          <button
            type="button"
            className="text-[#1f6fb2] hover:underline"
            onClick={() => alert("Funcionalidad de recuperar contraseña (pendiente)")}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-[#1f6fb2] px-4 py-2 font-semibold text-white shadow hover:bg-[#195d92] disabled:opacity-60"
        >
          {isLoading ? 'Accediendo...' : 'Acceder al Sistema'}
        </button>

        <Link
          to="/"
          className="block w-full text-center rounded-lg border border-[#1f6fb2] px-4 py-2 font-semibold text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white transition"
        >
          Volver al inicio
        </Link>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link className="font-semibold text-[#1f6fb2] hover:underline" to="/auth/register">
            Crear una cuenta
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
