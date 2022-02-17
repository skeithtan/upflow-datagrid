import { SortDirection, TableColumn } from "../models/DataGrid";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { DraggableItemTypes } from "../models/DraggableItemTypes";
import { Box, TableCell } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { styled } from "@mui/material/styles";

const iconStyle = {
  fontSize: "1rem",
  color: "text.secondary",
};

const ClickableCell = styled(TableCell)(() => ({
  transition: "100ms all",
  fontWeight: 600,
  lineHeight: 0,
  fontSize: "0.9rem",
  "&:hover": {
    cursor: "pointer",
    background: "#eee",
  },
}));

interface DraggableColumn extends TableColumn {
  index: number;
}

interface Props {
  index: number;
  label: string;
  columnKey: string;
  isSorted: boolean;
  direction?: SortDirection;
  onClick: () => void;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

/**
 * A component that represents the head column of a data grid table. It is draggable and clickable.
 * @param index
 * @param label
 * @param columnKey
 * @param isSorted
 * @param direction
 * @param onClick
 * @param moveColumn
 * @constructor
 */
export default function DataGridTableHeadColumn({
                                                  index,
                                                  label,
                                                  columnKey,
                                                  isSorted,
                                                  direction,
                                                  onClick,
                                                  moveColumn,
                                                }: Props) {
  const ariaDirection = isSorted && direction === SortDirection.Ascending ? "asc" : "desc";
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DraggableColumn,
    void,
    { handlerId: Identifier | null }>({
    accept: DraggableItemTypes.Column,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: DraggableColumn, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveColumn(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DraggableItemTypes.Column,
    item: () => ({
      index,
      label,
      key: columnKey,
    }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <ClickableCell
      variant="head"
      sortDirection={ariaDirection}
      onClick={onClick}
      ref={ref}
      data-handler-id={handlerId}
      sx={{ opacity: isDragging ? 0 : 1 }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {label}
        {isSorted && (direction === SortDirection.Ascending ? (
          <ArrowUpwardIcon sx={iconStyle}/>
        ) : (
          <ArrowDownwardIcon sx={iconStyle}/>
        ))}
      </Box>
    </ClickableCell>
  );
}
