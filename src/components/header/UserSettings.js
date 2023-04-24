import { Box, Button } from "@mui/material";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, storage } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "../../store/slicers/userSlice";

export const UserSettings = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { id, userInfo } = useAuth();
  const { photoURL } = useSelector((state) => state.auth.userInfo);
  const disp = useDispatch();

  const handleFileChange = (e) => {
    if (!e.target.files[0]) {
      setDisabled(true);
      setPhotoFile(null);
      return;
    }
    setDisabled(false);
    setPhotoFile(e.target.files[0]);
  };

  const handleAddUrl = async () => {
    const storageRef = ref(storage, id + ".png");
    try {
      await uploadBytes(storageRef, photoFile);
      const url = await getDownloadURL(storageRef);
      setDisabled(true);
      updateProfile(auth.currentUser, { photoURL: url });
      disp(
        changeUserInfo({
          ...userInfo,
          photoURL: url,
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const storageRef = ref(storage, id + ".png");
      await deleteObject(storageRef);
      await updateProfile(auth.currentUser, { photoURL: null });
      disp(
        changeUserInfo({
          ...userInfo,
          photoURL: null,
        })
      );
    } catch (e) {
      console.log(`handleRemovePhoto ERROR ${e}`);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      <Button onClick={handleAddUrl} disabled={disabled}>
        add photo
      </Button>
      <Button onClick={handleRemovePhoto} disabled={!photoURL}>
        Remove Photo
      </Button>
    </Box>
  );
};
