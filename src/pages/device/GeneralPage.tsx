import { useEffect, useRef } from "react";

// @mui
import { Card, Container, Stack } from "@mui/material";

// _mock_
// components
import Page from "../../components/Page";

// _mock_
// components
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import DeviceGeneral from "src/components/device/DeviceGeneral";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import {
  getWebServerConfig,
  setWebServerConfig,
} from "src/redux/configuration";
import { getRealtime } from "src/redux/data";

// ----------------------------------------------------------------------

export default function DataRealtime() {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { webServer } = useAppSelector((state) => state.configurationState);

  const submitRef = useRef<any>(null);

  const onSubmit = async (data: any) => {
    try {
      dispatch(setWebServerConfig(data));
      enqueueSnackbar("Cập nhật thành công!");
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi!", {
        variant: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getWebServerConfig());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getSeconds() % 10 == 0) {
        dispatch(getRealtime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page title="Cài đặt chung">
      <Container maxWidth={false}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            mb: 2,
          }}>
          <LoadingButton
            sx={{
              px: 3,
            }}
            size="small"
            variant="contained"
            loading={false}
            onClick={(e) => submitRef?.current?.click()}>
            Cập nhật
          </LoadingButton>
        </Stack>

        <Card>
          <DeviceGeneral
            submitRef={submitRef}
            webServer={webServer}
            onSubmit={onSubmit}
          />
        </Card>
      </Container>
    </Page>
  );
}
