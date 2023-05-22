import { updateEmail } from "firebase/auth";
import { auth } from "../firebase";
import { updateUserProfile } from "./dataBaseConfig";

export const changingSetting = (name, newProp, dispatch) => {
  switch (name) {
    case "Email":
      updateEmail(auth.currentUser, newProp)
        .then(() => console.log("Email changed"))
        .catch(console.log);
      break;
    case "Gender":
      updateUserProfile(auth.currentUser, { gender: newProp }, dispatch);
      break;
    case "Mobile":
      updateUserProfile(auth.currentUser, { phone: newProp }, dispatch);
      break;
    case "Fullname":
      updateUserProfile(auth.currentUser, { fullName: newProp }, dispatch);
      break;
    case "Driver":
      return updateUserProfile(auth.currentUser, { type: "driver" }, dispatch);
    default:
      console.log("default");
  }
};
