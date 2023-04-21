import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Transition } from "./mui-style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignInDialog = ({ handleOpenSignIn, open, onClose, onSignUpOpen }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then(onClose)
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      {/* <Button variant="login" onClick={handleOpenSignIn}>
        Sign In
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Sign In</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              type="email"
              label="Email"
              required
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <TextField
              type={showPass ? "text" : "password"}
              label="Password"
              value={pass}
              onChange={({ target }) => setPass(target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end">
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography>
              don't have an account?
              <Button
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSignUpOpen();
                }}>
                Sign up
              </Button>
            </Typography>
            <DialogActions>
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default SignInDialog;
