import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, Link, ListItemText } from "@mui/material";
//
import { isExternalLink } from "..";
import Iconify from "../../Iconify";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";

// ----------------------------------------------------------------------

export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}: any) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle> {icon} </ListItemIconStyle>}
      <ListItemTextStyle
        disableTypography
        primary={title}
        isCollapse={isCollapse}
      />
      {!isCollapse && (
        <>
          {info && info} {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
    // component={Link}
    //  href={path}
    // target="_blank"
    // rel="noopener"
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle
      // component={RouterLink}
      //  to={path}
      activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
}

export function NavItemSub({
  item,
  open = false,
  active = false,
  onOpen,
}: any) {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} /> {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      // component={Link}
      // href={path}
      // target="_blank"
      // rel="noopener"
      subItem>
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle
      // component={RouterLink}
      // to={path}
      activeSub={active}
      subItem>
      {renderContent}
    </ListItemStyle>
  );
}

export function DotIcon({ active }: any) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "text.disabled",
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: "scale(2)",
            bgcolor: "primary.main",
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

export function ArrowIcon({ open }: any) {
  return (
    <Iconify
      icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
      sx={{
        width: 16,
        height: 16,
        ml: 1,
      }}
    />
  );
}
