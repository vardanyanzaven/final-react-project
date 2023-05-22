import { Avatar, Box, Divider, IconButton } from "@mui/material";
import { Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Bookmark, Logout, Settings } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AvatarMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo } = useAuth();

  const handleMenuOpen = (e) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={isOpen && "account-menu"}
            aria-haspopup="true"
            aria-expanded={isOpen && "true"}>
            <Avatar src={userInfo?.photoURL} />
            {userInfo.type === "driver" && (
              <Typography sx={{ ml: 1 }} variant="subtitle2" color="white">
                Driver
              </Typography>
            )}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={isOpen}
          onClick={() => setOpen(false)}
          onClose={() => setOpen(false)}>
          <Link to="user">
            <MenuItem onClick={() => setOpen(false)}>
              <Avatar src={userInfo?.photoURL} sx={{ m: 1 }} />
              {userInfo.fullName}
            </MenuItem>
          </Link>
          <Link to="settings">
            <MenuItem>
              <Settings sx={{ color: "black" }} />
              <Typography color="black">Settings</Typography>
            </MenuItem>
          </Link>
          <MenuItem>
            <HistoryIcon />
            <Typography>History</Typography>
          </MenuItem>
          <MenuItem>
            <Bookmark />
            <Typography>Saved</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => signOut(auth)}>
            <Logout /> Log Out
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default AvatarMenu;
