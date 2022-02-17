import React, { useEffect, useState } from "react";
import { Box, CircularProgress, CssBaseline, LinearProgress, Paper } from "@mui/material";
import { fetchPeople } from "../services/people";
import { DataGrid, SortDirection, TableColumn } from "../models/DataGrid";
import DataGridTable from "./DataGridTable";
import DataGridPagination from "./DataGridPagination";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columnSortKey, setColumnSortKey] = useState("id");
  const [columns, setColumns] = useState<Array<TableColumn> | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);
  const [dataGrid, setDataGrid] = useState<DataGrid | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    fetchPeople(currentPage, rowsPerPage, columnSortKey, sortDirection)
      .then((result) => {
        if (columns == null) {
          setColumns(result.columns);
        }

        setDataGrid(result);
      })
      .catch((error) => {
        alert(`A fetch error occurred: ${error.message}`);
        console.error({ error });
      })
      .finally(() => setIsLoading(false));

  }, [currentPage, rowsPerPage, columnSortKey, sortDirection]);

  function handleCurrentPageChange(newCurrentPage: number) {
    setCurrentPage(newCurrentPage);
  }

  function handleRowsPerPageChange(newRowsPerPage: number) {
    setRowsPerPage(newRowsPerPage);
  }

  function handleSortChange(newSortKey: string, newSortDirection: SortDirection) {
    setColumnSortKey(newSortKey);
    setSortDirection(newSortDirection);
  }

  function handleColumnsChange(newColumns: Array<TableColumn>) {
    setColumns(newColumns);
  }

  return (
    <>
      <CssBaseline/>
      {dataGrid == null ? (
        <CircularProgress/>
      ) : (
        <Box display="flex" flexDirection="column" gap={2} p={5}>
          <LinearProgress sx={{ opacity: isLoading ? 1 : 0, transition: "100ms all" }}/>
          <DataGridTable
            columns={columns!}
            rows={dataGrid.rows}
            sortedBy={dataGrid.sortedBy}
            onSortChange={handleSortChange}
            onColumnsChange={handleColumnsChange}
          />

          {dataGrid.pagination && (
            <Paper sx={{ padding: 2 }}>
              <DataGridPagination
                paginationInfo={dataGrid.pagination}
                onCurrentPageChange={handleCurrentPageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Paper>
          )}
        </Box>
      )}
    </>
  );
}

export default App;
