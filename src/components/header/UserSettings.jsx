import { Box, Divider } from "@mui/material";
import MainPhotoSettings from "./settings/MainPhotoSettings";
import PersonalSettings from "./settings/PersonalSettings";
import ThemeSettings from "./settings/ThemeSettings";

export const UserSettings = () => {
  return (
    <>
      <Box
        sx={{
          display: { lg: "flex", sm: "block" },
          justifyContent: "space-evenly",
          alignItems: "center",
          m: 3,
        }}>
        <MainPhotoSettings />
        <PersonalSettings />
      </Box>
      <Divider />
<<<<<<< HEAD
=======
      <ThemeSettings />
>>>>>>> 5fc7ead (push in my branch)
    </>
  );
};
