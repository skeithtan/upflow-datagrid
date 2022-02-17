import { TableHead, TableRow } from "@mui/material";
import { ColumnSort, SortDirection, TableColumn } from "../models/DataGrid";
import arrayMove from "../utils/arrayMove";
import DataGridTableHeadColumn from "./DataGridTableHeadColumn";

interface Props {
  columns: Array<TableColumn>;
  sortedBy?: ColumnSort;
  onSortChange: (sortKey: string, sortDirection: SortDirection) => void;
  onColumnsChange: (newColumns: Array<TableColumn>) => void;
}

/**
 * A component that represents the head of a data grid table.
 * @param columns
 * @param sortedBy
 * @param onSortChange
 * @param onColumnsChange
 * @constructor
 */
export default function DataGridTableHead({
                                            columns,
                                            sortedBy,
                                            onSortChange,
                                            onColumnsChange,
                                          }: Props) {
  function createColumnClickHandler(key: string) {
    return () => {
      const { columnKey, direction } = sortedBy ?? {};
      let newDirection = SortDirection.Ascending;
      if (direction != null && columnKey === key) {
        newDirection = direction === SortDirection.Ascending ?
          SortDirection.Descending :
          SortDirection.Ascending;
      }

      onSortChange(key, newDirection);
    };
  }

  function handleMoveColumn(dragIndex: number, hoverIndex: number) {
    const newColumns = arrayMove(columns, dragIndex, hoverIndex);
    onColumnsChange(newColumns);
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map(({ label, key }, index) => (
          <DataGridTableHeadColumn
            key={key}
            index={index}
            label={label}
            columnKey={key}
            isSorted={sortedBy?.columnKey === key}
            onClick={createColumnClickHandler(key)}
            moveColumn={handleMoveColumn}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}