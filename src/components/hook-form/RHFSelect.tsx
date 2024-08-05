// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { BaseTextFieldProps, TextField } from "@mui/material";

interface RHFRHFSelectProps extends BaseTextFieldProps {
  name: string;
}
export default function RHFSelect({
  name,
  children,
  ...other
}: RHFRHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}>
          {children}
        </TextField>
      )}
    />
  );
}
