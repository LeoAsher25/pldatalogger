import { useSnackbar } from "notistack";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// @mui
import { Button, Grid, Stack, Typography } from "@mui/material";

// components
import RHFSelect from "src/components/hook-form/RHFSelect";
import RHFSwitch from "src/components/hook-form/RHFSwitch";
import RHFTextField from "src/components/hook-form/RHFTextField";
import { useAppDispatch } from "src/hooks/customReduxHook";

export default function EditSamplerForm({
  submitRef,
  defines,
  connections,
  sampler,
  onSubmit,
}: any) {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const SamplerSchema = Yup.object().shape({
    name: Yup.string(),
    enabled: Yup.boolean().required("enabled is required"),
    protocol: Yup.number().required("protocol is required"),
    model: Yup.number().required("model is required"),
    connectionId: Yup.number().required("connectionId is required"),
    autorun: Yup.boolean().required("autorun is required"),
    times: Yup.number().required("times is required"),
    remoted: Yup.boolean().required("remoted is required"),
    method: Yup.number(),
    address: Yup.string(),
    port: Yup.number(),
    username: Yup.string(),
    password: Yup.string(),
    database: Yup.string(),
    tag: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: "",
      enabled: true,
      protocol: 0,
      model: 0,
      connectionId: 0,
      autorun: false,
      times: 1,
      remoted: false,
      method: 0,
      address: "",
      port: 0,
      username: "",
      password: "",
      database: "",
      tag: "",
    }),
    [sampler]
  );

  const methods = useForm({
    resolver: yupResolver(SamplerSchema),
    defaultValues,
  });

  useEffect(() => {
    sampler && reset(sampler);
  }, [sampler]);

  const { reset, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3} p={3} maxWidth={"xl"}>
        <Grid item xs={12} sm={6}>
          <Stack
            spacing={3}
            sx={{
              p: 3,
            }}>
            <Typography> Thông tin máy lấy mẫu </Typography>
            <RHFTextField name="name" label="Tên" />
            <RHFSwitch name="enabled" label="Kích hoạt" />
            <RHFSelect name="protocol" label="Giao thức">
              {defines?.protocols?.map((protocol: any, index: number) => (
                <option key={index} value={index}>
                  {protocol}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect name="model" label="Model">
              {defines?.models?.map((model: any, index: number) => (
                <option key={index} value={index}>
                  {model}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect name="connectionId" label="Kết nối">
              {connections?.map((connection: any, index: number) => (
                <option key={index} value={connection.id}>
                  {connection.name}
                </option>
              ))}
            </RHFSelect>
            <RHFSwitch name="autorun" label="Lấy mẫu tự động" />
            <RHFTextField name="times" label="Số lần lấy mẫu" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack
            spacing={3}
            sx={{
              p: 3,
            }}>
            <Typography> Lấy mẫu từ xa </Typography>
            <RHFSwitch name="remoted" label="Lấy mẫu từ xa" />
            <RHFSelect name="method" label="Phương thức">
              {[
                {
                  name: "Microsoft SQL",
                  value: 0,
                },
              ].map((method: any, index: number) => (
                <option key={method.value} value={method.value}>
                  {method.name}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField name="address" label="Host" />
            <RHFTextField name="port" label="Port" />
            <RHFTextField name="username" label="Username" />
            <RHFTextField name="password" label="Password" />
            <RHFTextField name="database" label="Database" />
            <RHFTextField name="tag" label="Tag" />
          </Stack>
        </Grid>
        <Button ref={submitRef} type="submit"></Button>
      </Grid>
    </FormProvider>
  );
}
