import { Box, Grid, IconButton, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { passportSchema } from "../../../utils/validation";

const PassportStep = ({ setIsNext, setCompleted }) => {
  const [sended, setSended] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passportSchema),
  });

  const onSubmit = (data, e) => {
    if (sended) {
      e.target.reset();
      reset();
      setSended(false);
      setIsNext(true);
      return;
    }
    setSended(true);
    setIsNext(false);
    setCompleted({ ...data });
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
            label="First name"
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register("firstName")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Last name"
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
            type="text"
            error={!!errors.homeAddress}
            helperText={errors.homeAddress?.message}
            {...register("homeAddress")}
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
            error={!!errors.birthday}
            helperText={errors.birthday?.message}
            {...register("birthday")}
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
            error={!!errors.passportDate}
            helperText={errors.passportDate?.message}
            {...register("passportDate")}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#192026", "&:hover": { bgcolor: "#252f39" } }}>
            {sended ? "Reset" : "Send"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PassportStep;
