/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, "ASC" | "DESC"][];
  filter?: Record<string, any>;
}
