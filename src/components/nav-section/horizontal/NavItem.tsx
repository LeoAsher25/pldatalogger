import { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";

// Custom components and utils
import { ICON } from "src/configs/config";
import { isExternalLink } from "..";
import Iconify from "../../Iconify";

// Define styled component ListItemStyle
const ListItemStyle = styled(Button)<
  ButtonProps & {
    activeRoot?: boolean;
    activeSub?: boolean;
    open?: boolean;
    subItem?: boolean;
    target?: "_blank" | "_self" | "_parent" | "_top" | string;
    to?: string;
  }
>(({ theme, activeRoot, activeSub }) => ({}));

export const NavItemRoot = forwardRef<HTMLButtonElement, SystemUI.NavItemProps>(
  ({ item, active = false, open = false, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          <NavItemContent icon={icon} title={title} children={children} />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle component="a" href={path} target="_blank" rel="noopener">
        <NavItemContent icon={icon} title={title} />
      </ListItemStyle>
    ) : (
      <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
        <NavItemContent icon={icon} title={title} />
      </ListItemStyle>
    );
  }
);

export const NavItemSub = forwardRef<HTMLButtonElement, SystemUI.NavItemProps>(
  ({ item, active = false, open = false, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          <NavItemContent
            icon={icon}
            title={title}
            children={children}
            subItem
          />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle
        subItem
        href={path}
        disableRipple
        rel="noopener"
        target="_blank"
        component="a">
        <NavItemContent icon={icon} title={title} subItem />
      </ListItemStyle>
    ) : (
      <ListItemStyle
        disableRipple
        component={RouterLink}
        to={path}
        activeSub={active}
        subItem>
        <NavItemContent icon={icon} title={title} subItem />
      </ListItemStyle>
    );
  }
);

function NavItemContent({
  icon,
  title,
  children,
  subItem = false,
}: SystemUI.NavItemContentProps) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            "& svg": {
              width: "100%",
              height: "100%",
            },
          }}>
          {icon}
        </Box>
      )}
      {title}
      {children && (
        <Iconify
          icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
