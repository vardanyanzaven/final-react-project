import { ERROR_MESSAGE } from "../constants/common";

export const getError = ({ message }) => {
  const {
    invalidPassword,
    emailExists,
    something,
    userNotFound,
    invalidEmail,
  } = ERROR_MESSAGE;

  if (message.includes("email-already-in-use")) return emailExists;
  if (message.includes("wrong-password")) return invalidPassword;
  if (message.includes("user-not-found")) return userNotFound;
  if (message.includes("invalid-email")) return invalidEmail;

  return something;
};
