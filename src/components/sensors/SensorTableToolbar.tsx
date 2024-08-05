import { Button, InputAdornment, Stack, TextField } from "@mui/material";
// components
import Iconify from "src/components/Iconify";

// ----------------------------------------------------------------------

export default function SensorTableToolbar({
  onSearch,
  onAdd,
}: {
  onSearch: any;
  onAdd: any;
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5, px: 3 }}>
      <TextField
        onChange={onSearch}
        placeholder="Tìm kiếm..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}>
        <Button variant="outlined" onClick={onAdd}>
          Thêm
        </Button>
      </Stack>
    </Stack>
  );
}
