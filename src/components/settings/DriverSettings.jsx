import { Box, Button, Grid, MenuItem } from "@mui/material";
import { IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LockOpen, Lock } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { carAddScheme } from "../../utils/validation";
import { ALL_MAKES } from "../../constants/common";
import axios from "axios";

const DriverSettings = () => {
  const [openSett, setOpenSett] = useState(false);
  const [viewPhoto, setViewPhoto] = useState(null);
  const [modelDisbl, setModelDisbl] = useState(true);
  const [models, setModels] = useState([]);
  const [car, setCar] = useState(null);
  const [years, setYears] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(carAddScheme),
  });

  const carPhotoPreview = (e) => {
    if (!e.target.files[0]) {
      setViewPhoto(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setViewPhoto(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const setCurrentModels = (e) => {
    const car = e.target.value;
    setCar(car);
    axios({
      method: "GET",
      url: "https://car-data.p.rapidapi.com/cars",
      params: {
        limit: "50",
        page: "0",
        make: car,
      },
      headers: {
        "X-RapidAPI-Key": "ecdec140f5msha0b188bdb255137p1812aejsndcbdd7c4df70",
        "X-RapidAPI-Host": "car-data.p.rapidapi.com",
      },
    })
      .then((res) => {
        const data = new Set(
          res.data.map((o) => {
            return o.model;
          })
        );
        setModels(Array.from(data));
        setModelDisbl(false);
      })
      .catch((e) => console.log(e));
  };

  const setYear = (e) => {
    const model = e.target.value;

    axios({
      method: "GET",
      url: "https://car-data.p.rapidapi.com/cars",
      params: {
        limit: "50",
        page: "0",
        make: car,
        model,
      },
      headers: {
        "X-RapidAPI-Key": "ecdec140f5msha0b188bdb255137p1812aejsndcbdd7c4df70",
        "X-RapidAPI-Host": "car-data.p.rapidapi.com",
      },
    }).then((resp) => {
      const data = new Set(resp.data.map((o) => o.year));
      setYears(Array.from(data));
    });
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center" }}
      gap={6}
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justifyContent="center" width="30%">
        <Grid
          item
          xs={12}
          justifyContent="center"
          display="flex"
          flexDirection="column"
          alignItems="center">
          <Typography variant="h3">ADD A NEW CAR</Typography>
          <IconButton color="success" onClick={() => setOpenSett(!openSett)}>
            {openSett ? (
              <LockOpen fontSize="large" />
            ) : (
              <Lock fontSize="large" />
            )}
          </IconButton>
        </Grid>
        {openSett && (
          <>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Car"
                error={errors.car?.message}
                onChange={setCurrentModels}
                helperText={errors.car?.message}
                defaultValue=""
                inputProps={{ ...register("car") }}>
                {ALL_MAKES.map((car) => (
                  <MenuItem value={car}>{car}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Model"
                defaultValue=""
                disabled={modelDisbl}
                error={errors.model?.message}
                helperText={errors.model?.message}
                onChange={setYear}
                inputProps={{ ...register("model") }}>
                {models.map((model) => (
                  <MenuItem value={model}>{model}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                error={errors.year?.message}
                helperText={errors.year?.message}
                InputProps={{ ...register("year") }}>
                {years
                  .map((y) => <MenuItem value={y}>{y}</MenuItem>)
                  .sort((a, b) => a - b)}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                type="date"
                fullWidth
                defaultValue=""
                label="Type"
                error={errors.date?.message}
                helperText={errors.type?.message}
                inputProps={{ ...register("type") }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                sx={{ height: "56px", outline: errors.image?.message }}
                variant="outlined"
                color="inherit"
                component="label">
                {"File here"}
                <input type="file" hidden onChange={carPhotoPreview} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" fullWidth label="Price" />
            </Grid>
            <Grid item xs={12} sm={2}>
              <LoadingButton variant="contained" type="submit">
                Add
              </LoadingButton>
            </Grid>
          </>
        )}
      </Grid>
      {!!viewPhoto && (
        <Box component="img" src={viewPhoto} sx={{ width: "30%" }} />
      )}
    </Box>
  );
};

export default DriverSettings;
