import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Transition } from "./dialogTransition";
import { testPassword } from "../utils/validation";
import { emailSignUp } from "../services/handleAuth";
import PhoneField from "./components/PhoneField";
import { LoadingButton } from "@mui/lab";
import { setUserDB } from "../services/dataBaseConfig";

const SignUpDialog = ({ open, onClose, onSignInOpen }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [isValid, setValid] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => setShowPass(!showPass);

  useEffect(() => {
    let id = setTimeout(() => {
      if (!testPassword(pass) && pass) setValid(false);
      else setValid(true);
    }, 500);

    return () => {
      setValid(true);
      clearTimeout(id);
    };
  }, [pass]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass !== confPass || !isValid) return;
    else {
      setLoading(true);
      emailSignUp(email, pass)
        .then(({ user }) => {
          setUserDB(user);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description">
        <form onSubmit={handleSubmit} style={{ width: "330px" }}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}>
            <PhoneField phoneSett={[phone, setPhone]} />
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!isValid && (
              <Typography variant="caption" color="red">
                not valid
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
                      edge="end">
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
                      edge="end">
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Divider />
            <Typography>
              Already have an account?
              <Button onClick={onSignInOpen}>Sign In</Button>
            </Typography>
            <DialogActions>
              <LoadingButton
                loading={loading}
                variant="contained"
                type="submit">
                Sign Up
              </LoadingButton>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default SignUpDialog;
