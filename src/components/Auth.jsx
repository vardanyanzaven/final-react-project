import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SignInDialog from "../dialog/SignInDialog";
import SignUpDialog from "../dialog/SignUpDialog";

const Auth = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);

  const handleOpenLogin = () => {
    setLoginDialogOpen(true);
    setSignUpDialogOpen(false);
  };

  const handleOpenSignUp = () => {
    setSignUpDialogOpen(true);
    setLoginDialogOpen(false);
  };

  const handleOpenPhoneVerify = () => {
    setVerifyDialogOpen(true);
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
        <Button
          variant="signup"
          sx={{ display: { xs: "none", sm: "flex" } }}
          onClick={handleOpenSignUp}>
          <Typography sx={{ fontSize: { xs: 13, sm: 19, md: 22 } }} noWrap>
            Sign up
          </Typography>
        </Button>
      </Box>
      <SignInDialog
        handleOpenSignIn={handleOpenLogin}
        open={loginDialogOpen}
        onClose={onClose}
        onSignUpOpen={handleOpenSignUp}
      />
      <SignUpDialog
        handleOpenSignUp={handleOpenSignUp}
        open={signUpDialogOpen}
        onClose={onClose}
        onSignInOpen={handleOpenLogin}
        onPhoneVerifyOpen={handleOpenPhoneVerify}
      />
    </Box>
  );
};

export default Auth;
