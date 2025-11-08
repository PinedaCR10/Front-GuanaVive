import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import AuthLayout from './AuthLayout';
import { validateLogin } from './validators';
import { useAuth } from '../features/auth';
import PasswordInput from './passwordImput';
import { ENV } from '../core/config';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      setErrors((prev) => ({ ...prev, recaptcha: '' }));
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validar campos del formulario
    const v = validateLogin(email, password);
    setErrors(v);
    setFormError(null);
    
    // Validar reCAPTCHA
    if (!recaptchaToken) {
      setErrors((prev) => ({ ...prev, recaptcha: 'Por favor, completa el reCAPTCHA' }));
      return;
    }
    
    if (Object.keys(v).length) return;

    try {
      await login({ email, password });
      // El PublicRoute se encargará de redirigir automáticamente
      // según el rol del usuario (admin -> /admin, user -> /dashboard)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setFormError(errorMessage);
      // Resetear reCAPTCHA en caso de error
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
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
          <label className="mb-1 block text-sm font-medium text-[var(--gv-text)]">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={`w-full rounded-lg border px-4 py-2 bg-[var(--gv-surface)] text-[var(--gv-text)] outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
              errors.email ? "border-red-400" : "border-[var(--gv-border)]"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--gv-text)]">Contraseña</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--gv-muted)]" />
          <button
            type="button"
            className="text-[var(--gv-primary)] hover:underline"
            onClick={() => alert("Funcionalidad de recuperar contraseña (pendiente)")}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Google reCAPTCHA */}
        <div className="flex flex-col items-center gap-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={ENV.RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            theme="light"
            size="normal"
          />
          {errors.recaptcha && (
            <p className="text-xs text-red-600 text-center">{errors.recaptcha}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !recaptchaToken}
          className="mt-2 w-full rounded-lg bg-[var(--gv-primary)] px-4 py-2 font-semibold text-white shadow hover:bg-[var(--gv-primary-600)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Accediendo...' : 'Acceder al Sistema'}
        </button>

        <Link
          to="/"
          className="block w-full text-center rounded-lg border border-[var(--gv-primary)] px-4 py-2 font-semibold text-[var(--gv-primary)] hover:bg-[var(--gv-primary)] hover:text-white transition"
        >
          Volver al inicio
        </Link>

        <p className="text-center text-sm text-[var(--gv-muted)]">
          ¿No tienes cuenta?{" "}
          <Link className="font-semibold text-[var(--gv-primary)] hover:underline" to="/auth/register">
            Crear una cuenta
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
