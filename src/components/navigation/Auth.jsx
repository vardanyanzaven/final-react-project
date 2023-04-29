import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SignUpDialog from "../dialog/SignUpDialog";
import SignInDialog from "../dialog/SignInDialog";

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
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button variant="login" onClick={handleOpenLogin}>
          <Typography sx={{ fontSize: { xs: 13, sm: 19, md: 22 } }} noWrap>
            Sign in
          </Typography>
        </Button>
        <SignInDialog
          handleOpenSignIn={handleOpenLogin}
          open={loginDialogOpen}
          onClose={onClose}
          onSignUpOpen={handleOpenSignUp}
        />
        <Button
          variant="signup"
          sx={{ display: { xs: "none", sm: "flex" } }}
          onClick={handleOpenSignUp}>
          <Typography sx={{ fontSize: { xs: 13, sm: 19, md: 22 } }} noWrap>
            Sign up
          </Typography>
        </Button>
      </Box>
      <SignUpDialog
        handleOpenSignUp={handleOpenSignUp}
        open={signUpDialogOpen}
        onClose={onClose}
        onSignInOpen={handleOpenLogin}
      />
    </Box>
  );
};

export default Auth;
