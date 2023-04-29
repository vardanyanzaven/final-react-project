import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import React from "react";

export const Booking = () => {
  return (
    <Dialog
      open={true}
        keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <form
        style={{ width: "330px", display: "flex", flexDirection: "column" }}
      >
        <DialogTitle> Book Here </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Divider />
          <DialogActions></DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};
