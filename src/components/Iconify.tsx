// icons
import { Icon } from "@iconify/react";
// @mui
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface IconifyProps extends BoxProps {
  icon: any;
  sx?: any;
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
