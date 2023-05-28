import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, Typography, Container } from "@mui/material";
import { TextField, Dialog, DialogTitle, Box, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { emailSignIn } from "../../services/handleAuth";
import { Transition } from "../../components/dialog/dialogTransition";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../store/slicers/statusSlice";
import { getError } from "../../utils/errors";
import { SUCCESS_MESSAGE } from "../../constants/common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import { styles } from "./styles";

const SignInDialog = ({ open, onClose, onSignUpOpen }) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const disp = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const onSubmit = ({ email, password }) => {
    setLoading(true);
    emailSignIn(email, password)
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
        aria-describedby="alert-dialog-slide-description"
        sx={styles.dialog}>
        <Container sx={styles.container}>
          <Box
            noValidate
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={styles.formBox}>
            <DialogTitle>Sign In</DialogTitle>
            <Grid
              container
              spacing={2.2}
              alignItems="center"
              justifyContent="center">
              <Grid item sx={{ position: "relative" }} xs={12}>
                <TextField
                  {...register("email")}
                  type="email"
                  label="Email"
                  required
                  error={!!errors.email}
                  fullWidth
                />
                <p style={styles.error}>{errors.email?.message}</p>
              </Grid>
              <Grid item sx={{ position: "relative" }} xs={12}>
                <TextField
                  fullWidth
                  {...register("password")}
                  type={showPass ? "text" : "password"}
                  label="Password"
                  required
                  error={!!errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end">
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <p style={styles.error}>{errors.password?.message}</p>
              </Grid>
              <Grid item>
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
              </Grid>
              <Grid item>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit">
                  Sign In
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Dialog>
    </>
  );
};

export default SignInDialog;
