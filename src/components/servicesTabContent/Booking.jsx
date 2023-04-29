import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import ComponentFamilies from "../bookingDetails/DatePickUP";
import MultipleSelectPlaceholder from "../bookingDetails/SelectServiceType";

export const Booking = ({ service, onClose }) => {
  return (
    <Dialog
      open={!service}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description">
      <form
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}>
        <DialogTitle> Book Here </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}>
          <MultipleSelectPlaceholder />
          <Divider />

          <DialogActions> </DialogActions>
          <ComponentFamilies />
        </DialogContent>
      </form>
    </Dialog>
  );
};
