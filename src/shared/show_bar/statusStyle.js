import { Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

export const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Transition = (props) => {
  return <Slide {...props} direction="up" />;
};

export const styles = {
  stack: {
    sx: {
      width: "100%",
    },
  },
  snackBar: {
    sx: {
      width: "100%",
    },
  },
};
