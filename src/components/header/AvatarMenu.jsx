import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Logout, Settings } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AvatarMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const { email } = useSelector((state) => state.auth);
  const { userInfo } = useAuth();

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={(e) => setOpen(e.currentTarget)}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={isOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}
          >
            <Avatar src={userInfo?.photoURL} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={isOpen}
          id="account-menu"
          open={!!isOpen}
          onClick={() => setOpen(false)}
          onClose={() => setOpen(false)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem onClick={() => setOpen(false)}>
            <Avatar src={userInfo?.photoURL} /> {email}
          </MenuItem>
          <Divider />
          <Link to="settings">
            <MenuItem>
              <Settings sx={{ color: "black" }} />
              <Typography color="black">Settings</Typography>
            </MenuItem>
          </Link>
          <MenuItem onClick={() => signOut(auth)}>
            <Logout /> Log Out
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default AvatarMenu;
