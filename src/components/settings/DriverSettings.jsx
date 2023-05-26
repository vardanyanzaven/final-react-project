import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { IconButton, TextField, Typography } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { Box, Button, Grid, MenuItem } from "@mui/material";
import { addDoc, arrayUnion } from "firebase/firestore";
import { LockOpen, Lock } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { v4 } from "uuid";
import { carAddScheme } from "../../utils/validation";
import { ALL_MAKES } from "../../constants/common";
import { db, storage } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import carSkeleto from "../../assets/skeletons/no-photo.png";

const DriverSettings = () => {
  const [openSett, setOpenSett] = useState(false);
  const [viewPhoto, setViewPhoto] = useState(null);
  const [modelDisbl, setModelDisbl] = useState(true);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [types, setTypes] = useState([]);
  const [car, setCar] = useState(null);
  const [yDis, setYDis] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const storageRefForSelfie = useMemo(() =>
    ref(storage, `${auth.id}/cars/${v4()}.png`)
  );
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
    setPhoto(e.target.files[0]);
  };

  const onSubmit = async ({ car, model, year, type }) => {
    try {
      const docc = doc(db, "users", auth.id);
      carSkeleto && (await uploadBytes(storageRefForSelfie, photo));
      const URL = carSkeleto && (await getDownloadURL(storageRefForSelfie));
      const ref = await addDoc(collection(db, "catalogueCars"), {
        carBrand: car,
        carModel: model,
        carProdYear: year,
        carType: type,
        photoURL: URL,
        price: !price ? "contractual" : price,
      });

      await updateDoc(docc, {
        myCars: arrayUnion(ref),
      });
    } catch (error) {
      console.log("errrroorrrr", error);
    }
  };

  const setCurrentModels = (e) => {
    setLoading(true);
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
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
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
      const data1 = new Set(resp.data.map((o) => o.year));
      const data2 = new Set(resp.data.map((o) => o.type));
      setYears(Array.from(data1).sort((a, b) => a - b));
      setTypes(Array.from(data2));

      setYDis(false);
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
                error={!!errors.car}
                onChange={setCurrentModels}
                helperText={errors.car?.message}
                defaultValue=""
                inputProps={{ ...register("car") }}>
                {ALL_MAKES.map((car) => (
                  <MenuItem key={v4()} value={car}>
                    {car}
                  </MenuItem>
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
                  <MenuItem key={v4()} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                disabled={yDis}
                defaultValue=""
                error={errors.year?.message}
                helperText={errors.year?.message}
                InputProps={{ ...register("year") }}>
                {years.map((y) => (
                  <MenuItem key={v4()} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                type="date"
                fullWidth
                defaultValue=""
                label="Type"
                disabled={yDis}
                error={errors.type}
                helperText={errors.type?.message}
                inputProps={{ ...register("type") }}>
                {types.map((type) => (
                  <MenuItem key={v4()} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
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
              <TextField
                type="number"
                fullWidth
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <LoadingButton
                loading={loading}
                variant="contained"
                type="submit">
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
