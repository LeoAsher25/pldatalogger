import moment from "moment";
import { MouseEvent, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

// @mui
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

// components
import { useSnackbar } from "notistack";
import Page from "src/components/Page";

// components
import { DateRange } from "@mui/icons-material";
import vi from "date-fns/esm/locale/vi";
import FtpHistoryTableRow from "src/components/ftpHistory/FtpHistoryTableRow";
import { HEADER } from "src/configs/config";
import historyData from "src/data/historyData";
import useTable from "src/hooks/useTable";

// ----------------------------------------------------------------------

interface HistoryHeader {
  name: string;
  unit: string;
}

interface HistoryRow {
  time: string;
  data: { value: number | null; status: number | null }[];
}

interface HistoryData {
  headers: HistoryHeader[];
  rows: HistoryRow[];
}

export default function FtpHistoryPage() {
  const { enqueueSnackbar } = useSnackbar();

  const RANGE_TODAY: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [selectRange, setSelectRange] = useState<Range>(RANGE_TODAY);
  const [range, setRange] = useState<Range>(RANGE_TODAY);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [csv, setCsv] = useState<any[]>([]);

  const [history] = useState(historyData.data);

  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable({
    defaultOrderBy: "createDate",
  });

  const handleSearch = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
  };

  const checkRange = (days: number) => {
    if (!selectRange?.startDate || !selectRange?.endDate) return false;

    const start = new Date(selectRange.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(selectRange.endDate);
    end.setHours(23, 59, 59, 999);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > days) {
      enqueueSnackbar(
        `Vui lòng chọn khoảng thời gian trong vòng ${days} ngày`,
        {
          variant: "error",
        }
      );
      return false;
    }

    return true;
  };

  const handleDownload = () => {
    if (!history.headers || !history.rows) return;

    let content: any[] = [];
    const headers = history.headers.map(
      (header) => `${header.name} (${header.unit})`
    );
    content.push(["Thời gian", ...headers]);
    history.rows.forEach((row) => {
      let line = [row.time];
      row.data.forEach((element) =>
        line.push(
          `${element?.value !== null ? element?.value : "--"} ${
            element?.status && element?.status !== 0
              ? `(${element?.status})`
              : ""
          }`
        )
      );
      content.push(line);
    });

    setCsv(content);
    return content;
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (!!range) {
      handleSearch(range?.startDate, range?.endDate);
    }
  }, [range]);

  return (
    <Page title="Tra số liệu">
      <Container maxWidth={"xl"} sx={{ padding: "0px !important" }}>
        <Card>
          <Stack
            spacing={2}
            direction={{
              xs: "column",
              md: "row",
            }}
            sx={{
              py: 2.5,
              px: 3,
            }}>
            <Stack direction={"column"} spacing={1}>
              <TextField
                label="Thời gian"
                type="text"
                variant="outlined"
                sx={{
                  minWidth: 250,
                }}
                value={`${moment(range?.startDate).format(
                  "DD/MM/YYYY"
                )} - ${moment(range?.endDate).format("DD/MM/YYYY")}`}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleOpen}>
                        <DateRange />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                onClose={handleClose}>
                <Stack
                  direction={"column"}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  spacing={2}>
                  <DateRangePicker
                    ranges={[selectRange]}
                    locale={vi}
                    //staticRanges={[]}
                    inputRanges={[]}
                    onChange={(ranges) => setSelectRange(ranges.selection)}
                  />
                  <Button
                    variant="contained"
                    color="info"
                    sx={{
                      m: 1,
                    }}
                    onClick={() => {
                      handleClose();
                      if (checkRange(45)) {
                        setRange(selectRange);
                      } else {
                        setSelectRange(range);
                      }
                    }}>
                    Xác Nhận
                  </Button>
                </Stack>
              </Popover>
            </Stack>
            <LoadingButton
              sx={{
                p: 0,
              }}
              size="large"
              variant="contained"
              loading={false}
              color="info"
              onClick={handleDownload}>
              <CSVLink
                style={{
                  textDecoration: "none",
                  color: "white",
                  width: "100%",
                  padding: "11px 16px 8px 16px",
                }}
                separator=","
                uFEFF={true}
                filename={`export_${moment(range?.startDate).format(
                  "YYYYMMDD"
                )}_${moment(range?.endDate).format(
                  "YYYYMMDD"
                )}_${moment().format("YYYYMMDDHHmmss")}.csv`}
                data={csv}
                target="_blank">
                Tải xuống
              </CSVLink>
            </LoadingButton>
          </Stack>
          <Box>
            <TableContainer
              sx={{
                my: 2,
                minWidth: 200,
                maxHeight: `calc(100vh - ${
                  HEADER.MAIN_DESKTOP_HEIGHT +
                  HEADER.DASHBOARD_DESKTOP_HEIGHT +
                  150
                }px)`,
              }}>
              <Table stickyHeader size={"small"}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        left: 0,
                      }}>
                      STT
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        left: 0,
                        zIndex: "99",
                      }}>
                      Thời gian
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        left: 0,
                      }}>
                      Trạng thái
                    </TableCell>
                    {history.headers.map((hdr, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          left: 0,
                        }}>
                        {`${hdr.name} (${hdr.unit})`}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <FtpHistoryTableRow
                        key={index}
                        index={page * rowsPerPage + index}
                        row={row}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              position: "relative",
            }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={history.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              labelRowsPerPage="Dòng trang"
            />
          </Box>
        </Card>
      </Container>
      {/* {popupSelectRange} */}
      {/* {isLoading && <LoadingOverlay />} */}
    </Page>
  );
}
