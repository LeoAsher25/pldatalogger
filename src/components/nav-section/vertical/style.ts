// @mui
import { Theme, alpha, styled } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ICON, NAVBAR } from "src/configs/config";

// Define types for the custom props
interface ListItemStyleProps {
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
}

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== "activeRoot" && prop !== "activeSub" && prop !== "subItem",
})<ListItemStyleProps & { theme?: Theme }>(
  ({ activeRoot, activeSub, subItem, theme }) => ({
    ...theme.typography.body2,
    position: "relative",
    height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main,
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
    }),
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
    }),
    ...(subItem && {
      height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
    }),
  })
);

interface ListItemTextStyleProps {
  isCollapse?: boolean;
}

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})<ListItemTextStyleProps & { theme?: Theme }>(({ isCollapse, theme }) => ({
  whiteSpace: "nowrap",
  transition: theme.transitions.create(["width", "opacity"], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    width: "100%",
    height: "100%",
  },
});

// import { alpha, styled, Theme } from "@mui/material/styles";
// import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
// import { ICON, NAVBAR } from "src/configs/config";

// interface ListItemStyleProps {
//   activeRoot: boolean;
//   activeSub: boolean;
//   subItem: boolean;
//   theme: Theme;
// }

// export const ListItemStyle = styled(ListItemButton, {
//   shouldForwardProp: (prop) =>
//     prop !== "activeRoot" && prop !== "activeSub" && prop !== "subItem",
// })<ListItemStyleProps>(({ activeRoot, activeSub, subItem, theme }) => ({
//   ...theme.typography.body2,
//   position: "relative",
//   height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
//   paddingLeft: theme.spacing(2),
//   paddingRight: theme.spacing(1.5),
//   marginBottom: theme.spacing(0.5),
//   color: theme.palette.text.secondary,
//   borderRadius: theme.shape.borderRadius,
//   ...(activeRoot && {
//     ...theme.typography.subtitle2,
//     color: theme.palette.primary.main,
//     backgroundColor: alpha(
//       theme.palette.primary.main,
//       theme.palette.action.selectedOpacity
//     ),
//   }),
//   ...(activeSub && {
//     ...theme.typography.subtitle2,
//     color: theme.palette.text.primary,
//   }),
//   ...(subItem && {
//     height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
//   }),
// }));

// interface ListItemTextStyleProps {
//   isCollapse: boolean;
//   theme?: Theme;
// }

// export const ListItemTextStyle = styled(ListItemText, {
//   shouldForwardProp: (prop) => prop !== "isCollapse",
// })<ListItemTextStyleProps>(({ isCollapse, theme }) => ({
//   whiteSpace: "nowrap",
//   transition: theme?.transitions.create(["width", "opacity"], {
//     duration: theme?.transitions.duration.shorter,
//   }),
//   ...(isCollapse && {
//     width: 0,
//     opacity: 0,
//   }),
// }));

// export const ListItemIconStyle = styled(ListItemIcon)(({ theme }) => ({
//   width: ICON.NAVBAR_ITEM,
//   height: ICON.NAVBAR_ITEM,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   "& svg": {
//     width: "100%",
//     height: "100%",
//   },
// }));
