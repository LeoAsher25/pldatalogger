import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import clsx from "clsx";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import Navigation from "src/components/Navigation/Navigation";
import AvatarPopup from "src/components/header/AvatarPopup";

const drawerWidth = 210;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  appBarShift: {
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 2,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  appBar: {
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
  menuButton: {
    marginRight: theme.spacing(2),
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
    color: theme.palette.text.primary,
    marginRight: 36,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  extendButtonHidden: {
    display: "none",
  },
  toolbar: {
    padding: "8px 24px",
    height: 80,
    backgroundColor: "white",
    ...theme.mixins.toolbar,
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
    width: drawerWidth,
    display: "flex",
    position: "fixed",
    height: "100vh",
    whiteSpace: "nowrap",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    [theme.breakpoints.up("sm")]: {
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
    fontWeight: 200,
    color: theme.palette.text.primary,
  },
  contentShift: {
    flexGrow: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(7),
      zIndex: theme.zIndex.drawer + 1,
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
      zIndex: theme.zIndex.drawer + 1,
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
  copyrightText: {
    fontSize: 11,
    transition: "all .3s",
    [theme.breakpoints.up("sm")]: {
      opacity: (extend: boolean) => (extend ? 1 : 0),
    },
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
}));

interface MainLayoutProps {
  navigationData: Array<any>; // You may want to define a more specific type for your navigation data
}

const MainLayout: React.FC<MainLayoutProps> = ({ navigationData }) => {
  const theme = useTheme();
  const [extended, setExtended] = React.useState<boolean>(true);
  const classes = useStyles(extended);
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

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
      <Divider />
      <Navigation data={navigationData} collapsed={!extended} />
      <Divider />
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
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
            {/* Responsive Sidebar <strong>Starter Layout</strong> */}
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
        className={clsx(classes.contentShift, extended ? classes.content : {})}>
        <div className={classes.toolbar} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
