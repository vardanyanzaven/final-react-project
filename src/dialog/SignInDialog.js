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
  const [isValid, setIsValid] = useState(true);

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, pass);
      await onClose();
    } catch (err) {
      setIsValid(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="xs"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Sign In</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {!isValid && (
              <Typography color="red" variant="caption">
                Incorrect email or password.
              </Typography>
            )}
            <TextField
              type="email"
              label="Email"
              sx={{ mt: 1 }}
              variant="standard"
              required
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <TextField
              variant="standard"
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
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography>
              Don't have an account?
              <Button
                // href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSignUpOpen();
                }}
              >
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
