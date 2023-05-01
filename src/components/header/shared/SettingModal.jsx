import { ModalDialog } from "@mui/joy";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Male, Female, MoreHoriz } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { changingSetting } from "../../../services/userSettingsConfig";

const SettingModal = ({ open, setOpen, setting }) => {
  const { edit, name, value, editTitle } = setting;
  const [newValue, setNewValue] = useState(value);

  const handleSettingChange = () => {
    changingSetting(name, newValue);
    setOpen(false);
  };

  const handleModalClose = () => {
    setNewValue(value);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <ModalDialog>
        <Typography>{editTitle}</Typography>
        {edit == "text" && (
          <TextField
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        )}
        {edit == "select" && (
          <Select
            required
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            label="Gender">
            <MenuItem value="Male">
              <Male />
            </MenuItem>
            <MenuItem value="Female">
              <Female />
            </MenuItem>
            <MenuItem value="other">
              <MoreHoriz />
            </MenuItem>
          </Select>
        )}
        <Button onClick={handleSettingChange}>Confirm</Button>
      </ModalDialog>
    </Modal>
  );
};

export default SettingModal;
