import { DataGrid, SortDirection } from "../models/DataGrid";

const ENDPOINT = "http://localhost:8000/people";

/**
 * Fetches the people data from the server given parameters.
 * @param currentPage
 * @param rowsPerPage
 * @param sortColumnKey
 * @param sortDirection
 */
export async function fetchPeople(currentPage: number, rowsPerPage: number, sortColumnKey?: string, sortDirection?: SortDirection): Promise<DataGrid> {
  const queryParams: Record<string, string> = {
    currentPage: currentPage.toString(),
    rowsPerPage: rowsPerPage.toString(),
  };

  if (sortColumnKey != null) {
    queryParams.sortColumnKey = sortColumnKey;
    queryParams.sortDirection = sortDirection ?? SortDirection.Ascending;
  }

  const urlSearchParams = new URLSearchParams(queryParams);
  const url = ENDPOINT.concat("?", urlSearchParams.toString());
  const response = await fetch(url);
  return response.json();
}