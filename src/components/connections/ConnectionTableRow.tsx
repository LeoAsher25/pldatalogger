import { useState } from "react";
// @mui
import { MenuItem, TableCell, TableRow } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "src/components/Iconify";
import Label from "src/components/hook-form/Label";
import TableMoreMenu from "src/components/table/TableMoreMenu";
import { useAppSelector } from "src/hooks/customReduxHook";

export default function ConnectionTableRow({
  index,
  row,
  onEditRow,
  onDeleteRow,
}: any) {
  const theme = useTheme();

  const { defines } = useAppSelector((state) => state.configurationState);

  const [openMenu, setOpenMenuActions] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow
      key={index}
      sx={{ backgroundColor: index % 2 === 1 ? "#F6F6F6" : "white" }}>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{index + 1}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 700 }}>
        {row.name}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {defines.protocols[row.protocol] || ""}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {(defines && defines.protocols && defines.models[row?.model]) || ""}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={!row.maintenance ? "success" : "error"}>
          {row.maintenance ? "Bảo trì" : "Đang hoạt động"}
        </Label>
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={row.enabled ? "success" : "warning"}>
          {row.enabled ? "Kích hoạt" : "Vô hiệu hóa"}
        </Label>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}>
                <Iconify icon={"eva:trash-2-outline"} />
                Xóa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}>
                <Iconify icon={"eva:edit-fill"} />
                Chỉnh sửa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
