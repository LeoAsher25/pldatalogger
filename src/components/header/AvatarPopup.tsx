import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import { authActions } from "src/stores/auth/authSlice";
import { RootState } from "src/stores/rootReducer";
import ERoutePath from "src/types/routes.enum";

const AvatarPopup = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const { currentUser } = useAppSelector((state: RootState) => state.authState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(authActions.logoutMethod());
    navigate(ERoutePath.LOGIN);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <div>
        <Avatar
          src={currentUser?.avatar}
          color={"default"}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Box
          sx={{
            my: 1.5,
            px: 2.5,
          }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser?.fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
            noWrap>
            {currentUser?.email}
          </Typography>
        </Box>
        <Divider
          sx={{
            borderStyle: "dashed",
          }}
        />

        <MenuItem
          onClick={handleLogout}
          sx={{
            m: 1,
          }}>
          Logout
        </MenuItem>
      </Popover>
    </Fragment>
  );
};

export default AvatarPopup;
