import { Box, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import {
  Edit,
  AutoStories,
  Inventory,
  Forum,
  DirectionsCar,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useState } from "react";
import { WrittenComs } from "../main/about_page/WrittenComs";
import { useDispatch } from "react-redux";
import { getCommentsCollection } from "../../store/slicers/commentSlice";
import { userStyles } from "./styles";

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
        break;
      case "purchased":
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ minHeight: "600px" }}>
      <Box sx={userStyles.mainBox}>
        <Box sx={userStyles.personal}>
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
      <Box sx={userStyles.content}>
        <Box sx={userStyles.contentLeft}>
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
          {userInfo.type === "driver" && (
            <Button
              sx={{ height: "60px", fontSize: "20px" }}
              color="secondary"
              fullWidth
              variant="contained"
              onClick={() => setComp("comments")}>
              <DirectionsCar />
              my cars
            </Button>
          )}
          <Typography>I have been registered </Typography>
          <Typography>{registered} </Typography>
        </Box>
        <Box sx={userStyles.contentRight}>{currentComponent(comp)}</Box>
      </Box>
    </Box>
  );
};

export default User;
