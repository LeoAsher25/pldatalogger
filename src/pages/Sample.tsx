import { useTheme } from "@mui/material/styles";
import { useState } from "react";

// @mui
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";

import Label from "src/components/hook-form/Label";
import useSettingHeader from "src/hooks/useSettingHeader";
import { mockApi } from "src/utils/mookApi";
import { SystemTypes } from "src/types";

// ----------------------------------------------------------------------

export default function Sample() {
  useSettingHeader({ pageTitle: "Điều khiển lấy mẫu", breadcrumbs: [] });

  const theme = useTheme();
  const [tableData, setTableData] = useState<SystemTypes.ISampleData>({
    address: "",
    autorun: true,
    connected: false,
    connectionId: 9,
    currentDistributor: 3,
    database: "",
    enabled: true,
    filled: 0,
    method: 0,
    model: 4,
    name: "",
    nextDistributor: -1,
    password: "",
    port: 0,
    protocol: 3,
    remoted: false,
    tag: "",
    temperatureInside: 7.599999904632568,
    temperatureOutside: 37.72999954223633,
    times: 1,
    total: 24,
    username: "",
  });

  const [position, setPosition] = useState(1);
  const [times, setTimes] = useState(1);
  const [message, setMessage] = useState();
  const [code, setCode] = useState(-1);

  const startSampling = async () => {
    try {
      console.log("position: ", position);
      console.log("times: ", times);
      await mockApi({}, 500);
    } catch (err) {
      console.log("");
      setCode(0);
    }
  };

  const resetSampling = async () => {
    try {
      await mockApi({}, 500);
    } catch (err) {
      setCode(0);
    }
  };

  return (
    <Box>
      <Container maxWidth={"sm"}>
        <Card>
          <Stack
            spacing={3}
            sx={{
              p: 3,
            }}>
            <TableContainer
              sx={{
                minWidth: 200,
              }}>
              <Table
                sx={{
                  p: 2,
                }}>
                {}
                <TableBody>
                  {}
                  <TableRow key={2}>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}>
                      Trạng thái
                    </TableCell>
                    <TableCell>
                      {tableData.enabled !== undefined && (
                        <Label
                          variant={
                            theme.palette.mode === "light" ? "ghost" : "filled"
                          }
                          color={(tableData.enabled && "success") || "error"}>
                          {tableData?.enabled ? "Enabled" : "Disabled"}
                        </Label>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow key={4}>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}>
                      Chế độ tự động
                    </TableCell>
                    <TableCell>
                      {tableData.autorun !== undefined && (
                        <Label
                          variant={
                            theme.palette.mode === "light" ? "ghost" : "filled"
                          }
                          color={
                            (tableData?.autorun && "success") || "warning"
                          }>
                          {tableData?.autorun ? "Đang bật" : "Đang tắt"}
                        </Label>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow key={5}>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}>
                      Số lần lấy mẫu
                    </TableCell>
                    <TableCell> {tableData?.times} </TableCell>
                  </TableRow>
                  <TableRow key={7}>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}>
                      Loại máy
                    </TableCell>
                    <TableCell>
                      {tableData.total && `${tableData.total} chai`}
                    </TableCell>
                  </TableRow>
                  <TableRow key={8}>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}>
                      Vị trí chai hiện tại
                    </TableCell>
                    <TableCell>{tableData?.currentDistributor}</TableCell>
                  </TableRow>
                  <TableRow key={9}>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}>
                      Vị trí chai lấy mẫu
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        defaultValue={position}
                        onChange={(e) => setPosition(Number(e.target.value))}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider />

            {code >= 0 && (
              <Alert
                severity={code === 200 ? "success" : "error"}
                sx={{
                  mb: 3,
                }}>
                {message}
              </Alert>
            )}

            <Stack direction="row" spacing={1.5}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={startSampling}>
                Lấy mẫu
              </Button>
              {tableData?.model !== 5 && (
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={resetSampling}
                  color="error">
                  Reset
                </Button>
              )}
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
