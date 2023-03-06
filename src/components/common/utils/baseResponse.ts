import { RequestResponse, PaginatedResponse, Meta } from "../interfaces";

export function ok<T>(data: T, message?: string): RequestResponse<T> {
  return {
    message: message || "Ok",
    data,
  };
}

export function paginated<T>(data: T[], meta: Meta): PaginatedResponse<T> {
  return {
    message: "Ok",
    data: data,
    meta: {
      perPage: meta.pageSize,
      total: meta.total,
      count: data.length,
      currentPage: meta.page,
      totalPages: Math.ceil(meta.total / meta.pageSize) || 0,
    },
  };
}
