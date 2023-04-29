import { regex } from "../constants/common";

export const testPassword = (password) => {
  let str = "Password must contain at least ";
  let sentence = [];

  const showString = [
    "one capital letter",
    "one number",
    "8-16 characters",
    "one lowercase",
  ];

  const notValids = regex.filter((reg, i) => {
    if (!reg.test(password)) {
      sentence.push(showString[i]);
      return false;
    }
    return true;
  });

  if (!sentence.length) return "";
  console.log(str + sentence.join(","));
  return str + sentence.join(",");
};
