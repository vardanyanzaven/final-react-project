import { Box, Typography } from "@mui/material";
import React from "react";
import SignInDialog from "../dialog/SignInDialog";
import SignUpDialog from "../dialog/SignUpDialog";

const Auth = ({
  handleOpenLogin,
  loginDialogOpen,
  onClose,
  handleOpenSignUp,
  signUpDialogOpen,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontSize: { xs: 15, sm: 21, md: 22 } }}
        noWrap>
        <SignInDialog
          handleOpenSignIn={handleOpenLogin}
          open={loginDialogOpen}
          onClose={onClose}
          onSignUpOpen={handleOpenSignUp}
        />
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontSize: { xs: 15, sm: 21, md: 22 } }}
        noWrap>
        <SignUpDialog
          handleOpenSignUp={handleOpenSignUp}
          open={signUpDialogOpen}
          onClose={onClose}
          onSignInOpen={handleOpenLogin}
        />
      </Typography>
    </Box>
  );
};

export default Auth;
