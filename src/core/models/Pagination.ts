interface Pagination {
  perPage: number;
  currentPage: number;
  nextPage: number;
  previousPage: number;
  totalPages: number;
  total: number;
  offset: number;
  pages: number;
}

export type { Pagination };
