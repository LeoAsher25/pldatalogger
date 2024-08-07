import { useSnackbar } from "notistack";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  DialogActions,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

// components
import { useEffect, useState } from "react";
import { Models, Protocols } from "src/defines";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import { createSensor, updateSensor } from "src/redux/configuration";
import { SystemTypes } from "src/types";
import RHFSelect from "../hook-form/RHFSelect";
import RHFSwitch from "../hook-form/RHFSwitch";
import RHFTextField from "../hook-form/RHFTextField";
// import {
//   FormProvider,
//   RHFSelect,
//   RHFSwitch,
//   RHFTextField,
// } from "../../../components/hook-form";

const _ = require("lodash");

const UNITS = [
  "%",
  "°",
  "°C",
  "µS/cm",
  "µg/L",
  "µg/Nm³",
  "A",
  "FTU",
  "hPa",
  "km/h",
  "kPa",
  "m",
  "m/s",
  "m³",
  "m³/h",
  "m³/min",
  "m³/s",
  "mA",
  "mg/L",
  "mg/Nm³",
  "mg/m³",
  "mm",
  "mS/cm",
  "mV",
  "NTU",
  "ppb",
  "ppm",
  "PtCo",
  "S/cm",
  "V",
  "W/m²",
];

const getInitialValues = (
  sensor: SystemTypes.SensorData
): SystemTypes.SensorData => {
  const defaultValues = {
    name: "",
    variable: "",
    enabled: true,
    status: 3,
    syncing: true,
    unit: "",
    precision: 2,
    protocol: 0,
    model: 0,
    connectionId: 0,
    enableCalibration: false,
    enableAlarm: false,
    calibration: {
      positive: false,
      slope: "",
      offset: "",
      formula: "",
    },
    alarm: {
      highThreshold: "",
      lowThreshold: "",
      earlyHighThreshold: "",
      earlyLowThreshold: "",
    },
    configuration: {
      view: {
        common: {
          visible: true,
        },
        grid: {
          columnSpan: 1,
          rowSpan: 1,
        },
      },
      modbus: {
        standard: {
          deviceAddress: 1,
          registerType: 4,
          startAddress: 0,
          dataType: 0,
          endian: 0,
        },
      },
      sql: {
        // standard: {
        //   database: '',
        //   table: '',
        //   column: '',
        //   columnIndex: 0,
        //   dataType: 0,
        // },
        dcs: {
          table: "",
          column: "",
          dataType: 0,
          required: false,
        },
      },
      http: {
        wtw: {
          sid: 0,
          vid: 0,
        },
      },
      serial: {
        systea: {
          line: 1,
          index: 0,
        },
        young: {
          index: 0,
        },
        sigas: {
          index: 0,
        },
      },
      customize: {
        total: {
          sensorId: 0,
          totalMode: 0,
        },
      },
    },
  };

  if (_.isObject(sensor) && !_.isEmpty(sensor)) {
    return _.merge({}, defaultValues, sensor);
  }

  return defaultValues as SystemTypes.SensorData;
};

// ----------------------------------------------------------------------
export default function SensorForm({ sensor, onCancel }: any) {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { connections, sensors, defines } = useAppSelector(
    (state) => state.configurationState
  );

  const [editing, setEditing] = useState(false);

  const SensorSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    variable: Yup.string(),
    enabled: Yup.boolean().required("enabled is required"),
    status: Yup.number().required("status is required"),
    syncing: Yup.boolean().required("syncing is required"),
    unit: Yup.string(),
    precision: Yup.number(),
    protocol: Yup.number(),
    model: Yup.number().required("model is required"),
    connectionId: Yup.number().required("connectionId is required"),
    enableCalibration: Yup.boolean(),
    enableAlarm: Yup.boolean(),
    calibration: Yup.object().shape({
      positive: Yup.boolean(),
      slope: Yup.string(),
      offset: Yup.string(),
      formula: Yup.string(),
    }),
    alarm: Yup.object().shape({
      highThreshold: Yup.string(),
      lowThreshold: Yup.string(),
      earlyHighThreshold: Yup.string(),
      earlyLowThreshold: Yup.string(),
    }),
    configuration: Yup.object().shape({
      view: Yup.object().shape({
        common: Yup.object().shape({
          visible: Yup.boolean(),
        }),
        grid: Yup.object().shape({
          columnSpan: Yup.number(),
          rowSpan: Yup.number(),
        }),
      }),
      modbus: Yup.object().shape({
        standard: Yup.object().shape({
          deviceAddress: Yup.number(),
          registerType: Yup.number(),
          startAddress: Yup.number(),
          dataType: Yup.number(),
          endian: Yup.number(),
        }),
      }),
      sql: Yup.object().shape({
        // standard: Yup.object().shape({
        //   database: Yup.string(),
        //   table: Yup.string(),
        //   column: Yup.string(),
        //   columnIndex: Yup.number(),
        //   dataType: Yup.number(),
        // }),
        dcs: Yup.object().shape({
          table: Yup.string(),
          column: Yup.string(),
          dataType: Yup.number(),
          required: Yup.boolean(),
        }),
      }),
      http: Yup.object().shape({
        wtw: Yup.object().shape({
          sid: Yup.number(),
          vid: Yup.number(),
        }),
      }),
      serial: Yup.object().shape({
        systea: Yup.object().shape({
          line: Yup.number(),
          index: Yup.number(),
        }),
        young: Yup.object().shape({
          index: Yup.number(),
        }),
        sigas: Yup.object().shape({
          index: Yup.number(),
        }),
      }),
      customize: Yup.object().shape({
        total: Yup.object().shape({
          sensorId: Yup.number(),
          totalMode: Yup.number(),
        }),
      }),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(SensorSchema),
    defaultValues: getInitialValues(sensor),
  });

  const {
    setValue,
    reset,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (connections?.length > 0 && values.connectionId <= 0)
      setValue("connectionId", connections[0].id);
  }, [values]);

  useEffect(() => {
    const isEdit = _.isObject(sensor) && !_.isEmpty(sensor);
    setEditing(isEdit);
    reset(getInitialValues(sensor));
  }, [dispatch, sensor]);

  useEffect(() => {}, [values]);

  const onSubmit = async (config: any) => {
    try {
      console.log("config: ", config);
      let result;
      if (editing) {
        result = await dispatch(
          updateSensor(Object.assign(config, { id: sensor?.id }))
        );
      } else {
        result = await dispatch(createSensor(config));
      }

      if (result?.success) {
        enqueueSnackbar(
          editing ? "Cập nhật cảm biến thành công!" : "Tạo cảm biến thành công!"
        );
        reset();
        onCancel();
      } else {
        enqueueSnackbar("Đã xảy ra lỗi!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi!", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
            <Divider>
              <Chip color="primary" label="THÔNG TIN CẢM BIẾN" />
            </Divider>
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent="space-between"
              alignItems="center">
              <RHFSwitch name="enabled" label="Kích hoạt" />
              <RHFSwitch name="syncing" label="Đồng bộ" />
            </Stack>
            <RHFTextField name="name" label="Tên cảm biến" />
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent="space-between"
              alignItems="center">
              <RHFTextField name="variable" label="Tên biến" />
              <RHFSelect name="status" label="Trạng thái">
                {defines?.sensorStatus?.map((status: any, index: number) => (
                  <option key={index} value={index}>
                    {status}
                  </option>
                ))}
              </RHFSelect>
            </Stack>

            <Stack spacing={2} direction={"row"} justifyContent="space-between">
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    disableClearable
                    fullWidth
                    options={UNITS.map((unit) => unit)}
                    getOptionLabel={(unit) => unit || ""}
                    renderInput={(params) => (
                      <TextField label="Đơn vị" {...params} />
                    )}
                    onChange={(_, value) => setValue("unit", value)}
                  />
                )}
              />
              <RHFTextField name="precision" label="Độ chính xác" />
            </Stack>

            <RHFSelect
              name="protocol"
              label="Giao thức"
              // onChange={(event: any) =>
              //   setValue("protocol", Number(event.target.value))
              // }
            >
              {defines?.protocols?.map((protocol: any, index: number) => (
                <option key={index} value={index}>
                  {protocol}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect
              name="model"
              label="Model"
              // onChange={(event: any) =>
              //   setValue("model", Number(event.target.value))
              // }
            >
              {defines?.models?.map((model: any, index: number) => (
                <option key={index} value={index}>
                  {model}
                </option>
              ))}
            </RHFSelect>
            {(values?.protocol !== Protocols.CUSTOMIZE ||
              values?.model !== Models.TOTAL) && (
              <RHFSelect
                name="connectionId"
                label="Kết nối"
                // onChange={(event: any) =>
                //   setValue("connectionId", Number(event.target.value))
                // }
              >
                {connections?.map((connection, index) => (
                  <option key={index} value={connection.id}>
                    {connection.name}
                  </option>
                ))}
              </RHFSelect>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
            <Divider>
              <Chip color="primary" label="HIỆU CHUẨN" />
            </Divider>
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent="space-between"
              alignItems="center">
              <RHFSwitch
                name="enableCalibration"
                label="Kích hoạt"
                align="right"
              />
              <RHFSwitch name="calibration.positive" label="Luôn dương" />
            </Stack>
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent="space-between"
              alignItems="center">
              <RHFTextField name="calibration.slope" label="Slope" />
              <RHFTextField name="calibration.offset" label="Offset" />
            </Stack>
            <RHFTextField
              name="calibration.formula"
              label="Công thức"
              multiline
              rows={3}
            />

            <Divider>
              <Chip color="primary" label="CẢNH BÁO" />
            </Divider>
            <RHFSwitch name="enableAlarm" label="Kích hoạt" />
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent="space-between"
              alignItems="center">
              <RHFTextField name="alarm.highThreshold" label="Ngưỡng trên" />
              <RHFTextField
                name="alarm.earlyHighThreshold"
                label="Ngưỡng trên sớm"
              />
            </Stack>
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent="space-between"
              alignItems="center">
              <RHFTextField name="alarm.lowThreshold" label="Ngưỡng dưới" />
              <RHFTextField
                name="alarm.earlyLowThreshold"
                label="Ngưỡng dưới sớm"
              />
            </Stack>
          </Stack>
        </Grid>

        {(values.protocol === Protocols.MODBUS_RTU ||
          values.protocol === Protocols.MODBUS_TCP) && (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
              <Divider>
                <Chip color="primary" label="CẤU HÌNH MODBUS" />
              </Divider>
              <RHFTextField
                name="configuration.modbus.standard.deviceAddress"
                label="Địa chỉ cảm biến"
              />
              <RHFSelect
                name="configuration.modbus.standard.registerType"
                label="Thanh ghi"
                // onChange={(event: any) =>
                //   setValue(
                //     "configuration.modbus.standard.registerType",
                //     Number(event.target.value)
                //   )
                // }
              >
                {[
                  "Invalid",
                  "Inputs",
                  "Coils",
                  "Input Registers",
                  "Holding Registers",
                ].map((type, index) => (
                  <option key={index} value={index}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="configuration.modbus.standard.startAddress"
                label="Địa chỉ bắt đầu"
                // onChange={(event: any) =>
                //   setValue(
                //     "configuration.modbus.standard.startAddress",
                //     Number(event.target.value)
                //   )
                // }
              />
              <RHFSelect
                name="configuration.modbus.standard.dataType"
                label="Kiểu dữ liệu"
                // onChange={(event: any) =>
                //   setValue(
                //     "configuration.modbus.standard.dataType",
                //     Number(event.target.value)
                //   )
                // }
              >
                {[
                  "UINT16",
                  "INT16",
                  "UINT32",
                  "INT32",
                  "FLOAT32",
                  "FLOAT64",
                ].map((type, index) => (
                  <option key={index} value={index}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="configuration.modbus.standard.endian"
                label="Endian"
                // onChange={(event) =>
                //   setValue(
                //     "configuration.modbus.standard.endian",
                //     Number(event.target.value)
                //   )
                // }
              >
                {defines?.endians?.map((encoding: any, index: number) => (
                  <option key={index} value={index}>
                    {encoding}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          </Grid>
        )}

        {values?.protocol === Protocols.HTTP &&
          values?.model === Models.WTW && (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH WTW" />
                </Divider>
                <RHFSelect
                  name="configuration.http.wtw.sid"
                  label="SensorID"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.http.wtw.sid",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {[
                    "S01",
                    "S02",
                    "S03",
                    "S04",
                    "S05",
                    "S06",
                    "S07",
                    "S08",
                    "S09",
                    "S10",
                  ].map((type, index) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="configuration.http.wtw.vid"
                  label="ValueID"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.http.wtw.vid",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {["Value 1", "Value 2"].map((type, index) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Grid>
          )}

        {values?.protocol === Protocols.SERIAL &&
          values?.model === Models.SYSTEA && (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH SYSTEA µMAC" />
                </Divider>
                <RHFSelect
                  name="configuration.serial.systea.line"
                  label="Line"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.serial.systea.line",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((type, index) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="configuration.serial.systea.index"
                  label="Index"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.serial.systea.index",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {[1, 2, 3, 4].map((type, index) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Grid>
          )}

        {values?.protocol === Protocols.SERIAL &&
          values?.model === Models.YOUNG && (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH YOUNG RESPONSE ONE" />
                </Divider>
                <RHFSelect
                  name="configuration.serial.young.index"
                  label="Index"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.serial.young.index",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {[
                    "Tốc độ gió",
                    "Hướng gió",
                    "Nhiệt độ",
                    "Độ ẩm",
                    "Áp suất",
                  ].map((type, index) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Grid>
          )}

        {values?.protocol === Protocols.SERIAL &&
          values?.model === Models.SIGAS && (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH SIGAS" />
                </Divider>
                <RHFSelect
                  name="configuration.serial.sigas.index"
                  label="Index"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.serial.sigas.index",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {[1, 2, 3, 4].map((type, index) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Grid>
          )}

        {values?.protocol === Protocols.CUSTOMIZE &&
          values?.model === Models.TOTAL && (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH LƯU LƯỢNG" />
                </Divider>
                <RHFSelect
                  name="configuration.customize.total.sensorId"
                  label="Cảm biến"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.customize.total.sensorId",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {sensors?.map((sensor, index) => (
                    <option key={index} value={sensor.id}>
                      {sensor.name}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="configuration.customize.total.totalMode"
                  label="Chế độ"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.customize.total.totalMode",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {defines?.resetModes?.map((mode: any, index: number) => (
                    <option key={index} value={index}>
                      {mode}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Grid>
          )}

        {values?.protocol === Protocols.SQL &&
          values?.model === Models.DCS_SQL && (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Stack spacing={2} sx={{ pt: 0, pl: 3, pr: 3 }}>
                <Divider>
                  <Chip color="primary" label="CẤU HÌNH DỮ LIỆU TRẠM CÂN" />
                </Divider>
                <RHFTextField name="configuration.sql.dcs.table" label="Bảng" />
                <RHFTextField name="configuration.sql.dcs.column" label="Cột" />
                <RHFSelect
                  name="configuration.sql.dcs.dataType"
                  label="Kiểu dữ liệu"
                  // onChange={(event) =>
                  //   setValue(
                  //     "configuration.sql.dcs.dataType",
                  //     Number(event.target.value)
                  //   )
                  // }
                >
                  {["Số nguyên", "Số thực", "Thời gian", "Chuỗi"].map(
                    (type, index) => (
                      <option key={index} value={index}>
                        {type}
                      </option>
                    )
                  )}
                </RHFSelect>
                <RHFSwitch
                  name="configuration.sql.dcs.required"
                  label="Required"
                  align="right"
                />
              </Stack>
            </Grid>
          )}
      </Grid>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Hủy bỏ
        </Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {editing ? "Cập nhật" : "Thêm"}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
