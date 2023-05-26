import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import CarsGrid from "../../shared/CarsGrid";

const getMyGars = async (setMyCars, id) => {
  try {
    const userRef = doc(db, "users", id);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data().myCars;
    const myCarData = await Promise.all(
      userData.map(async (car) => {
        const carSnapshot = await getDoc(car);
        return { id: car.id, ...carSnapshot.data() };
      })
    );
    setMyCars(myCarData);
  } catch (err) {
    console.log(err);
  }
};

const MyCars = () => {
  const [myCars, setMyCars] = useState([]);
  const { id } = useAuth();
  useEffect(() => {
    getMyGars(setMyCars, id);
  }, []);
  return (
    <Box>
      <CarsGrid carsList={myCars} exitFromProfile />
    </Box>
  );
};

export default MyCars;
