import { useState, useEffect } from 'react';
import { useAuth } from '../features/auth';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implementar actualización de perfil con el backend
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      setIsEditing(false);
      
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  if (!user) {
    return (
      <div className="container py-12 text-center">
        <p className="text-[var(--gv-muted)]">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-20 w-20 rounded-full bg-[var(--gv-primary)] text-white grid place-items-center text-3xl font-bold">
              {user.firstName.charAt(0).toUpperCase()}
              {user.lastName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--gv-text)]">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-[var(--gv-muted)]">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {user.role === 'admin' ? 'Administrador' : 'Usuario'}
              </span>
            </div>
          </div>

          {/* Mensaje de feedback */}
          {message && (
            <div
              className={`mb-6 rounded-md border px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                disabled={!isEditing}
                className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                  !isEditing ? 'bg-gray-50 text-gray-600' : ''
                }`}
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                Apellido
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                disabled={!isEditing}
                className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                  !isEditing ? 'bg-gray-50 text-gray-600' : ''
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                  !isEditing ? 'bg-gray-50 text-gray-600' : ''
                }`}
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 justify-between pt-4">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    Editar Perfil
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setForm({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                      });
                    }}
                    className="btn btn-outline"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Información adicional */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-[var(--gv-text)] mb-4">
              Información de la cuenta
            </h3>
            <div className="space-y-2 text-sm text-[var(--gv-muted)]">
              <p>
                <span className="font-medium">ID de usuario:</span> {user.id}
              </p>
              <p>
                <span className="font-medium">Rol:</span> {user.role === 'admin' ? 'Administrador' : 'Usuario'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
