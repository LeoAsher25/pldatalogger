import { useCallback, useEffect, useState } from "react";

// @mui
import {
  Card,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// _mock_
// components
import Page from "../../components/Page";

// components
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import { getDeviceInformation } from "src/redux/device";
import axiosInstance from "src/utils/axiosInstance";
import UploadSingleFile from "src/components/upload/UploadSingleFile";

// ----------------------------------------------------------------------

export default function UpdaterPage() {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState<any>(null);
  const { deviceInfo } = useAppSelector((state) => state.deviceState);

  useEffect(() => {
    dispatch(getDeviceInformation());
  }, [dispatch]);

  const handleDropSingleFile = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          // preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const upload = async () => {
    try {
      var formData = new FormData();
      formData.append("file", file!);
      const response = await axiosInstance.post("/api/upload/ota", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      enqueueSnackbar(response.data.message || "Cập nhật thành công!");
    } catch (ex) {
      enqueueSnackbar("Cập nhật không thành công!", {
        variant: "error",
      });
    }
  };

  return (
    <Page title="Cập nhật phần mềm">
      <Container maxWidth={false}>
        <Card>
          <Stack
            spacing={3}
            sx={{
              p: 3,
            }}>
            <Typography variant="h6"> Phiên bản hiện tại </Typography>
            <TextField
              name="appVersion"
              label="Phần mềm"
              value={deviceInfo.version || ""}
            />
            <TextField
              name="kernel"
              label="Kernel"
              value={deviceInfo.kernel || ""}
            />
            <Divider />
            <Typography variant="h6"> Cập nhật gói </Typography>
            <UploadSingleFile
              accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
              file={file}
              onDrop={handleDropSingleFile}
            />
            <TextField
              name="package"
              label="Package"
              value={(file && file.name) || ""}
            />
            <LoadingButton
              sx={{
                p: 0,
              }}
              size="large"
              variant="contained"
              loading={false}
              onClick={upload}
              disabled={!file}>
              Cập nhật
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
