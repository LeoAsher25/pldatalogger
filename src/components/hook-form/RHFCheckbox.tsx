// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, "control"> {
  name: string;
}

export function RHFCheckbox({ name, label, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      label={label}
      {...other}
    />
  );
}
