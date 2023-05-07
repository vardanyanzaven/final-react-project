import { ERROR_MESSAGES } from "../constants/common";

export const getError = ({ message }) => {
  const { invalidPassword, emailExists, something, userNotFound } =
    ERROR_MESSAGES;
  if (message.includes("email-already-in-use")) return emailExists;
  if (message.includes("wrong-password")) return invalidPassword;
  if (message.includes("user-not-found")) return userNotFound;
  console.log(message);
  return something;
};
