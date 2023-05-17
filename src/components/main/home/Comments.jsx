import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { useState } from "react";
import Input from "@mui/joy/Input";
import { addDoc, collection, doc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";
import { SUCCESS_MESSAGE } from "../../../constants/common";
import { db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../../store/slicers/statusSlice";
import Avatar from "@mui/material/Avatar";
import { WrittenComs } from "./WrittenComs";
import { getCommentsCollection } from "../../../store/slicers/commentSlice";
import { useEffect } from "react";

export const Comments = () => {
  const [text, setText] = useState();
  const { id, userInfo } = useAuth();
  const disp = useDispatch();

  useEffect(() => {
    disp(getCommentsCollection());
  }, []);

  const onHandleButton = async () => {
    try {
      setText("");
      return await addDoc(collection(db, "comments"), {
        comment: text,
        writerId: doc(db, "users", id),
        photoURL: userInfo.photoURL,
      }).then(() => {
        disp(changeMessage(SUCCESS_MESSAGE.comment));
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            background: "white",
            width: 800,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Avatar src={userInfo.photoURL} size="lg" sx={{ mt: 2, ml: 12 }} />
          <Input
            sx={{ width: 350, height: 20, border: 1, mt: 2 }}
            placeholder="Write us comment here…"
            variant="outlined"
            color="primary"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            sx={{ width: 100, height: 20, mt: 2, mr: 12 }}
            onClick={onHandleButton}
          >
            Send
          </Button>
        </Box>
        <WrittenComs />
      </Box>
    </Box>
  );
};
