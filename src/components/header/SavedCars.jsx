import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import CarsGrid from "../../shared/CarsGrid";
import { ThemeProvider } from "styled-components";
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Grid } from "swiper";

const getSavedCars = async (setSavedCarsList, id) => {
    try {
        const userRef = doc(db, "users", id);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data().savedCars;
        const savedCarData = await Promise.all(userData.map(async (car) => {
            const carSnapshot = await getDoc(car);
            return { id: car.id ,...carSnapshot.data() };
        }));
        setSavedCarsList(savedCarData);
    } catch(err) {
        console.log(err);
    }
}

const SavedCars = () => {
    const {id} = useAuth();
    const [savedCarsList, setSavedCarsList] = useState([]);
    console.log(savedCarsList);

    useEffect(() => {
        getSavedCars(setSavedCarsList, id);
    }, [])

  return (
    <Box sx={{minHeight: "100vh"}}>

        <CarsGrid carsList={savedCarsList}/>
    </Box>
  )
}

export default SavedCars;