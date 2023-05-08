import { regex } from "../constants/common";

export const passwordValidation = (password) => {
  let str = "Password must contain at least ";
  let sentence = [];

  const showString = [
    "one capital letter",
    "one number",
    "8-16 characters",
    "one lowercase",
  ];

  regex.filter((reg, i) => {
    if (!reg.test(password)) {
      sentence.push(showString[i]);
      return false;
    }
    return true;
  });

  if (!sentence.length) return "";
  const result = str + sentence.join(",");
  return result;
};
