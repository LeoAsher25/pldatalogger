import { Box, List, ListSubheader } from "@mui/material";
import { styled } from "@mui/material/styles";
//
import { NavListRoot } from "./NavList";

const ListSubheaderStyle = styled((props: any) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}: SystemUI.NavSectionVerticalProps) {
  return (
    <Box {...other}>
      {navConfig.map((group: SystemUI.NavGroup) => (
        <List
          key={group.subheader}
          disablePadding
          sx={{
            px: 2,
          }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}>
            {group.subheader}
          </ListSubheaderStyle>
          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </List>
      ))}
    </Box>
  );
}
