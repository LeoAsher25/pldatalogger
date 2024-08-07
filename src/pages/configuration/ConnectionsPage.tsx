import { useEffect, useState } from "react";

// @mui
import {
  Box,
  Card,
  Container,
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

// components
import Page from "src/components/Page";

import { useMemo } from "react";
import { HEADER } from "src/configs/config";
import useTable, { getComparator } from "src/hooks/useTable";
import {
  getConnections,
  getDefines,
  getWebServerConfig,
} from "src/redux/configuration";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import ConnectionForm from "src/components/connections/ConnectionForm";
import ConfirmDeleteConnectionForm from "src/components/connections/ConfirmDeleteConnection";
import ConnectionTableToolbar from "src/components/connections/ConnectionTableToolbar";
import ConnectionTableRow from "src/components/connections/ConnectionTableRow";
import TableNoData from "src/components/table/TableNoData";

const HEADERS = [
  "STT",
  "KẾT NỐI",
  "GIAO THỨC",
  "MODEL",
  "TRẠNG THÁI",
  "KÍCH HOẠT",
  "",
];

// ----------------------------------------------------------------------

export default function ConnectionsPage() {
  const [editConnection, setEditConnection] = useState({});
  const [openPopupConnection, setOpenPopupConnection] = useState(false);
  const [isEditConnection, setIsEditConnection] = useState(false);
  const [openConfirmDeleteConnection, setOpenConfirmDeleteConnection] =
    useState(false);

  const openAddConnection = () => {
    setEditConnection({});
    setIsEditConnection(false);
    setOpenPopupConnection(true);
  };

  const openEditConnection = (connection: any) => {
    setEditConnection(connection);
    setIsEditConnection(true);
    setOpenPopupConnection(true);
  };

  const openDeleteConnection = (connection: any) => {
    setEditConnection(connection);
    setOpenConfirmDeleteConnection(true);
  };

  const dispatch = useAppDispatch();

  const { isLoading, connections } = useAppSelector(
    (state) => state.configurationState
  );

  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState("");

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: "createDate",
  });

  const handleFilterName = (filterName: any) => {
    setFilterName(filterName);
    setPage(0);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const isNotFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    setTableData(connections as any);
  }, [connections]);

  useEffect(() => {
    (async () => {
      await dispatch(getWebServerConfig());
      await dispatch(getDefines());
      await dispatch(getConnections());
    })();
  }, [dispatch]);

  const popupModifyConnection = useMemo(
    () => (
      <Dialog
        open={openPopupConnection}
        onClose={() => setOpenPopupConnection(false)}
        maxWidth={false}>
        <DialogTitle>
          {isEditConnection ? "CẬP NHẬT KẾT NỐI" : "THÊM KẾT NỐI"}
        </DialogTitle>
        <ConnectionForm
          connection={editConnection}
          onCancel={() => setOpenPopupConnection(false)}
        />
      </Dialog>
    ),
    [openPopupConnection]
  );

  const popupDeleteConnection = useMemo(
    () => (
      <ConfirmDeleteConnectionForm
        open={openConfirmDeleteConnection}
        connection={editConnection}
        onCancel={() => setOpenConfirmDeleteConnection(false)}
      />
    ),
    [openConfirmDeleteConnection]
  );

  return (
    <Page title="Kết nối">
      <Container maxWidth={false}>
        <Card>
          <ConnectionTableToolbar
            onSearch={(e: any) => {
              handleFilterName(e.target.value);
            }}
            onAdd={() => openAddConnection()}
          />
          <Box>
            <TableContainer
              sx={{
                minWidth: 200,
                maxHeight: `calc(100vh - ${
                  HEADER.MAIN_DESKTOP_HEIGHT +
                  HEADER.DASHBOARD_DESKTOP_HEIGHT +
                  120
                }px)`,
              }}>
              <Table stickyHeader size="medium">
                <TableHead>
                  <TableRow>
                    {HEADERS.map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          fontWeight: 700,
                        }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {String(isLoading)}
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((connection: any, index: number) => (
                      <ConnectionTableRow
                        key={connection?.id || index}
                        index={page * rowsPerPage + index}
                        row={connection}
                        onEditRow={() => {
                          openEditConnection(connection);
                        }}
                        onDeleteRow={() => {
                          openDeleteConnection(connection);
                        }}></ConnectionTableRow>
                    ))}
                  {isLoading && (
                    <TableNoData
                      isNotFound={isNotFound}
                      title="Không có kết nối"
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              position: "relative",
            }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
        {popupModifyConnection} {popupDeleteConnection}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

const applySortFilter = ({ tableData, comparator, filterName }: any) => {
  const stabilizedThis = tableData.map((el: any, index: number) => [el, index]);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el: any) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
};
