import { regex } from "../constants/common";

export const testPassword = (password) => {
  return regex.test(password);
};
