import { publicationsApi } from "../../features/publications";
import { adminService } from "../home/service";
import type { Publication } from "../../features/publications";
import type { ApiResponse } from "../../core/types";
import type {
  IPaginatedResponse,
  PublicationQueryParams,
  PublicationRow,
} from "./advetisementType";

/**
 * Convierte una Publication del backend a PublicationRow para la tabla
 */
const publicationToRow = (publication: Publication): PublicationRow => {
  // Recortar contenido para excerpt
  const excerpt = publication.content.length > 60
    ? publication.content.substring(0, 60) + "…"
    : publication.content;

  // Mapear status del backend al status de la tabla
  let status: "APPROVED" | "PENDING" | "REJECTED";
  switch (publication.status) {
    case "publicado":
      status = "APPROVED";
      break;
    case "pendiente_revision":
      status = "PENDING";
      break;
    case "archivado":
      status = "REJECTED";
      break;
    default:
      status = "PENDING";
  }

  // Mapear categoría (el type de advertisement solo acepta ciertos valores)
  let category: "musica" | "arte" | "deportes" | "tecnologia" | "otros" = "otros";
  const catName = publication.category?.name?.toLowerCase() || "";
  if (catName.includes("music") || catName.includes("música")) {
    category = "musica";
  } else if (catName.includes("art") || catName.includes("arte")) {
    category = "arte";
  } else if (catName.includes("deport") || catName.includes("sport")) {
    category = "deportes";
  } else if (catName.includes("tecnolog") || catName.includes("tech")) {
    category = "tecnologia";
  }

  return {
    id: publication.id,
    title: publication.title,
    excerpt,
    userName: publication.author
      ? `${publication.author.firstName} ${publication.author.lastName}`
      : "Desconocido",
    category,
    status,
    createdAt: new Date(publication.createdAt).toLocaleDateString("es-CR"),
  };
};

export const adsService = {
  /**
   * Lista todas las publicaciones para administración
   */
  async list(params?: PublicationQueryParams): Promise<IPaginatedResponse<PublicationRow>> {
    try {
      // Mapear status de la tabla al status del backend
      let backendStatus: "borrador" | "publicado" | "archivado" | "pendiente_revision" | undefined;
      if (params?.status) {
        switch (params.status) {
          case "APPROVED":
            backendStatus = "publicado";
            break;
          case "PENDING":
            backendStatus = "pendiente_revision";
            break;
          case "REJECTED":
            backendStatus = "archivado";
            break;
        }
      }

      const response = await publicationsApi.getAll({
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
        status: backendStatus,
      });

      if (!response.success || !response.data) {
        return {
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }

      const publicationRows = response.data.map(publicationToRow);

      return {
        data: publicationRows,
        meta: {
          page: response.meta?.page || params?.page || 1,
          limit: response.meta?.limit || params?.limit || 10,
          total: response.meta?.total || publicationRows.length,
          totalPages: response.meta?.totalPages || 1,
          hasNextPage: response.meta?.hasNextPage || false,
          hasPreviousPage: response.meta?.hasPreviousPage || false,
        },
      };
    } catch (error) {
      console.error("Error fetching publications:", error);
      return {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
  },

  /**
   * Obtiene publicaciones pendientes de aprobación
   */
  async getPending(params?: PublicationQueryParams): Promise<IPaginatedResponse<PublicationRow>> {
    try {
      const response = await publicationsApi.getPending({
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
      });

      if (!response.success || !response.data) {
        return {
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }

      const publicationRows = response.data.map(publicationToRow);

      return {
        data: publicationRows,
        meta: {
          page: response.meta?.page || params?.page || 1,
          limit: response.meta?.limit || params?.limit || 10,
          total: response.meta?.total || publicationRows.length,
          totalPages: response.meta?.totalPages || 1,
          hasNextPage: response.meta?.hasNextPage || false,
          hasPreviousPage: response.meta?.hasPreviousPage || false,
        },
      };
    } catch (error) {
      console.error("Error fetching pending publications:", error);
      return {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
  },

  /**
   * Obtiene una publicación por ID
   */
  async getById(id: string): Promise<ApiResponse<Publication>> {
    try {
      return await publicationsApi.getById(id);
    } catch (error) {
      console.error("Error fetching publication:", error);
      throw error;
    }
  },

  /**
   * Aprueba una publicación
   */
  async approve(id: string, message?: string): Promise<Publication | null> {
    try {
      const result = await adminService.approvePublication(id, message);
      return result || null;
    } catch (error) {
      console.error("Error approving publication:", error);
      throw error;
    }
  },

  /**
   * Rechaza una publicación
   */
  async reject(id: string, message?: string): Promise<Publication | null> {
    try {
      const result = await adminService.rejectPublication(id, message);
      return result || null;
    } catch (error) {
      console.error("Error rejecting publication:", error);
      throw error;
    }
  },

  /**
   * Elimina una publicación
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      return await publicationsApi.delete(id);
    } catch (error) {
      console.error("Error deleting publication:", error);
      throw error;
    }
  },
};
