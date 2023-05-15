import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SignUpDialog from "../../shared/auth_dialog/SignUpDialog";
import SignInDialog from "../../shared/auth_dialog/SignInDialog";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../store/slicers/dialogSlice";

const AuthDraw = () => {
  const dialog = useSelector((state) => state.dialog);
  const disp = useDispatch();

  const handleOpenLogin = () => {
    disp(
      openDialog({
        isSignUpOpen: false,
        isSignInOpen: true,
      })
    );
  };

  const handleOpenSignUp = () => {
    disp(
      openDialog({
        isSignInOpen: false,
        isSignUpOpen: true,
      })
    );
  };
  const onClose = () => {
    disp(
      openDialog({
        isSignUpOpen: false,
        isSignInOpen: false,
      })
    );
  };

  return (
    <>
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
      </Box>
      <SignInDialog
        handleOpenSignIn={handleOpenLogin}
        onSignUpOpen={handleOpenSignUp}
        open={dialog.isSignInOpen}
        onClose={onClose}
      />
      <SignUpDialog
        handleOpenSignUp={handleOpenSignUp}
        onSignInOpen={handleOpenLogin}
        onClose={onClose}
        open={dialog.isSignUpOpen}
      />
    </>
  );
};

export default AuthDraw;
