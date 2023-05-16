import { Box, Grid, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { passportSchema } from "../../../utils/validation";

const PassportStep = ({ setDisable }) => {
  const [sended, setSended] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passportSchema),
  });

  const onSubmit = ({ passport, fullName }) => {
    setSended(true);
    setDisable(false);
    console.log(passport, fullName);
  };

  return (
    <Box
      sx={{ paddingInline: "15rem" }}
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Here you need to enter your passport details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Firstname"
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register("firstName")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Lastname"
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Home address"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Birth date"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="date"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Passport №"
            fullWidth
            variant="outlined"
            {...register("passport")}
            error={!!errors.passport}
            helperText={errors.passport?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Passport date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="date"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton type="submit" variant="contained">
            {sended ? "Reset" : "Send"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PassportStep;
