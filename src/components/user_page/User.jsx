import { Box, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { Edit, AutoStories, Inventory, Forum } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useState } from "react";
import { WrittenComs } from "../main/about_page/WrittenComs";
import { useDispatch } from "react-redux";
import { getCommentsCollection } from "../../store/slicers/commentSlice";

const User = () => {
  const [comp, setComp] = useState("services");
  const { userInfo } = useAuth();
  const registered = auth.currentUser.metadata.creationTime;
  const disp = useDispatch();

  const currentComponent = (cmpName) => {
    switch (cmpName) {
      case "services":
        return "services";
        break;
      case "comments":
        disp(getCommentsCollection());
        return <WrittenComs dontShowAll />;
      default:
        break;
    }
  };

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
          <Link to="/settings">
            <Button
              sx={{ height: "60px", fontSize: "20px" }}
              color="secondary"
              fullWidth
              variant="contained">
              <Edit />
              Edit profile
            </Button>
          </Link>
          <Button
            sx={{ height: "60px", fontSize: "20px" }}
            color="secondary"
            fullWidth
            variant="contained">
            <AutoStories />
            &nbsp;all services order
          </Button>
          <Button
            sx={{ height: "60px", fontSize: "20px" }}
            color="secondary"
            fullWidth
            variant="contained">
            <Inventory />
            all bought cars
          </Button>
          <Button
            sx={{ height: "60px", fontSize: "20px" }}
            color="secondary"
            fullWidth
            variant="contained"
            onClick={() => setComp("comments")}>
            <Forum />
            my comments
          </Button>

          <Typography>I have been registered </Typography>
          <Typography>{registered} </Typography>
        </Box>
        <Box sx={{ width: "73%", bgcolor: "grey" }}>
          {currentComponent(comp)}
        </Box>
      </Box>
    </Box>
  );
};

export default User;
