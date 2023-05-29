import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import CarsGrid from "../../shared/CarsGrid";
import { Box } from "@mui/material";
import { LinearProgress, Typography } from "@mui/material";

const getSavedCars = async (setSavedCarsList, id, setIsLoading) => {
  try {
    const userRef = doc(db, "users", id);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data().savedCars;
    const savedCarData = await Promise.all(
      userData.map(async (car) => {
        const carSnapshot = await getDoc(car);
        return { id: car.id, ...carSnapshot.data() };
      })
    );
    setSavedCarsList(savedCarData);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
  }
};

const SavedCars = () => {
  const { id } = useAuth();
  const [savedCarsList, setSavedCarsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSavedCars(setSavedCarsList, id, setIsLoading);
  }, []);

  if(isLoading) return <LinearProgress />

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", textAlign: "center", mt: "120px" }}>
      {savedCarsList.length !== 0 ? (
        <CarsGrid carsList={savedCarsList} />
      ) : (
        <Typography variant="h2" color="#F2B90D">There aren't any saved cars yet.</Typography>
      )}
    </Box>
  );
};

export default SavedCars;
