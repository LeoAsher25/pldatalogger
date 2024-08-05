/// <reference path="../../types/index.ts" />

import { useState } from "react";
// @mui
import { MenuItem, TableCell, TableRow } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "src/hooks/customReduxHook";
import { SystemTypes } from "src/types";
import Iconify from "../Iconify";
import Label from "../hook-form/Label";
import TableMoreMenu from "../table/TableMoreMenu";

export default function SensorTableRow({
  index,
  row,
  onEditRow,
  onDeleteRow,
}: any) {
  const theme = useTheme();

  const { connections, defines } = useAppSelector(
    (state) => state.configurationState
  );

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const findConnection = (connectionId: any) => {
    let connectionName;

    connections.forEach((connection) => {
      if (connectionId === connection.id) {
        connectionName = connection.name;
      }
    });

    return connectionName;
  };

  return (
    <TableRow
      key={index}
      sx={{ backgroundColor: index % 2 === 1 ? "#F6F6F6" : "white" }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 700 }}>
        {row?.name}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={
            ((row?.status === SystemTypes.ESensorStatus.MEASURING ||
              row?.status === SystemTypes.ESensorStatus.AUTO) &&
              "success") ||
            (row?.status === SystemTypes.ESensorStatus.CALIBRATING &&
              "warning") ||
            (row?.status === SystemTypes.ESensorStatus.ERROR && "error") ||
            "success"
          }>
          {(defines &&
            defines.sensorStatus &&
            defines.sensorStatus[row?.status]) ||
            ""}
        </Label>
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{row?.unit}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {(defines && defines.protocols && defines.protocols[row?.protocol]) ||
          ""}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {findConnection(row?.connectionId) || ""}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {(defines && defines.protocols && defines?.models[row?.model]) || ""}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={(row?.enabled && "success") || "error"}>
          {(row?.enabled && "Kích hoạt") || "Vô hiệu hóa"}
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
                  onEditRow();
                  handleCloseMenu();
                }}>
                <Iconify icon={"eva:edit-fill"} />
                Chỉnh sửa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}>
                <Iconify icon={"eva:trash-2-outline"} />
                Xóa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
