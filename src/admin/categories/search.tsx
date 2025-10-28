import React, { useState } from "react";

interface SearchProps {
  search: string;
  onSearch: (v: string) => void;
  onAdd: (name: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, onSearch, onAdd }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() === "") return;
    onAdd(newName.trim());
    setNewName("");
    setShowAddModal(false);
    setShowSuccessModal(true);
  };

  return (
    <>
      {/* 🔍 Barra de búsqueda */}
      <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 border rounded-md p-2"
        />

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          + Agregar categoría
        </button>
      </div>

      {/* ➕ Modal agregar categoría (SIN FONDO OSCURO) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl border pointer-events-auto"
            style={{
              boxShadow: "0 4px 25px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h2 className="text-lg font-semibold mb-3 text-center">
              Agregar nueva categoría
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre de la categoría"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded-md p-2"
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-md border hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Modal de éxito (flotante, sin fondo) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div
            className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-xl border pointer-events-auto"
            style={{
              boxShadow: "0 4px 25px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Categoría agregada
            </h2>
            <p className="text-gray-600 mb-4">
              La nueva categoría se ha agregado correctamente.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
