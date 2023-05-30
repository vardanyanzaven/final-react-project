import { Box, Divider } from "@mui/material";
import MainPhotoSettings from "../settings/MainPhotoSettings";
import PersonalSettings from "../settings/PersonalSettings";
import DriverRegister from "../settings/DriverRegister";
import { useAuth } from "../../hooks/useAuth";
import DriverSettings from "../settings/DriverSettings";
import { userSettings } from "./styles";

export const UserSettings = () => {
  const { userInfo } = useAuth();
  return (
    <>
      <Box sx={userSettings.mainBox}>
        <MainPhotoSettings />
        <PersonalSettings />
      </Box>
      <Divider />
      {userInfo.type !== "driver" ? <DriverSettings /> : <DriverRegister />}
    </>
  );
};
