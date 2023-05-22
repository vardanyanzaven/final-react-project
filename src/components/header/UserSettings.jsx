import { Box, Divider } from "@mui/material";
import MainPhotoSettings from "../settings/MainPhotoSettings";
import PersonalSettings from "../settings/PersonalSettings";
import DriverRegister from "../settings/DriverRegister";
import { useAuth } from "../../hooks/useAuth";
import DriverSettings from "../settings/DriverSettings";

export const UserSettings = () => {
  const { userInfo } = useAuth();
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
      {userInfo.type === "driver" ? <DriverSettings /> : <DriverRegister />}
    </>
  );
};
