import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import React, { useEffect } from "react";
import { useState } from "react";
import { Transition } from "./mui-style";
import { reg } from "../constants/common";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpDialog = ({ open, onClose, handleOpenSignUp, onSignInOpen }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isValid, setValid] = useState(true);

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    let id = setTimeout(() => {
      if (!reg.test(pass) && pass) {
        setValid(false);
      } else {
        setValid(true);
      }
    }, 500);
    return () => {
      setValid(true);
      clearTimeout(id);
    };
  }, [pass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass !== confPass || !isValid) return;
    createUserWithEmailAndPassword(auth, email, pass)
      .then(onClose)
      .catch(({ message }) => console.log(message));
  };

  return (
    <>
      {/* <Button variant="signup" onClick={handleOpenSignUp}>
        Sign up
      </Button> */}
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
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!isValid && (
              <Typography
                sx={{ wordBreak: "break-word" }}
                variant="caption"
                color="red"
              >
                The password must contain at least 1 capital letter, 1 number
                and have 8-16 characters.
              </Typography>
            )}
            <TextField
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type={showPass ? "text" : "password"}
              label="Password"
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
            <TextField
              type={showPass ? "text" : "password"}
              label="Confirm password"
              value={confPass}
              onChange={({ target }) => setConfPass(target.value)}
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
              Already have an account?
              <Button onClick={onSignInOpen}>Sign In</Button>
            </Typography>
            <DialogActions>
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default SignUpDialog;
