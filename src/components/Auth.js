import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SignInDialog from "../dialog/SignInDialog";
import SignUpDialog from "../dialog/SignUpDialog";

const Auth = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);

  const handleOpenLogin = () => {
    setLoginDialogOpen(true);
    setSignUpDialogOpen(false);
  };

  const handleOpenSignUp = () => {
    setSignUpDialogOpen(true);
    setLoginDialogOpen(false);
  };

  const onClose = () => {
    setSignUpDialogOpen(false);
    setLoginDialogOpen(false);
  };
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
