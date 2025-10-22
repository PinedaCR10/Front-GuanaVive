import type {
  IPaginatedResponse,
  PublicationQueryParams,
  PublicationRow,
} from "./advetisementType";

// Servicio listo para conectar fetch real
export const adsService = {
  async list(params?: PublicationQueryParams): Promise<
    IPaginatedResponse<PublicationRow>
  > {
    // TODO: reemplazar por fetch real (GET /admin/publications)
    const mock: PublicationRow[] = [
      {
        id: "1",
        title: "Música bailable",
        excerpt:
          "Música bailable y ritmos locales para eventos comunitarios…",
        userName: "Juan Pérez",
        category: "musica",
        status: "APPROVED",
        createdAt: "08-09-2025",
      },
      {
        id: "2",
        title: "Música bailable",
        excerpt:
          "Música bailable y ritmos locales para eventos comunitarios…",
        userName: "Juan Pérez",
        category: "musica",
        status: "REJECTED",
        createdAt: "08-09-2025",
      },
      {
        id: "3",
        title: "Música bailable",
        excerpt:
          "Música bailable y ritmos locales para eventos comunitarios…",
        userName: "Juan Pérez",
        category: "musica",
        status: "PENDING",
        createdAt: "08-09-2025",
      },
      {
        id: "4",
        title: "Concierto al aire libre",
        excerpt: "Festival con talentos locales en la plaza central…",
        userName: "María Gómez",
        category: "musica",
        status: "APPROVED",
        createdAt: "09-09-2025",
      },
      {
        id: "5",
        title: "Expo Artesanía",
        excerpt: "Madera y cerámica típica de la región…",
        userName: "Carlos Soto",
        category: "arte",
        status: "PENDING",
        createdAt: "09-09-2025",
      },
    ];

    const page = Number(params?.page ?? 1);
    const limit = Number(params?.limit ?? 3);
    const start = (page - 1) * limit;
    const data = mock.slice(start, start + limit);

    return {
      data,
      meta: {
        page,
        limit,
        total: mock.length,
        totalPages: Math.ceil(mock.length / limit),
        hasNextPage: page < Math.ceil(mock.length / limit),
        hasPreviousPage: page > 1,
      },
    };
  },
};
