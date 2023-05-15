import { ModalDialog } from "@mui/joy";
import {
  Box,
  Button,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const DriverSettings = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const [step, setStep] = useState(0);

  const modalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            bgcolor: "#787878",
            minHeight: "100px",
            width: "70%",
            mt: "50px",
            borderRadius: "8px",
            textAlign: "center",
          }}>
          <Typography
            variant="h6"
            sx={{ lineHeight: "50px", paddingInline: "50px" }}>
            Here will be your settings if you register as a driver. If you want
            to register as a driver, you can find out by clicking
            <Button onClick={() => setOpenModal(true)} color="secondary">
              HERE
            </Button>
          </Typography>
          {showStepper && (
            <Stepper activeStep={step} alternativeLabel>
              <Step>
                <StepLabel>alternativeLabel</StepLabel>
              </Step>
            </Stepper>
          )}
        </Box>
      </Box>
      <Modal open={openModal} onClose={modalClose}>
        <ModalDialog variant="soft">
          Data collection: Explain what types of personal information you
          collect from users, such as name, address, email address, phone
          number, and payment information. Use of data: Describe how you will
          use the data that you collect, such as to process payments, improve
          your services, or respond to user inquiries. Sharing of data: Explain
          whether or not you will share user data with third parties, such as
          payment processors or other service providers. If you do share data,
          be transparent about the reasons why and how the data will be used.
          Data security: Describe the measures that you have in place to protect
          user data from unauthorized access, such as encryption, firewalls, and
          access controls. User rights: Inform users about their rights under
          applicable privacy laws, such as the right to access, correct, or
          delete their personal information. Cookies and other tracking
          technologies: Explain what cookies and other tracking technologies
          your website uses, and how they are used to collect data about user
          behavior. Changes to the policy: Explain how you will notify users of
          changes to your privacy policy, and how users can opt-out of any
          changes that they do not agree with.
          <Button
            onClick={() => {
              setShowStepper(true);
              setOpenModal(false);
            }}>
            agree
          </Button>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default DriverSettings;
