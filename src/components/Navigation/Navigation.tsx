import { List, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import NavigationItem from "./NavigationItem";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    listStyle: "none",
  },
}));

const Navigation: React.FC<SystemUI.NavGroupProps> = ({ data, collapsed }) => {
  const classes = useStyles();

  if (!Array.isArray(data)) return null;

  const renderData = data.map((item, index) => (
    <NavigationItem key={index} item={item} collapsed={collapsed} />
  ));

  return (
    <List className={classes.list} component="nav">
      {renderData}
    </List>
  );
};

export default Navigation;
