import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import Navigation from "src/components/Navigation/Navigation";
import Page from "src/components/Page";
import AvatarPopup from "src/components/header/AvatarPopup";
import { useAppSelector } from "src/hooks/customReduxHook";
import { RootState } from "src/redux/rootReducer";
import { Theme } from "@material-ui/core";
import useResponsive from "src/hooks/useResponsive";

const drawerWidth = 280;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  appBarShift: {
    "&.MuiPaper-root": {
      zIndex: theme.zIndex.drawer + 2,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("sm")]: {},
    },
  },
  appBar: {
    "&.MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: "none",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 2,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("sm")]: {},
    },
    boxShadow: "none",
    border: "0",
    borderBottom: "1px solid #0001 !important",
    backgroundColor: "white",
  },
  menuButton: {
    display: (extended) => {
      return extended ? "none !important" : "block";
    },
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary + " !important",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  collapseButton: {
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
  extendButton: {
    "&.MuiButtonBase-root": {
      color: theme.palette.text.primary,
      marginRight: 36,
      [theme.breakpoints.down("sm")]: { display: "none !important" },
    },
  },
  extendButtonHidden: {
    "&.MuiButtonBase-root": {
      display: "none",
    },
  },
  toolbar: {
    "&.MuiToolbar-root": {
      padding: "8px 24px",
      height: 80,
      backgroundColor: "white",
      ...theme.mixins.toolbar,
      minHeight: "80px !important",
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    padding: "0 8px 0 24px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    "&.drawer-paper-wrap": {
      width: drawerWidth,
      display: "flex",
      position: "fixed",
      height: "100vh",
      whiteSpace: "nowrap",
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),

      // color: theme.palette.type === "light" && theme.palette.grey[100],
      // backgroundColor: theme.palette.secondary.main,
    },
  },
  drawerPaperClose: {
    "&.drawer-paper-close-wrap": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    },
  },
  appBarTitle: {
    flex: 1,
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  contentShift: {
    flexGrow: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(7),
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  drawerFooter: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
}));

interface MainLayoutProps {
  navigationData: Array<any>; // You may want to define a more specific type for your navigation data
}

const MainLayout: React.FC<MainLayoutProps> = ({ navigationData }) => {
  const { pageTitle } = useAppSelector(
    (state: RootState) => state.settingsState
  );
  const smUp = useResponsive("up", "sm");
  const [extended, setExtended] = useState<boolean>(true);
  const classes = useStyles(extended);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExtendOpen = () => {
    setExtended(true);
  };

  const handleExtendClose = () => {
    setExtended(false);
  };

  useEffect(() => {
    setExtended(smUp!);
  }, [smUp]);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [pathname]);

  const renderDrawer = (isHidden: boolean) => {
    return (
      <Fragment>
        <div className={classes.toolbarIcon}>
          <img width={46} src="/images/logo.png" alt="logo" />
          <IconButton
            onClick={handleExtendClose}
            className={classes.collapseButton}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Navigation
          data={navigationData}
          collapsed={isHidden ? false : !extended}
        />
      </Fragment>
    );
  };

  return (
    <Page title={pageTitle}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={clsx(classes.appBarShift, extended && classes.appBar)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="extend drawer"
              onClick={handleExtendOpen}
              className={clsx(
                classes.extendButton,
                extended && classes.extendButtonHidden
              )}>
              <ChevronRightIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.appBarTitle}>
              {pageTitle}
            </Typography>

            <AvatarPopup />
          </Toolbar>
        </AppBar>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            PaperProps={{
              className: "drawer-paper-wrap",
            }}
            ModalProps={{
              keepMounted: true,
            }}>
            {renderDrawer(true)}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !extended && classes.drawerPaperClose
              ),
            }}
            PaperProps={{
              className: "drawer-paper-wrap drawer-paper-close-wrap",
            }}
            open={extended}>
            {renderDrawer(false)}
          </Drawer>
        </Hidden>
        <main
          className={clsx(
            classes.contentShift,
            extended ? classes.content : {}
          )}>
          <Toolbar className={classes.toolbar} />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: smUp ? "24px 32px" : "12px 12px",
            }}>
            <Outlet />
          </div>
        </main>
      </div>
    </Page>
  );
};

export default MainLayout;
