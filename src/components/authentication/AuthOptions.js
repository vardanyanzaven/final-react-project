import {
  Box,
  Button,
  Typography,
} from "@mui/material";
// import { NavLink } from "react-router-dom";

const AuthOptions = () => {
  return (
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button variant="login">
          <Typography sx={{ fontSize: { xs: 16, sm: 19, md: 22 } }} noWrap>
            Sign in
          </Typography>
        </Button>
        <Button variant="signup" sx={{ display: { xs: "none", sm: "flex" } }}>
          <Typography sx={{ fontSize: { xs: 16, sm: 19, md: 22 } }} noWrap>
            Sign up
          </Typography>
        </Button>
      </Box>
  );
};

export default AuthOptions;
