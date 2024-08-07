import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// @mui
import { Button, Stack, Typography } from "@mui/material";

import RHFTextField from "src/components/hook-form/RHFTextField";

// ----------------------------------------------------------------------

DeviceGeneral.propTypes = {
  submitRef: PropTypes.any,
  webServer: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default function DeviceGeneral({ submitRef, webServer, onSubmit }: any) {
  const Schema = Yup.object().shape({
    title: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: "",
    }),
    [webServer]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  useEffect(() => {
    webServer && reset(webServer);
  }, [webServer]);

  const { reset, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Stack
        spacing={3}
        sx={{
          p: 3,
        }}>
        <Typography variant="h6"> Giao diện WebServer </Typography>
        <RHFTextField name="title" label="Tiêu đề" />
      </Stack>
      <Button ref={submitRef} type="submit"></Button>
    </FormProvider>
  );
}
