import React, { useEffect, useState } from "react";
import {
  Female,
  Male,
  MoreHoriz,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Transition } from "./dialogTransition";
import PhoneField from "./components/PhoneField";
import { testPassword } from "../utils/validation";
import { emailSignUp } from "../services/handleAuth";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const SignUpDialog = ({ open, onClose, onSignInOpen }) => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [isValid, setValid] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

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
      emailSignUp(email, pass, phone, fullName, setLoading);
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
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "330px" }}>
          <DialogTitle>Sign Up</DialogTitle>
          <Grid container>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
              }}>
              <PhoneField phoneSett={[phone, setPhone]} />
              <Grid container>
                <Grid item>
                  <TextField
                    value={fullName}
                    onChange={({ target }) => setFullName(target.value)}
                    required
                    label="Fullname"
                    name="fullname"
                    autoComplete="Fullname"
                  />
                </Grid>
                <Grid item>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender">
                    <MenuItem value="Male">
                      <Male />
                    </MenuItem>
                    <MenuItem value="Female">
                      <Female />
                    </MenuItem>
                    <MenuItem value="other">
                      <MoreHoriz />
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              {!isValid && (
                <Typography
                  sx={{ wordBreak: "break-word" }}
                  variant="caption"
                  color="red">
                  The password must contain at least 1 capital letter, 1 number
                  and have 8-16 characters.
                </Typography>
              )}
              <Grid item>
                <TextField
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type={showPass ? "text" : "password"}
                  label="Password"
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPass(!showPass)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end">
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  type={showPass ? "text" : "password"}
                  label="Confirm password"
                  fullWidth
                  value={confPass}
                  onChange={({ target }) => setConfPass(target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPass(!showPass)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end">
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
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
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default SignUpDialog;
