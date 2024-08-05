// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Switch, FormControlLabel } from "@mui/material";

// ----------------------------------------------------------------------

export default function RHFSwitch({ name, label, ...other }: any) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}
