import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { ColumnSort, SortDirection, TableColumn } from "../models/DataGrid";
import DataGridTableHead from "./DataGridTableHead";


interface Props {
  columns: Array<TableColumn>;
  rows: Array<Record<string, any>>;
  sortedBy?: ColumnSort;
  onSortChange: (sortKey: string, sortDirection: SortDirection) => void;
  onColumnsChange: (newColumns: Array<TableColumn>) => void;
}

/**
 * A component that represents the data grid table, its rows, and its columns.
 * @param columns
 * @param rows
 * @param sortedBy
 * @param onSortChange
 * @param onColumnsChange
 * @constructor
 */
export default function DataGridTable({ columns, rows, sortedBy, onSortChange, onColumnsChange }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <DataGridTableHead
          columns={columns}
          sortedBy={sortedBy}
          onSortChange={onSortChange}
          onColumnsChange={onColumnsChange}
        />
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map(({ key }) => {
                const value = row[key];
                const isNone = value == null;
                const styles = {
                  color: isNone ? "text.secondary" : "text.primary",
                  fontStyle: isNone ? "italic" : "normal",
                };

                return (
                  <TableCell
                    key={key}
                    sx={styles}>
                    {row[key] ?? "None"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}