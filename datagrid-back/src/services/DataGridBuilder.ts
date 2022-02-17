import { ColumnSort, DataGrid, SortDirection, TableColumn } from "../models/DataGrid";
import { logger } from "../utils/logger";


export interface PaginationParameters {
  currentPage: number;
  rowsPerPage: number;
}

/**
 * Applies the sorting parameters to the given rows.
 * @param rows
 * @param columnSort
 */
function applyColumnSort(rows: Array<Record<string, any>>, columnSort: ColumnSort): Array<Record<string, any>> {
  const { columnKey, direction } = columnSort;
  return rows.sort((a: Record<string, any>, b: Record<string, any>) => {
    const aValue = a[columnKey];
    const bValue = b[columnKey];

    if (aValue < bValue) {
      return direction === SortDirection.Ascending ? -1 : 1;
    }

    if (aValue > bValue) {
      return direction === SortDirection.Ascending ? 1 : -1;
    }

    return 0;
  });
}

/**
 * Returns the paginated rows given the parameters.
 * @param rows
 * @param parameters
 */
function applyPagination(rows: Array<Record<string, any>>, parameters: PaginationParameters): Array<Record<string, any>> {
  let { currentPage, rowsPerPage } = parameters;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  if (currentPage > totalPages) {
    logger.warn(`Attempted to access page ${currentPage} when the maximum allowed is ${totalPages}.`);
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * rowsPerPage;
  return rows.slice(startIndex, startIndex + rowsPerPage);
}

/**
 * Creates a data grid with the given columns and rows. Also applies sorting and pagination, if applicable.
 * @param columns
 * @param rows
 * @param columnSort
 * @param paginationParameters
 */
export function createDataGrid(columns: Array<TableColumn>, rows: Array<Record<string, any>>, columnSort?: ColumnSort, paginationParameters?: PaginationParameters): DataGrid {
  const dataGrid: DataGrid = { columns, rows };

  if (columnSort != null) {
    dataGrid.rows = applyColumnSort(dataGrid.rows, columnSort);
    dataGrid.sortedBy = columnSort;
  }

  if (paginationParameters != null) {
    const allRowsLength = dataGrid.rows.length;
    dataGrid.rows = applyPagination(dataGrid.rows, paginationParameters);
    dataGrid.pagination = {
      currentPage: paginationParameters.currentPage,
      rowsPerPage: paginationParameters.rowsPerPage,
      totalPages: Math.ceil(allRowsLength / paginationParameters.rowsPerPage),
      totalItems: allRowsLength,
    };
  }

  return dataGrid;
}
