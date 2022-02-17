import Router from "@koa/router";
import generatePeople from "../utils/peopleGenerator";
import { StatusCodes } from "http-status-codes";
import { createDataGrid } from "../services/DataGridBuilder";
import { getSortDirectionFromString, SortDirection, TableColumn } from "../models/DataGrid";

/**`
 * Instance kept here to be able to serve several requests
 */
const PEOPLE: Array<Record<string, any>> = generatePeople(100_000);
const PEOPLE_COLUMNS: Array<TableColumn> = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "favoriteFruit", label: "Favorite fruit" },
  { key: "continent", label: "Continent" },
  { key: "pet", label: "Pet" },
];

export const peopleRouter = new Router({
  prefix: "/people",
});

peopleRouter.get("/", async (ctx) => {
  const { sortColumnKey, sortDirection, currentPage, rowsPerPage } = ctx.query;
  const columnSort = sortColumnKey == null ? undefined : {
    columnKey: sortColumnKey.toString(),
    direction: getSortDirectionFromString(sortDirection?.toString()) ?? SortDirection.Ascending,
  };

  const paginationParams = currentPage == null ? undefined : {
    currentPage: parseInt(currentPage.toString()),
    rowsPerPage: rowsPerPage == null ? 10 : parseInt(rowsPerPage.toString()),
  };

  const dataGrid = createDataGrid(PEOPLE_COLUMNS, PEOPLE, columnSort, paginationParams);

  ctx.status = StatusCodes.OK;
  ctx.body = dataGrid;
});