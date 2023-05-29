import ModalDialog from "@mui/joy/ModalDialog";
import { Button, Modal, TextField } from "@mui/material";
import { Typography, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { changingSetting } from "../../services/userSettingsConfig";
import { useAuth } from "../../hooks/useAuth";

const SettingModal = ({ open, setOpen, setting }) => {
  const { name, value, editTitle, type } = setting;
  const [newValue, setNewValue] = useState(value);
  const { userInfo } = useAuth();
  const disp = useDispatch();

  const handleSettingChange = () => {
    changingSetting(name, newValue, { userInfo, disp });
    setOpen(false);
  };
  const handleModalClose = () => {
    setNewValue(value);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <ModalDialog sx={{ bgcolor: "#888888", width: "360px" }}>
        <Typography>{editTitle}</Typography>
        {type === "input" && (
          <TextField
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        )}
        {type === "select" && (
          <Select
            required
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            label="Gender">
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        )}
        <Button onClick={handleSettingChange} sx={{ mt: 2 }}>
          Confirm
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default SettingModal;
