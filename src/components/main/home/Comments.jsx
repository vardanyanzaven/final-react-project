import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { useState } from "react";
import { Avatar } from "@mui/material";
import Input from "@mui/joy/Input";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";
import { SUCCESS_MESSAGE } from "../../../constants/common";
import ShowStatus from "../../../shared/show_bar/ShowStatus";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../../store/slicers/statusSlice";

export const Comments = () => {
  const [text, setText] = useState();
  const { id } = useAuth();
  const disp = useDispatch();

  //   const q = query(collection(db, "cities"))

  //   const querySnapshot = await getDocs(q)

  const onHandleButton = async () => {
    setText("");
    return await addDoc(collection(db, "comments"), {
      comment: text,
      writer: doc(db, "users", auth.currentUser.uid),
    })
      .then(() => {
        disp(changeMessage(SUCCESS_MESSAGE.comment));
        ShowStatus();
      })
      .catch(({ message }) => console.log(message));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Box
          sx={{ display: "flex", background: "white", width: 800, height: 600 }}
        >
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            size="lg"
          />
          <Input
            sx={{ width: 250, height: 20, border: "none" }}
            placeholder="Write comment us here…"
            variant="outlined"
            color="primary"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button sx={{ width: 50, height: 20 }} onClick={onHandleButton}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
