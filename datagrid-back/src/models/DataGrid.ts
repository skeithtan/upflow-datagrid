export enum SortDirection {
  Ascending = "Ascending",
  Descending = "Descending"
}

export function getSortDirectionFromString(str?: string): SortDirection | undefined {
  if (str == null) {
    return undefined;
  }

  const keys = Object.values(SortDirection).filter((value: string) => value === str);
  return keys.length > 0 ? <SortDirection>str : undefined;
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