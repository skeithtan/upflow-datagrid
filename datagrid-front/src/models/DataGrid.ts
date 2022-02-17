export enum SortDirection {
  Ascending = "Ascending",
  Descending = "Descending"
}

export interface ColumnSort {
  direction: SortDirection,
  columnKey: string;
}

export interface TableColumn {
  label: string;
  key: string;
}

export interface PaginationInfo {
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export interface DataGrid {
  columns: Array<TableColumn>;
  rows: Array<Record<string, any>>;
  sortedBy?: ColumnSort;
  pagination?: PaginationInfo;
}