import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { PaginationInfo } from "../models/DataGrid";
import { ChangeEvent } from "react";

interface Props {
  paginationInfo: PaginationInfo;
  onCurrentPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

/**
 * Marks the available choices for the number of rows per page
 */
const ROWS_PER_PAGE_CHOICES = [5, 10, 20, 50, 100];

/**
 * A component that represents the pagination of a data grid table, the current page, and the number of rows per page.
 * @param paginationInfo
 * @param onCurrentPageChange
 * @param onRowsPerPageChange
 * @constructor
 */
export default function DataGridPagination({ paginationInfo, onCurrentPageChange, onRowsPerPageChange }: Props) {
  const { currentPage, rowsPerPage, totalPages } = paginationInfo;

  function handlePaginationChange(event: ChangeEvent<unknown>, page: number) {
    onCurrentPageChange(page);
  }

  function handleRowsPerPageSelectChange(event: SelectChangeEvent<number>) {
    onRowsPerPageChange(event.target.value as number);
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Rows per page</InputLabel>
        <Select label="Rows per page" value={rowsPerPage} onChange={handleRowsPerPageSelectChange}>
          {ROWS_PER_PAGE_CHOICES.map((it) => (
            <MenuItem key={it} value={it}>{it}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination page={currentPage} count={totalPages} onChange={handlePaginationChange}/>
    </Stack>
  );
}