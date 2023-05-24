import { ModalDialog } from "@mui/joy";
import { Box, Button, Checkbox, CircularProgress } from "@mui/material";
import { Link, Modal, Step } from "@mui/material";
import { useDispatch } from "react-redux";
import { StepLabel, Stepper, Typography } from "@mui/material";
import { v4 } from "uuid";
import { useMemo } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { DRIVER_REGISTER_STEPS } from "../../constants/common";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/common";
import PassportStep from "./all_steps/PassportStep";
import DriverLicenseStepe from "./all_steps/DriverLicenseStep";
import FinalStep from "./all_steps/FinalStep";
import { changingSetting } from "../../services/userSettingsConfig";
import { useAuth } from "../../hooks/useAuth";
import { changeMessage } from "../../store/slicers/statusSlice";
import { auth, db, storage } from "../../firebase";

async function finalPart(data, passportRef, selfieRef) {
  const {
    firstName,
    lastName,
    homeAddress,
    birthday,
    passport,
    passportDate,
    photo,
    selfie,
    license,
  } = data;
  try {
    await uploadBytes(passportRef, photo);
    await uploadBytes(selfieRef, selfie);
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      driverInfo: {
        firstName,
        lastName,
        homeAddress,
        birthday,
        passport,
        passportDate,
        license,
      },
    });
  } catch (error) {
    console.error(error.message);
    return new Promise.reject();
  }
}

const DriverSettings = () => {
  const [showStepper, setShowStepper] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [completed, setCompleted] = useState({});
  const [disable, setDisable] = useState(true);
  const [step, setStep] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const { userInfo, id } = useAuth();
  const disp = useDispatch();
  const [loading, setLoading] = useState(false);
  const storageRefForPassport = useMemo(() =>
    ref(storage, `${id}/${v4()}.png`)
  );
  const storageRefForSelfie = useMemo(() => ref(storage, `${id}/${v4()}.png`));

  const handleOpenModal = () => {
    setOpenModal(false);
  };
  const handleStep = async () => {
    if (step === DRIVER_REGISTER_STEPS.length - 1) {
      setLoading(true);
      await finalPart(completed, storageRefForPassport, storageRefForSelfie);

      changingSetting("Driver", null, { userInfo, disp })
        .then(() => {
          disp(changeMessage(SUCCESS_MESSAGE.driverBecomingSuccess));
          setStep(step + 1);
        })
        .catch((e) => {
          console.log(e);
          disp(changeMessage(ERROR_MESSAGE.driverRegError));
        })
        .finally(() => {
          setLoading(false);
          setIsNext(true);
        });
    }
    setStep(step + 1);
    setIsNext(true);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "8px",
            bgcolor: "#787878",
            minHeight: "250px",
            width: "70%",
            mt: "50px",
          }}>
          {!showStepper ? (
            <>
              <Typography
                variant="h6"
                sx={{ lineHeight: "50px", paddingInline: "50px" }}>
                Here will be your settings if you register as a driver. If you
                want to register as a driver, you can find out by clicking
                <Checkbox
                  checked={!disable}
                  color="success"
                  onChange={() => setDisable(!disable)}
                />
                <Button
                  onClick={() => setShowStepper(true)}
                  disabled={disable}
                  sx={{ mr: "5px" }}
                  variant="contained">
                  accept
                </Button>
              </Typography>
              <Link
                onClick={() => setOpenModal(true)}
                sx={{ color: "blue", cursor: "pointer" }}
                variant="subtitle2">
                copyright
              </Link>
            </>
          ) : (
            <>
              <Stepper activeStep={step} sx={{ p: 3 }}>
                {DRIVER_REGISTER_STEPS.map((step) => (
                  <Step key={step.title}>
                    <StepLabel>{step.title}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {step === DRIVER_REGISTER_STEPS.length ? (
                <>
                  <Typography>
                    Thank you for your message. We appreciate your feedback. Our
                    team will review it, and we will provide a response within
                    48 hours.
                  </Typography>
                  <Box sx={{ display: "flex", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {step + 1}</Typography>
                  {step === 0 && (
                    <PassportStep
                      setIsNext={setIsNext}
                      setCompleted={setCompleted}
                    />
                  )}
                  {step === 1 && (
                    <DriverLicenseStepe
                      completed={completed}
                      setCompleted={setCompleted}
                      setNext={setIsNext}
                    />
                  )}
                  {step === 2 && (
                    <FinalStep
                      completed={completed}
                      setCompleted={setCompleted}
                      setNext={setIsNext}
                    />
                  )}
                  <Box sx={{ display: "flex", p: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={handleStep}
                      disabled={isNext}
                      color="warning"
                      variant="outlined">
                      {step === DRIVER_REGISTER_STEPS.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                    {loading && <CircularProgress />}
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Box>

      <Modal open={openModal} onClose={handleOpenModal}>
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
              setOpenModal(false);
            }}>
            close
          </Button>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default DriverSettings;
