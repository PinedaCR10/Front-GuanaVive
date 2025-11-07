import React, { useEffect, useState } from "react";
import { categoryService } from "./service";
import type { CategoryRow, IPaginatedResponse } from "./CategoryType";

interface Props {
  search: string;
}

const PER_PAGE = 3;

const CategoryTable: React.FC<Props> = ({ search }) => {
  const [page, setPage] = useState(1);
  const [resp, setResp] = useState<IPaginatedResponse<CategoryRow> | null>(
    null
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryRow | null>(null);
  const [newName, setNewName] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    const result = await categoryService.list({ page, limit: PER_PAGE, search });
    setResp(result);
  };

  useEffect(() => {
    load();
  }, [page, search]);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () =>
    setPage((p) => Math.min(resp?.meta.totalPages ?? 1, p + 1));

  const openEditModal = (cat: CategoryRow) => {
    setEditCategory(cat);
    setNewName(cat.name);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory || newName.trim() === "") return;
    await categoryService.update(editCategory.id, { name: newName.trim() });
    setShowEditModal(false);
    load();
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await categoryService.delete(deleteId);
      setShowDeleteModal(false);
      setDeleteId(null);
      load();
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border p-4 overflow-x-auto">
        <div className="text-sm text-gray-600 mb-3">
          Categorías ({resp?.meta.total ?? 0})
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Usuarios</th>
              <th className="text-left p-2">Creado</th>
              <th className="text-center p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(resp?.data ?? []).map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{cat.name}</td>
                <td className="p-2">{cat.userCount}</td>
                <td className="p-2">{cat.createdAt}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(cat.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            disabled={!resp?.meta.hasPreviousPage}
            className="h-9 w-9 grid place-items-center border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            {"<"}
          </button>
          <span className="text-sm text-gray-600">
            {resp?.meta.page ?? 1} / {resp?.meta.totalPages ?? 1}
          </span>
          <button
            onClick={next}
            disabled={!resp?.meta.hasNextPage}
            className="h-9 w-9 grid place-items-center border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Modal Editar categoría */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Editar categoría
            </h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded-md p-2"
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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

      {/* Modal Eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-3">
              Confirmar eliminación
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              ¿Seguro que deseas eliminar esta categoría? Esta acción no se
              puede deshacer.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md border hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryTable;
