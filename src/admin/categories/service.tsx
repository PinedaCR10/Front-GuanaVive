import type {
  IPaginatedResponse,
  CategoryRow,
  CategoryQueryParams,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./CategoryType";

const MOCK_DATA: CategoryRow[] = [
  { id: "1", name: "Música", userCount: 12, createdAt: "08-09-2025" },
  { id: "2", name: "Deportes", userCount: 8, createdAt: "07-09-2025" },
  { id: "3", name: "Arte", userCount: 5, createdAt: "06-09-2025" },
  { id: "4", name: "Turismo", userCount: 9, createdAt: "06-09-2025" },
  { id: "5", name: "Tecnología", userCount: 15, createdAt: "05-09-2025" },
];

export const categoryService = {
  async list(params?: CategoryQueryParams): Promise<IPaginatedResponse<CategoryRow>> {
    const search = params?.search?.toLowerCase() ?? "";
    const filtered = MOCK_DATA.filter((c) =>
      c.name.toLowerCase().includes(search)
    );

    const page = Number(params?.page ?? 1);
    const limit = Number(params?.limit ?? 3);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      meta: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
        hasNextPage: page < Math.ceil(filtered.length / limit),
        hasPreviousPage: page > 1,
      },
    };
  },

  async create(category: CreateCategoryDto) {
    console.log("Creando categoría:", category);
    return { success: true };
  },

  async update(category: UpdateCategoryDto) {
    console.log("Actualizando categoría:", category);
    return { success: true };
  },

  async delete(id: string) {
    console.log("Eliminando categoría:", id);
    return { success: true };
  },
};
