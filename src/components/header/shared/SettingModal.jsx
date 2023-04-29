import { ModalDialog } from "@mui/joy";
import { Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { changingSetting } from "../../../services/userSettingsConfig";

const SettingModal = ({ open, setOpen, setting }) => {
  const { name, value, editTitle } = setting;
  const [newValue, setNewValue] = useState(value);

  const handleSetingChange = () => {
    changingSetting(name, newValue);
    setOpen(false);
  };

  const handleModalClose = () => {
    setOpen(false);
    setNewValue(value);
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <ModalDialog>
        <Typography>{editTitle}</Typography>
        <TextField
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Button onClick={handleSetingChange}>Confirm</Button>
      </ModalDialog>
    </Modal>
  );
};

export default SettingModal;
