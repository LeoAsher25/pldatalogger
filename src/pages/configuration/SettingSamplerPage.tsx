import { useEffect, useRef } from "react";

// @mui
import { Card, Container, Stack } from "@mui/material";

// components
import Page from "../../components/Page";

// components
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import EditSamplerForm from "src/components/sample/EditSamplerForm";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import {
  getConnections,
  getDefines,
  getSampler,
  updateSampler,
} from "src/stores/configuration";
import { useLocation } from "react-router";

// ----------------------------------------------------------------------

export default function SettingSamplerPage() {
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    console.log("location: ", location);
  }, [location]);

  const { enqueueSnackbar } = useSnackbar();

  const { defines, sampler, connections } = useAppSelector(
    (state) => state.configurationState
  );

  const submitRef = useRef<any>(null);

  const onSubmit = async (data: any) => {
    try {
      dispatch(updateSampler(data));
      enqueueSnackbar("Cập nhật thành công!");
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi!", {
        variant: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getDefines());
    dispatch(getConnections());
    dispatch(getSampler());
  }, [dispatch]);

  return (
    <Page title="Cấu hình máy lấy mẫu">
      <Container maxWidth={"lg"}>
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
            size="large"
            variant="contained"
            loading={false}
            onClick={(e) => submitRef?.current?.click()}>
            Cập nhật
          </LoadingButton>
        </Stack>

        <Card>
          <EditSamplerForm
            submitRef={submitRef}
            defines={defines}
            connections={connections}
            sampler={sampler}
            onSubmit={onSubmit}
          />
        </Card>
      </Container>
    </Page>
  );
}
