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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="card p-6 overflow-x-auto">
        <div className="text-sm font-semibold text-[var(--gv-text)] mb-4 flex items-center gap-2">
          <span className="text-lg">📁</span>
          Total: {resp?.meta.total ?? 0} categorías
        </div>

        <table className="w-full text-sm">
          <thead className="border-b-2 border-[var(--gv-border)]">
            <tr>
              <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Nombre</th>
              <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Usuarios</th>
              <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Creado</th>
              <th className="text-center p-3 font-semibold text-[var(--gv-text)]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(resp?.data ?? []).map((cat) => (
              <tr key={cat.id} className="border-b border-[var(--gv-border)] hover:bg-[var(--gv-primary-100)] transition-colors">
                <td className="p-3 text-[var(--gv-text)] font-medium">{cat.name}</td>
                <td className="p-3 text-[var(--gv-muted)]">{cat.userCount}</td>
                <td className="p-3 text-[var(--gv-muted)]">{cat.createdAt}</td>
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="px-3 py-1.5 bg-[var(--gv-primary)] text-white rounded-lg text-xs font-semibold hover:bg-[var(--gv-primary-600)] transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => confirmDelete(cat.id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            disabled={!resp?.meta.hasPreviousPage}
            className="px-4 py-2 border border-[var(--gv-border)] rounded-lg disabled:opacity-40 hover:bg-[var(--gv-primary)] hover:text-white hover:border-[var(--gv-primary)] transition-colors font-medium text-[var(--gv-text)]"
          >
            Anterior
          </button>
          <span className="text-sm font-medium text-[var(--gv-text)]">
            Página {resp?.meta.page ?? 1} de {resp?.meta.totalPages ?? 1}
          </span>
          <button
            onClick={next}
            disabled={!resp?.meta.hasNextPage}
            className="px-4 py-2 border border-[var(--gv-border)] rounded-lg disabled:opacity-40 hover:bg-[var(--gv-primary)] hover:text-white hover:border-[var(--gv-primary)] transition-colors font-medium text-[var(--gv-text)]"
          >
            Siguiente
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
