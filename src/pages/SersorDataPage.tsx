import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import realTimeData from "src/data/realTimeData";
import useSettingHeader from "src/hooks/useSettingHeader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f4f6f8",
    color: "rgb(99, 115, 129)",
    textTransform: "uppercase",
    fontWeight: 700,
    border: "0",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    borderBottom: "0px !important",
  },
}));

const SersorDataPage = () => {
  useSettingHeader({ pageTitle: "Số liệu truyền gần nhất", breadcrumbs: [] });

  const currentTime = moment(Date.now()).format("DD-MM-YYYY HH:mm");
  return (
    <Box>
      <TableContainer component={Paper}>
        <Box sx={{ padding: "20px 24px" }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            {currentTime}
          </Typography>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell>Thông số</StyledTableCell>
              <StyledTableCell>Giá trị</StyledTableCell>
              <StyledTableCell>Đơn vị</StyledTableCell>
              <StyledTableCell>Trạng Thái</StyledTableCell>
              <StyledTableCell>Cảnh báo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {realTimeData.map((row, index) => (
              <StyledTableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: 600,
                  }}>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.value}</StyledTableCell>
                <StyledTableCell>{row.unit}</StyledTableCell>
                <StyledTableCell>
                  {
                    <Chip
                      color={row.status === 0 ? "success" : "error"}
                      variant="filled"
                      size="small"
                      label={row.status === 0 ? "Đang đo" : "Dừng đo"}
                    />
                  }
                </StyledTableCell>
                <StyledTableCell>
                  {
                    <Chip
                      color={row.alert ? "success" : "warning"}
                      variant="filled"
                      size="small"
                      label={row.alert ? "Bình thường" : "Bất thường"}
                    />
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SersorDataPage;
