import React, { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
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
  const storageRef = useMemo(() => ref(storage, id + "/" + email + ".png"));
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
      setPreviewPhoto(null);
    } catch (e) {
      console.log(`IM ERRORNERIC ERROR ${e}`);
    }
  };
  return (
    <Box>
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
      <Button
        variant="text"
        component="label"
        sx={{
          left: "120px",
          bottom: "30px",
          borderRadius: "50%",
          color: "#009900",
        }}>
        <AddAPhoto sx={{ fontSize: "35px" }}></AddAPhoto>
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      <Button
        color="success"
        onClick={handleAddUrl}
        disabled={disabled}
        variant={disabled ? "" : "contained"}>
        {!disabled && <Check></Check>}
      </Button>
    </Box>
  );
};

export default MainPhotoSettings;
