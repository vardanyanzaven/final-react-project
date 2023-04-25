import React, { useMemo, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../../../firebase";
import { Avatar, Box, Button, ImageListItem } from "@mui/material";
import { changeUserInfo } from "../../../store/slicers/userSlice";

const MainPhotoSettings = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { id, userInfo } = useAuth();
  const { photoURL } = useSelector((state) => state.auth.userInfo);
  const disp = useDispatch();
  const storageRef = useMemo(() => ref(storage, id + ".png"));

  const handleFileChange = (e) => {
    if (!e.target.files[0]) {
      setDisabled(true);
      setPhotoFile(null);
      return;
    }
    setDisabled(false);
    setPhotoFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewPhoto(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddUrl = async () => {
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
      await deleteObject(storageRef);
      await updateProfile(auth.currentUser, { photoURL: "" });
      disp(
        changeUserInfo({
          ...userInfo,
          photoURL: null,
        })
      );
    } catch (e) {
      console.log(photoURL);
      console.log(`handleRemovePhoto ERROR ${e}`);
    }
  };
  return (
    <Box>
      <Avatar src={previewPhoto || photoURL} sx={{ width: 200, height: 200 }} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleAddUrl} disabled={disabled}>
        add photo
      </Button>
      <Button onClick={handleRemovePhoto} disabled={!photoURL}>
        Remove Photo
      </Button>
    </Box>
  );
};

export default MainPhotoSettings;
