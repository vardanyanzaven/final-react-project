import React, { useState } from "react";
import { Box, Button, Dialog, Grid, Select } from "@mui/material";
import { DialogActions, DialogContent, Divider } from "@mui/material";
import { DialogTitle, IconButton, InputAdornment } from "@mui/material";
import { MenuItem, TextField, Typography } from "@mui/material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Female, Male, Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { Transition } from "./dialogTransition";
import { emailSignUp } from "../../services/handleAuth";
import PhoneField from "./components/PhoneField";
import { testPassword } from "../../utils/validation";
import { changeMessage } from "../../store/slicers/statusSlice";
// import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/common";
import { getError } from "../../utils/errors";

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
  const [errorText, setErrorText] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass) {
      setValid(false);
      setErrorText(testPassword(pass));
    } else setValid(true);
    if (pass !== confPass || !isValid) {
      // dispatch(changeMessage(ERROR_MESSAGE));
      return;
    } else {
      setLoading(true);
      emailSignUp(email, pass, phone, fullName, gender)
        .then(() => {
          // dispatch(changeMessage(SUCCESS_MESSAGE));
          onClose();
        })
        .catch((e) => {
          const err = getError(e);
          dispatch(changeMessage(err));
        })
        .finally(() => {
          setLoading(false);
        });
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
                    required
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
                  {errorText}
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
