import React, { useState } from "react";
import Search from "./search";
import { categoryService } from "./service";
import CategoryTable from "./CategoryTables";

const AdminCategories: React.FC = () => {
  const [search, setSearch] = useState("");

  // Eliminamos el alert completamente
  const handleAdd = async (name: string) => {
    await categoryService.create({ name });
    // Ya no hay alert, el modal de Search manejará el feedback visual
  };

  return (
    <section className="space-y-8 p-6 sm:p-8">
      <div>
        <h1 className="text-2xl font-semibold">Gestión de categorías</h1>
        <p className="text-gray-500">
          Visualiza, edita o elimina categorías disponibles en el sistema
        </p>
      </div>

      {/* Barra de búsqueda + agregar */}
      <Search search={search} onSearch={setSearch} onAdd={handleAdd} />

      {/* Tabla */}
      <CategoryTable search={search} />
    </section>
  );
};

export default AdminCategories;
