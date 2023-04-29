import { updateEmail } from "firebase/auth";
import { auth } from "../firebase";
import { updateUserProfile } from "./dataBaseConfig";

export const changingSetting = (name, newProp) => {
  switch (name) {
    case "Email":
      updateEmail(auth.currentUser, newProp)
        .then(() => console.log("Email changed"))
        .catch(console.log);
      break;
    case "Gender":
      console.log(name, newProp);
      break;
    case "Mobile":
      updateUserProfile(auth.currentUser, { phone: newProp });
      break;
    case "Fullname":
      updateUserProfile(auth.currentUser, { fullName: newProp });
      break;
    default:
      console.log("default");
  }
};
