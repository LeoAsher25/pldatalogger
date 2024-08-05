import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  lighten,
} from "@mui/material";
import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { makeStyles } from "@mui/material/styles";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { SystemUI } from "src/types";

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    width: "95%",
    margin: "4px auto",
    borderRadius: "8px",
    transition: "all .5s",
    overflow: "hidden",
    backgroundColor: "white",

    "& .MuiCollapse-wrapper [class*=makeStyles-listLink]": {
      padding: "0 20px 0 10px !important",
    },
  },
  listItem: {
    transition: "all .5s",
    display: "flex",
    flexDirection: "column",
    padding: "0 !important",
    height: "48px",
    lineHeight: "48px",
  },
  listLink: {
    padding: "0 15px",
    textDecoration: "none",
    color: "inherit",
    transition: "all .5s",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  listLinkCollapsed: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  listIcon: {
    color: "inherit",
    justifyContent: "center",
  },
  expanded: {
    // backgroundColor: lighten(theme.palette.secondary.main, 0.1),
  },
  selectedBg: {
    backgroundColor: `${lighten(theme.palette.success.light, 0.8)} !important`,
  },

  selectedText: {
    color: theme.palette.success.main,
    fontWeight: "500 !important",
    transition: "0.3s",

    "& > span": {
      color: theme.palette.success.main,
      fontWeight: "500 !important",
      transition: "0.3s",
    },
  },
}));

const NavigationItem = ({ item, collapsed }: SystemUI.NavItemProps) => {
  const { pathname } = useLocation();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const nested = Boolean(item.children);

  const handleClick = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (
      pathname.includes(item.url) &&
      item.children &&
      item.children?.length > 0
    ) {
      setOpen(true);
    }
  }, [pathname, item]);

  return (
    <div
      className={clsx(
        classes.root,
        nested && open && classes.expanded,
        pathname === item.url && !nested && classes.selectedBg
      )}>
      <ListItem
        button
        className={clsx(
          classes.listItem,
          pathname.includes(item.url) && nested && classes.selectedBg
        )}
        onClick={handleClick}
        disableGutters>
        <Box
          component={!nested ? Link : "div"}
          to={!nested ? `${item.url}` : undefined}
          className={clsx(
            classes.listLink,
            collapsed && classes.listLinkCollapsed
          )}>
          <ListItemIcon className={classes.listIcon}>
            {item.icon && (
              <item.icon
                className={
                  ((pathname === item.url && !nested) ||
                    (pathname.includes(item.url) && nested)) &&
                  classes.selectedText
                }
              />
            )}
          </ListItemIcon>
          <ListItemText
            className={clsx(
              ((pathname === item.url && !nested) ||
                (pathname.includes(item.url) && nested)) &&
                classes.selectedText
            )}
            style={{ display: collapsed ? "none" : "inline" }}>
            {item.name}
          </ListItemText>
          {nested && (open ? <ExpandLess /> : <ExpandMore />)}
        </Box>
      </ListItem>

      {nested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children!.map((nestedItem, i) => (
              <NavigationItem key={i} item={nestedItem} collapsed={collapsed} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export default NavigationItem;
