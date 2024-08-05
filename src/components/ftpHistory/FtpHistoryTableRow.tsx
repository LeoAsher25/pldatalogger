// @mui
import { TableCell, TableRow } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Label from "../hook-form/Label";
// components

// ----------------------------------------------------------------------

export default function FtpHistoryTableRow({
  index,
  row,
}: {
  index: number;
  row: any;
}) {
  const theme = useTheme();

  return (
    <TableRow
      key={index}
      sx={{
        backgroundColor: index % 2 === 1 ? "#F6F6F6" : "white",
      }}>
      <TableCell size="medium"> {index + 1} </TableCell>
      <TableCell
        sx={{
          whiteSpace: "nowrap",
          position: "sticky",
          left: 0,
          backgroundColor: index % 2 === 1 ? "#F6F6F6" : "white",
          zIndex: "9",
        }}>
        {row?.time}
      </TableCell>
      <TableCell>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={(row?.sent && "success") || "warning"}>
          {(row?.sent && "Đã gửi") || "Chưa gửi"}
        </Label>
      </TableCell>
      {row?.data?.map((value: any) => (
        <TableCell>
          {`${value?.value ? value?.value : "--"} ${
            value?.status && value?.status !== 0 ? `(${value?.status})` : ""
          }`}
        </TableCell>
      ))}
    </TableRow>
  );
}
