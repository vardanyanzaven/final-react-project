import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { changeMessage } from "../../store/slicers/statusSlice";
import { Alert, Transition, styles } from "./statusStyle";

export default function ShowStatus() {
  const { message, type, isOpen } = useSelector((state) => state.status);
  const disp = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    disp(changeMessage({ isOpen: false }));
  };

  return (
    <>
      {isOpen && (
        <Stack spacing={2} {...styles.stack}>
          <Snackbar
            {...styles.snackBar}
            TransitionComponent={Transition}
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
              horizontal: "center",
              vertical: "bottom",
            }}>
            <Alert onClose={handleClose} severity={type}>
              {message}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  );
}
