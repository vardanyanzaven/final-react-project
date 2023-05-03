import { Box, Divider } from "@mui/material";
import MainPhotoSettings from "../settings/MainPhotoSettings";
import PersonalSettings from "../settings/PersonalSettings";

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
    </>
  );
};
