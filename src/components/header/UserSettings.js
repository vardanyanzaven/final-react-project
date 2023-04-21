import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { setPhoto } from "../../store/slicers/userSlice";

export const UserSettings = () => {
  const [file, setFile] = useState();
  const disp = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddUrl = useCallback(() => {
    updateProfile(auth.currentUser, {
      photoURL: file,
    })
      .then(() => {
        disp(setPhoto(auth.currentUser.photoURL));
      })
      .catch((e) => console.log(e.message));
  }, [file]);
  return (
    <Box>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      <Button onClick={handleAddUrl}>add photo</Button>
    </Box>
  );
};
