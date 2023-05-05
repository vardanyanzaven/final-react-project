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
import {
  Female,
  Male,
  MoreHoriz,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Transition } from "./dialogTransition";
import { emailSignUp } from "../../services/handleAuth";
import PhoneField from "./components/PhoneField";
import { testPassword } from "../../utils/validation";
import ShowStatus from "../../shared/snack_bar/ShowStatus";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../store/slicers/statusSlice";

const SignUpDialog = ({ open, onClose, onSignInOpen }) => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [isValid, setValid] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!testPassword(pass) && pass) setValid(false);
    else setValid(true);
    if (pass !== confPass || !isValid) {
      dispatch(
        changeMessage({
          message: "invalid password or email",
          type: "error",
          isOpen: true,
        })
      );
      return;
    } else {
      setLoading(true);
      emailSignUp(email, pass, phone, fullName, gender, setLoading);
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
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "330px" }}>
          <DialogTitle>Sign Up</DialogTitle>
          <Grid container>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                  >
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
                  color="red"
                >
                  The password must contain at least 1 capital letter, 1 number
                  and have 8-16 characters.
                </Typography>
              )}
              <Grid item>
                <TextField
                  error={!isValid}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type={showPass ? "text" : "password"}
                  label={isValid ? "Password" : "Error"}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPass(!showPass)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
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
                          edge="end"
                        >
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid container>
                <Grid item>
                  <IconButton>
                    <FacebookIcon sx={{ fontSize: "50px", color: "#4267B2" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <GoogleIcon sx={{ fontSize: "47px" }} />
                  </IconButton>
                </Grid>
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
                  type="submit"
                >
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
