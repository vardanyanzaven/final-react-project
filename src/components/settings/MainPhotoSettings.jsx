import React, { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { deleteObject, getDownloadURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { changeUserInfo } from "../../store/slicers/userSlice";
import { AddAPhoto, Check, DeleteForever } from "@mui/icons-material";

const MainPhotoSettings = () => {
  const { photoURL } = useSelector((state) => state.auth.userInfo);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [el, setEl] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { id, userInfo, email } = useAuth();
  const storageRef = useMemo(() => ref(storage, id + "/" + email + ".png"), []);
  const disp = useDispatch();

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
      setDisabled(true);
      await uploadBytes(storageRef, photoFile);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        photoURL: url,
      });
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
      setPreviewPhoto(null);
    } catch (e) {
      console.log(`IM ERRORNERIC ERROR ${e}`);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <IconButton
        disableRipple
        onClick={(e) => {
          setOpen(true);
          setEl(e.currentTarget);
        }}>
        <Avatar
          src={previewPhoto || photoURL}
          sx={{ width: 200, height: 200 }}
        />
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={el}>
        <MenuItem
          onClick={handleRemovePhoto}
          disabled={!photoURL}
          disableRipple>
          <DeleteForever color="error"></DeleteForever>
        </MenuItem>
      </Menu>
      <IconButton
        component="label"
        sx={{ width: "fit-content", color: "#FFC30F" }}>
        <AddAPhoto sx={{ fontSize: "50px" }} />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </IconButton>
      <Button
        color="success"
        onClick={handleAddUrl}
        disabled={disabled}
        variant={disabled ? "" : "contained"}>
        {!disabled && <Check />}
      </Button>
    </Box>
  );
};

export default MainPhotoSettings;
