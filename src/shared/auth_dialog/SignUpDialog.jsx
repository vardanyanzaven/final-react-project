import React, { useState } from "react";
import {
  Container,
  Button,
  Dialog,
  Grid,
  Box,
  DialogTitle,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { MenuItem, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { Transition } from "../../components/dialog/dialogTransition";
import { emailSignUp } from "../../services/handleAuth";
import { changeMessage } from "../../store/slicers/statusSlice";
import { SUCCESS_MESSAGE } from "../../constants/common";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { schema } from "../../utils/validation";
import { getError } from "../../utils/errors";
import PhoneInput from "react-phone-input-2";
import { styles } from "./styles";
import "react-phone-input-2/lib/style.css";

const SignUpDialog = ({ open, onClose, onSignInOpen }) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password, phone, fullName, gender } = data;

    setLoading(true);

    emailSignUp(email, password, phone, fullName, gender)
      .then(() => {
        dispatch(changeMessage(SUCCESS_MESSAGE));
        onClose();
      })
      .catch((e) => {
        const err = getError(e);
        dispatch(changeMessage(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        keepMounted
        sx={styles.dialog}
        TransitionComponent={Transition}>
        <Container sx={styles.container}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={styles.formBox}>
            <DialogTitle>Sign Up</DialogTitle>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2.2}>
                <Grid item xs={12} sx={{ position: "relative" }}>
                  <Controller
                    control={control}
                    name="mobile"
                    rules={{ required: true }}
                    render={({ field: { ...field } }) => (
                      <PhoneInput
                        {...field}
                        inputExtraProps={{
                          required: true,
                          autoComplete: true,
                        }}
                        inputStyle={{
                          ...styles.phone,
                          outline: errors.mobile && "1px solid #d32f2f",
                        }}
                        country="am"
                      />
                    )}
                  />
                  <p style={styles.error}>{errors.mobile?.message}</p>
                </Grid>
                <Grid item xs={12} sm={9} sx={{ position: "relative" }}>
                  <TextField
                    fullWidth
                    required
                    label="Fullname"
                    error={!!errors.fullName}
                    {...register("fullName")}
                  />
                  <p style={styles.error}>{errors.fullName?.message}</p>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ position: "relative" }}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    inputProps={{
                      ...register("gender"),
                      IconComponent: () => null,
                    }}
                    error={!!errors.gender}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                  <p style={styles.error}>{errors.gender?.message}</p>
                </Grid>
                <Grid item xs={12} sx={{ position: "relative" }}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    error={!!errors.email}
                    {...register("email")}
                    required
                  />
                  <p style={styles.error}>{errors.email?.message}</p>
                </Grid>
                <Grid item xs={12} sx={{ position: "relative" }}>
                  <TextField
                    {...register("password")}
                    type={showPass ? "text" : "password"}
                    label="Password"
                    error={!!errors.password}
                    fullWidth
                    required
                  />
                  <p style={styles.error}>{errors.password?.message}</p>
                </Grid>
                <Grid item xs={12} sx={{ position: "relative" }}>
                  <TextField
                    {...register("confPass")}
                    label={"Confirm password"}
                    error={!!errors.confPass}
                    type={showPass ? "text" : "password"}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPass(!showPass)}
                            edge="end">
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <p style={styles.error}>{errors.confPass?.message}</p>
                </Grid>
              </Grid>
            </Box>
            <Typography>
              Already have an account?
              <Button onClick={onSignInOpen}>Sign In</Button>
            </Typography>
            <LoadingButton {...loading} type="submit" variant="contained">
              Sign Up
            </LoadingButton>
          </Box>
        </Container>
      </Dialog>
    </>
  );
};

export default SignUpDialog;
