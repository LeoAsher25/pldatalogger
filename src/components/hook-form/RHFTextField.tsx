// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { BaseTextFieldProps, TextField } from "@mui/material";

interface RHFTextFieldProps extends BaseTextFieldProps {
  name: string;
}

export default function RHFTextField({ name, ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
