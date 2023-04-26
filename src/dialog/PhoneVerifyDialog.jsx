import {
  Alert,
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Transition } from "./DialogTransition";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

const PhoneVerifyDialog = ({ onClose, opening }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [openVerify, setOpenVerify] = opening;
  const [openAlert, setOpenAlert] = useState(false);

  const onVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            submitPhoneNumber();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const submitPhoneNumber = () => {
    setLoading(true);
    onVerify();

    const appVerifier = window.recaptchaVerifier;
    const currentPhoneNumber = `+${phone}`;

    signInWithPhoneNumber(auth, currentPhoneNumber, appVerifier)
      .then((confirmResult) => {
        window.confirmationResult = confirmResult;
        setLoading(false);
        setShowOtp(true);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <>
      <>
        <Collapse in={openAlert}>
          <Alert variant="filled" color="success">
            Success!
          </Alert>
        </Collapse>
        <Dialog
          open={openVerify}
          TransitionComponent={Transition}
          keepMounted
          onClose={onClose}
          aria-describedby="alert-dialog-slide-description">
          <Box sx={{ display: "flex", gap: 1 }}>
            <>
              {false ? (
                <DialogContent>
                  <label htmlFor="otp"> Enter your OTP</label>
                  <TextField
                    value={otp}
                    onChange={({ target }) => setOtp(target.value)}
                  />
                  <LoadingButton onClick={onOTPVerify} loading={loading}>
                    <span>Verify OTP</span>
                  </LoadingButton>
                </DialogContent>
              ) : (
                <>
                  <div id="recaptcha-container"></div>
                  <DialogContent></DialogContent>
                  <DialogActions></DialogActions>
                </>
              )}
            </>
          </Box>
        </Dialog>
      </>
    </>
  );
};

export default PhoneVerifyDialog;
