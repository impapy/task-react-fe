import React from "react";
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Changed from next/router
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../store/auth/login";

const LogoutCom = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="flex-end"
      paddingRight={3}
      mb={3}
    >
      <Avatar alt="Remy Sharp" src="/logo.png" />
      <Typography fontWeight={500}>{"Admin"}</Typography>
      <ButtonLogout />
    </Stack>
  );
};

export default LogoutCom;

const ButtonLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };
  return (
    <Tooltip title="Logout">
      <IconButton onClick={() => handleLogout()}>
        <LogoutIcon color="error" />
      </IconButton>
    </Tooltip>
  );
};
