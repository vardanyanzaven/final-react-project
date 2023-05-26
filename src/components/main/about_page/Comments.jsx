import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";
import { SUCCESS_MESSAGE } from "../../../constants/common";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../../store/slicers/statusSlice";
import Avatar from "@mui/material/Avatar";
import { WrittenComs } from "./WrittenComs";
import { getCommentsCollection } from "../../../store/slicers/commentSlice";
import { useEffect } from "react";
import { openDialog } from "../../../store/slicers/dialogSlice";
import { commentStyles } from "./styles";

export const Comments = () => {
  const [text, setText] = useState("");
  const { userInfo, isAuth, id } = useAuth();
  const disp = useDispatch();

  useEffect(() => {
    disp(getCommentsCollection());
  }, []);

  const onHandleButton = async () => {
    if (!isAuth) {
      disp(openDialog({ isSignUpOpen: true, isSignInOpen: false }));
      return;
    }
    if (!text) return;
    try {
      setText("");
      await addDoc(collection(db, "comments"), {
        handleLikedPeople: {
          thumbUpList: [],
          thumbDownList: [],
          favoriteList: [],
        },
        comment: text,
        writerId: doc(db, "users", auth.currentUser.uid),
        commentTime: new Date().getTime(),
        thumbUp: 0,
        thumbDown: 0,
        favorite: 0,
        personId: id,
      }).then(() => {
        disp(changeMessage(SUCCESS_MESSAGE.comment));
        disp(getCommentsCollection());
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={commentStyles.box2}>
      <Box sx={commentStyles.box3}>
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
          onClick={onHandleButton}>
          Send
        </Button>
      </Box>
      <WrittenComs />
    </Box>
  );
};
