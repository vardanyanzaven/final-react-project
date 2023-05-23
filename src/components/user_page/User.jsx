import { Box, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { Edit } from "@mui/icons-material";

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
            {userInfo.type === "driver" && "(driver)"}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "100px",
          minHeight: "500px",
          display: "flex",
          justifyContent: "space-around",
        }}>
        <Box
          sx={{
            width: "23%",
            bgcolor: "grey",
            paddingInline: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}>
          <Button color="secondary" fullWidth variant="contained">
            <Edit />
            Edit
          </Button>
          <Button color="secondary" fullWidth variant="contained">
            <Edit />
            Edit
          </Button>
          <Button color="secondary" fullWidth variant="contained">
            <Edit />
            Edit
          </Button>
          <Button color="secondary" fullWidth variant="contained">
            <Edit />
            Edit
          </Button>
          <Button color="secondary" fullWidth variant="contained">
            <Edit />
            Edit
          </Button>
          <Button color="secondary" fullWidth variant="contained">
            <Edit />
            Edit
          </Button>
        </Box>
        <Box sx={{ width: "73%", bgcolor: "grey" }}></Box>
      </Box>
    </Box>
  );
};

export default User;
