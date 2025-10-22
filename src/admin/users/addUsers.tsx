import React, { useState } from "react";

const AddUser: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm"
      >
        ➕ Agregar usuario
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Agregar nuevo usuario</h2>
            <form className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="border rounded-md p-2" />
                <input type="text" placeholder="Apellido" className="border rounded-md p-2" />
              </div>
              <input type="email" placeholder="Correo electrónico" className="border rounded-md p-2" />
              <input type="tel" placeholder="Teléfono (opcional)" className="border rounded-md p-2" />
              <select className="border rounded-md p-2">
                <option value="">Seleccionar rol</option>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
