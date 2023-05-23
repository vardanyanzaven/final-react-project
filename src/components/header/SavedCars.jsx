import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import CarsGrid from "../../shared/CarsGrid";

const getSavedCars = async (setSavedCarsList, id) => {
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
  } catch (err) {
    console.log(err);
  }
};

const SavedCars = () => {
  const { id } = useAuth();
  const [savedCarsList, setSavedCarsList] = useState([]);

  useEffect(() => {
    getSavedCars(setSavedCarsList, id);
  }, []);

  return <CarsGrid carsList={savedCarsList} />;
};

export default SavedCars;
