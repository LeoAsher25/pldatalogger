import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Divider,
  Grid,
  Stack,
} from "@mui/material";

import { HttpVersion, Models, Protocols } from "src/defines";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import { createConnection, updateConnection } from "src/stores/configuration";
import RHFTextField from "src/components/hook-form/RHFTextField";
import RHFSwitch from "src/components/hook-form/RHFSwitch";
import RHFSelect from "src/components/hook-form/RHFSelect";
const _ = require("lodash");

const getInitialValues = (connection: any) => {
  const defaultValues = {
    name: "",
    enabled: true,
    protocol: Protocols.MODBUS_RTU,
    model: Models.STANDARD,
    maintenance: false,
    configuration: {
      serial: {
        standard: {
          portName: "",
          baudRate: 9600,
          dataBits: 8,
          parity: 0,
          stopBits: 1,
        },
      },
      network: {
        standard: {
          host: "",
          port: 80,
        },
        wtw: {
          host: "",
          port: 80,
          http: HttpVersion.v1_1,
        },
      },
      current: {
        standard: {
          index: 0,
        },
      },
      sql: {
        // standard: {
        //   connectionString: '',
        //   driver: '',
        //   host: '',
        //   port: '',
        //   database: '',
        //   username: '',
        //   password: '',
        // },
        dcs: {
          connectionString: "",
          condition: "",
        },
      },
    },
  };

  if (_.isObject(connection) && !_.isEmpty(connection)) {
    return _.merge({}, defaultValues, connection);
  }

  return defaultValues;
};

// ----------------------------------------------------------------------
export default function ConnectionForm({ connection, onCancel }: any) {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { defines } = useAppSelector((state) => state.configurationState);

  const [editing, setEditing] = useState(false);

  const ConnectionSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    enabled: Yup.boolean().required("enabled is required"),
    protocol: Yup.number().required("protocol is required"),
    model: Yup.number().required("model is required"),
    maintenance: Yup.boolean().required("maintenance is required"),
    configuration: Yup.object().shape({
      serial: Yup.object().shape({
        standard: Yup.object().shape({
          portName: Yup.string(),
          baudRate: Yup.number(),
          dataBits: Yup.number(),
          parity: Yup.number(),
          stopBits: Yup.number(),
        }),
      }),
      network: Yup.object().shape({
        standard: Yup.object().shape({
          host: Yup.string(),
          port: Yup.number(),
        }),
        wtw: Yup.object().shape({
          host: Yup.string(),
          port: Yup.number(),
          http: Yup.number(),
        }),
      }),
      current: Yup.object().shape({
        standard: Yup.object().shape({
          index: Yup.number(),
        }),
      }),
      sql: Yup.object().shape({
        // standard: Yup.object().shape({
        //   connectionString: Yup.string(),
        //   driver: Yup.string(),
        //   host: Yup.string(),
        //   port: Yup.number(),
        //   database: Yup.string(),
        //   username: Yup.string(),
        //   password: Yup.string(),
        // }),
        dcs: Yup.object().shape({
          connectionString: Yup.string(),
          condition: Yup.string(),
        }),
      }),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(ConnectionSchema),
    defaultValues: getInitialValues(connection),
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (config: any) => {
    try {
      console.log("config: ", config);
      let result;
      if (editing) {
        result = await dispatch(
          updateConnection(
            Object.assign(config, {
              id: connection?.id,
            })
          )
        );
      } else {
        result = await dispatch(createConnection(config));
      }

      if (result?.success) {
        enqueueSnackbar(
          editing ? "Cập nhật kết nối thành công!" : "Tạo kết nối thành công!"
        );
        reset();
        onCancel();
      } else {
        enqueueSnackbar("Đã xảy ra lỗi!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi!", {
        variant: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("values: ", values);
  }, [values]);

  useEffect(() => {
    const isEdit = _.isObject(connection) && !_.isEmpty(connection);
    setEditing(isEdit);
  }, [dispatch, connection]);

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3} p={3}>
        {/* COMMON INFO */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Stack
            spacing={3}
            sx={{
              p: 3,
            }}>
            <Divider>
              <Chip color="primary" label="THÔNG TIN KẾT NỐI" />
            </Divider>
            <RHFTextField name="name" label="Kết nối" />
            <RHFSwitch name="enabled" label="Kích hoạt" />
            <RHFSelect name="protocol" label="Giao thức">
              {defines?.protocols.map((protocol: any, index: number) => (
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
            <RHFSwitch name="maintenance" label="Bảo trì" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          {/* CONFIG SERIAL */}
          {(values.protocol === Protocols.MODBUS_RTU ||
            values.protocol === Protocols.SERIAL) && (
            <Stack
              spacing={3}
              sx={{
                p: 3,
              }}>
              <Divider>
                <Chip color="primary" label="CẤU HÌNH SERIAL" />
              </Divider>
              <RHFTextField
                name="configuration.serial.standard.portName"
                label="Port"
              />
              <RHFSelect
                name="configuration.serial.standard.baudRate"
                label="Baudrate">
                {[1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200].map(
                  (baudrate: any, index: number) => (
                    <option key={index} value={baudrate}>
                      {baudrate}
                    </option>
                  )
                )}
              </RHFSelect>
              <RHFSelect
                name="configuration.serial.standard.dataBits"
                label="Databits">
                {[5, 6, 7, 8].map((dataBit: any, index: number) => (
                  <option key={index} value={dataBit}>
                    {dataBit}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="configuration.serial.standard.parity"
                label="Parity">
                {[
                  {
                    text: "None",
                    value: 0,
                  },
                  {
                    text: "Even",
                    value: 2,
                  },
                  {
                    text: "Odd",
                    value: 3,
                  },
                  {
                    text: "Space",
                    value: 4,
                  },
                  {
                    text: "Mark",
                    value: 5,
                  },
                ].map((parity: any, index: number) => (
                  <option key={index} value={parity.value}>
                    {parity.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="configuration.serial.standard.stopBits"
                label="Stopbits">
                {[
                  {
                    text: "1",
                    value: 1,
                  },
                  {
                    text: "1.5",
                    value: 3,
                  },
                  {
                    text: "2",
                    value: 2,
                  },
                ].map((stopBit: any, index: number) => (
                  <option key={index} value={stopBit.value}>
                    {stopBit.text}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          )}
          {/* CONFIG NETWORK STANDARD */}
          {(values.protocol === Protocols.MODBUS_TCP ||
            (values.protocol === Protocols.HTTP &&
              values.model !== Models.WTW)) && (
            <Stack
              spacing={3}
              sx={{
                p: 3,
              }}>
              <Divider>
                <Chip color="primary" label="CẤU HÌNH NETWORK" />
              </Divider>
              <RHFTextField
                name="configuration.network.standard.host"
                label="Host"
              />
              <RHFTextField
                name="configuration.network.standard.port"
                label="Port"
              />
            </Stack>
          )}
          {/* CONFIG NETWORK HTTP WTW */}
          {values.protocol === Protocols.HTTP &&
            values.model === Models.WTW && (
              <Stack
                spacing={3}
                sx={{
                  p: 3,
                }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH NETWORK" />
                </Divider>
                <RHFTextField
                  name="configuration.network.wtw.host"
                  label="Host"
                />
                <RHFTextField
                  name="configuration.network.wtw.port"
                  label="Port"
                />
                <RHFSelect
                  name="configuration.network.wtw.http"
                  label="HTTP Version">
                  {[
                    "HTTP 0.9",
                    "HTTP 1.0",
                    "HTTP 1.1",
                    "HTTP 2.0",
                    "HTTP 3.0",
                  ].map((text: any, index: number) => (
                    <option key={index} value={index}>
                      {text}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            )}
          {/* CONFIG 4-20mA */}
          {values.protocol === Protocols.CURRENT && (
            <Stack
              spacing={3}
              sx={{
                p: 3,
              }}>
              <Divider>
                <Chip color="primary" label="CẤU HÌNH 4-20mA" />
              </Divider>
              <RHFSelect
                name="configuration.current.standard.index"
                label="Kênh">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((channel: any, index: number) => (
                  <option key={index} value={index}>
                    Kênh {channel}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          )}
          {/* CONFIG SQL STANDARD */}
          {/* {(values.protocol === Protocols.SQL && values.model === Models.STANDARD)
                        &&
                        <Stack spacing={3} sx={{ p: 3 }}>
                          <Typography>Cấu hình SQL Standard</Typography>
                          <RHFTextField name="configuration.sql.standard.connectionString" label="Connection String" multiline rows={5} />
                          <RHFTextField name="configuration.sql.standard.driver" label="Driver" />
                          <RHFTextField name="configuration.sql.standard.host" label="Host" />
                          <RHFTextField
                            name="configuration.sql.standard.port"
                            label="Port"
                            onChange={(event) => setValue('configuration.sql.standard.port', Number(event.target.value))}
                          />
                          <RHFTextField name="configuration.sql.standard.database" label="Database" />
                          <RHFTextField name="configuration.sql.standard.username" label="Username" />
                          <RHFTextField name="configuration.sql.standard.password" label="Password" />
                        </Stack>
                      } */}
          {/* CONFIG SQL DCS */}
          {values.protocol === Protocols.SQL &&
            values.model === Models.DCS_SQL && (
              <Stack
                spacing={3}
                sx={{
                  p: 3,
                }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH SQL DCS" />
                </Divider>
                <RHFTextField
                  name="configuration.sql.dcs.connectionString"
                  label="Connection String"
                  multiline
                  rows={5}
                />
                <RHFTextField
                  name="configuration.sql.dcs.condition"
                  label="Condition"
                  multiline
                  rows={3}
                />
              </Stack>
            )}
        </Grid>
      </Grid>
      <DialogActions>
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Đóng
        </Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {editing ? "Cập nhật" : "Thêm"}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
