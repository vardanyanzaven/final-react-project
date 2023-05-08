import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { emailSignIn } from "../../services/handleAuth";
import { Transition } from "../../components/dialog/dialogTransition";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../store/slicers/statusSlice";
import { getError } from "../../utils/errors";
import { SUCCESS_MESSAGE } from "../../constants/common";

const SignInDialog = ({ open, onClose, onSignUpOpen }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const disp = useDispatch();
  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    emailSignIn(email, pass)
      .then(() => {
        disp(changeMessage(SUCCESS_MESSAGE));
        onClose();
      })
      .catch((e) => {
        const err = getError(e);
        disp(changeMessage(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Sign In</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}>
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
                      edge="end">
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
            <Typography>
              Don't have an account?
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onSignUpOpen();
                }}>
                Sign up
              </Button>
            </Typography>
            <DialogActions>
              <LoadingButton
                loading={loading}
                variant="contained"
                type="submit">
                Sign In
              </LoadingButton>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default SignInDialog;
