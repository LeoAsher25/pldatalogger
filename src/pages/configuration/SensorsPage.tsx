import { FC, useEffect, useMemo, useState } from "react";

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
  Typography,
} from "@mui/material";

// components
import Page from "src/components/Page";

// components

import ConfirmDeleteSensor from "src/components/sensors/ConfirmDeleteSensor";
import SensorForm from "src/components/sensors/SensorForm";
import SensorTableRow from "src/components/sensors/SensorTableRow";
import SensorTableToolbar from "src/components/sensors/SensorTableToolbar";
import TableNoData from "src/components/table/TableNoData";
import { HEADER } from "src/configs/config";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import useTable, { getComparator } from "src/hooks/useTable";
import {
  getConnections,
  getDefines,
  getSensors,
} from "src/redux/configuration";

interface Sensor {
  id: string;
  name: string;
}

const HEADERS: string[] = [
  "STT",
  "Cảm biến",
  "Trạng thái",
  "Đơn vị",
  "Giao thức",
  "Kết nối",
  "Loại thiết bị",
  "Kích hoạt",
];

// ----------------------------------------------------------------------

export const SensorsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, sensors } = useAppSelector(
    (state) => state.configurationState
  );

  const [editSensor, setEditSensor] = useState<Sensor>({ id: "", name: "" });
  const [openPopupSensor, setOpenPopupSensor] = useState<boolean>(false);
  const [isEditSensor, setIsEditSensor] = useState<boolean>(false);
  const [openConfirmDeleteSensor, setOpenConfirmDeleteSensor] =
    useState<boolean>(false);

  const [tableData, setTableData] = useState<Sensor[]>([]);
  const [filterName, setFilterName] = useState<string>("");

  const openAddSensor = () => {
    setEditSensor({ id: "", name: "" });
    setIsEditSensor(false);
    setOpenPopupSensor(true);
  };

  const openEditSensor = (sensor: Sensor) => {
    setEditSensor(sensor);
    setIsEditSensor(true);
    setOpenPopupSensor(true);
  };

  const openDeleteSensor = (sensor: Sensor) => {
    setEditSensor(sensor);
    setOpenConfirmDeleteSensor(true);
  };

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy) as any,
    filterName,
  });

  const isNotFound = !dataFiltered?.length && !!filterName;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDefines());
      await dispatch(getConnections());
      await dispatch(getSensors());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setTableData(sensors);
  }, [sensors]);

  const popupModifySensor = useMemo(
    () => (
      <Dialog
        open={openPopupSensor}
        onClose={() => setOpenPopupSensor(false)}
        maxWidth={"lg"}>
        <DialogTitle>
          {isEditSensor ? "CẬP NHẬT CẢM BIẾN" : "THÊM CẢM BIẾN"}
        </DialogTitle>
        <SensorForm
          sensor={editSensor}
          onCancel={() => setOpenPopupSensor(false)}
        />
      </Dialog>
    ),
    [openPopupSensor]
  );

  const popupDeleteSensor = useMemo(
    () => (
      <ConfirmDeleteSensor
        open={openConfirmDeleteSensor}
        sensor={editSensor}
        onCancel={() => setOpenConfirmDeleteSensor(false)}
      />
    ),
    [openConfirmDeleteSensor]
  );

  return (
    <Page title="Cảm biến">
      <Container maxWidth={"xl"}>
        <Card>
          <SensorTableToolbar
            onSearch={(e: any) => {
              handleFilterName(e.target.value);
            }}
            onAdd={() => openAddSensor()}
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
                          position: "sticky",
                          zIndex: "1",
                          fontWeight: 700,
                        }}>
                        <Typography variant="subtitle2">{header}</Typography>
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFiltered
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((sensor, index) => (
                      <SensorTableRow
                        key={sensor?.id || index}
                        index={page * rowsPerPage + index}
                        row={sensor}
                        onEditRow={() => {
                          openEditSensor(sensor);
                        }}
                        onDeleteRow={() => {
                          openDeleteSensor(sensor);
                        }}
                      />
                    ))}
                  {true && (
                    <TableNoData
                      isNotFound={isNotFound}
                      title="Không có cảm biến"
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>

        {popupModifySensor}
        {popupDeleteSensor}
      </Container>
    </Page>
  );
};

interface ApplySortFilterProps {
  tableData: Sensor[];
  comparator: (a: Sensor, b: Sensor) => number;
  filterName: string;
}

const applySortFilter = ({
  tableData,
  comparator,
  filterName,
}: ApplySortFilterProps): Sensor[] => {
  let stabilizedThis: [Sensor, number][] = tableData?.map((el, index) => [
    el,
    index,
  ]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    tableData = tableData?.filter(
      (item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
};
