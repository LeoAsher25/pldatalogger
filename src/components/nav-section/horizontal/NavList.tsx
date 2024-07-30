import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getActive } from "..";
import { NavItemRoot, NavItemSub } from "./NavItem";
import { PaperStyle } from "./style";

// ----------------------------------------------------------------------

export function NavListRoot({ list }: { list: SystemUI.NavItem }) {
  const menuRef = useRef<HTMLButtonElement | null>(null);

  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const hasChildren = !!list.children;

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          open={open}
          item={list}
          active={active}
          ref={menuRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />
        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}>
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return <NavItemRoot item={list} active={active} />;
}

function NavListSub({ list }: { list: SystemUI.NavItem }) {
  const menuRef = useRef<HTMLButtonElement | null>(null);

  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasChildren = !!list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub
          ref={menuRef}
          open={open}
          item={list}
          active={active}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />
        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}>
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}
