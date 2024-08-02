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
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import Navigation from "src/components/Navigation/Navigation";
import Page from "src/components/Page";
import AvatarPopup from "src/components/header/AvatarPopup";
import { useAppSelector } from "src/hooks/customReduxHook";
import { RootState } from "src/stores/rootReducer";
const drawerWidth = 250;

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  appBarShift: {
    "&.MuiPaper-root": {
      [theme.breakpoints.up("sm")]: {
        zIndex: theme.zIndex.drawer + 2,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    },
  },
  appBar: {
    "&.MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: "none",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 2,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    },
    boxShadow: "none",
    border: "0",
    borderBottom: "1px solid #0001 !important",
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary + " !important",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  collapseButton: {
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  extendButton: {
    "&.MuiButtonBase-root": {
      color: theme.palette.text.primary,
      marginRight: 36,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
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
    "&[class*='makeStyles-drawerPaper']": {
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
    "&[class*='makeStyles-drawerPaperClose']": {
      [theme.breakpoints.up("sm")]: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
      },
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
  const theme = useTheme();
  const { pageTitle } = useAppSelector(
    (state: RootState) => state.settingsState
  );
  const [extended, setExtended] = useState<boolean>(true);
  const classes = useStyles(extended);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExtendOpen = () => {
    setExtended(true);
  };

  const handleExtendClose = () => {
    setExtended(false);
  };

  const drawer = (
    <Fragment>
      <div className={classes.toolbarIcon}>
        <img width={46} src="images/logo.png" alt="logo" />
        <IconButton
          onClick={handleExtendClose}
          className={classes.collapseButton}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Navigation data={navigationData} collapsed={!extended} />
    </Fragment>
  );

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
            ModalProps={{
              keepMounted: true,
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !extended && classes.drawerPaperClose
              ),
            }}
            open={extended}>
            {drawer}
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
              // flex: 1,
              // display: "flex",
              // flexDirection: "column",
              padding: "24px 32px",
            }}>
            <Outlet />
          </div>
        </main>
      </div>
    </Page>
  );
};

export default MainLayout;
