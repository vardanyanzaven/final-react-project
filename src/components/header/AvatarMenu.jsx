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
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AvatarMenu = () => {
  const [isOpen, setOpen] = useState(false);
<<<<<<< HEAD:src/components/header/AvatarMenu.jsx
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo } = useAuth();

  const handleMenuOpen = (e) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };
=======
  const { email } = useSelector((state) => state.auth);
  const { userInfo } = useAuth();
>>>>>>> fdb9862 (Co-authored-by: vardanyanzaven <vardanyanzaven@users.noreply.github.com>):src/components/header/AvatarMenu.js

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={isOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}>
            <Avatar src={userInfo?.photoURL} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={isOpen}
          onClick={() => setOpen(false)}
          onClose={() => setOpen(false)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <MenuItem onClick={() => setOpen(false)}>
            <Avatar src={userInfo?.photoURL} /> {userInfo.fullName}
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
