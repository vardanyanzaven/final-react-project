import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const User = () => {
  const { userInfo } = useAuth();
  return (
    <Box sx={{ minHeight: "600px" }}>
      <Box
        sx={{
          height: "200px",
          bgcolor: "#101010",
          display: "flex",
          alignItems: "end",
        }}>
        <Box
          sx={{
            position: "absolute",
            top: "150px",
            left: "70px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}>
          <Avatar
            src={userInfo?.photoURL}
            sizes=""
            sx={{ width: 200, height: 200 }}
          />
          <Typography variant="h4" color="wheat">
            {userInfo.fullName}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ ml: "300px" }}></Box>
    </Box>
  );
};

export default User;
