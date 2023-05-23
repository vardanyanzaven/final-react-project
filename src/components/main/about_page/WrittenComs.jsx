import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Box, Button } from "@mui/material";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getCommentsCollection } from "../../../store/slicers/commentSlice";
import { useAuth } from "../../../hooks/useAuth";

function formatDate(timestamp) {
  var date = new Date(timestamp);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear().toString().slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);

  return day + "." + month + "." + year + " " + hours + ":" + minutes;
}

export const WrittenComs = () => {
  const dispatch = useDispatch();
  const commentsArr = useSelector((state) => state.comments.commentsCol);
  const curArr = [...commentsArr];
  console.log(curArr);
  const auth = useAuth();

  const onHandleIcons = async (id, icon) => {
    const point = -1;
    const mainRef = doc(db, "comments", id);
    const currentCommentRef = await getDoc(mainRef);
    const { thumbUp, thumbDown, favorite, handleLikedPeople } =
      currentCommentRef.data();

    const { thumbUpList, thumbDownList, favoriteList } = handleLikedPeople;

    if (icon === "thumbUp") {
      if (thumbUpList.includes(auth.id)) {
        const changedList = thumbUpList.splice(thumbUpList.indexOf(auth.id), 1);
        await updateDoc(mainRef, {
          handleLikedPeople: {
            thumbUpList: changedList,
          },

          thumbUp: parseInt(thumbUp) + 1,
        });
      } else {
        await updateDoc(mainRef, {
          handleLikedPeople: {
            thumbUpList: [...thumbUpList, auth.id],
          },

          thumbUp: parseInt(thumbUp) + 1,
        });
      }
      dispatch(getCommentsCollection());
    }
    if (icon === "thumbDown") {
      await updateDoc(mainRef, {
        thumbDown: parseInt(thumbDown) + 1,
      });
      dispatch(getCommentsCollection());
    }
    if (icon === "favorite") {
      await updateDoc(mainRef, {
        favorite: parseInt(favorite) + 1,
      });
      dispatch(getCommentsCollection());
    }
  };

  return (
    <div style={{ overflow: "auto", maxHeight: "400px" }}>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "lightgray" }}>
        {curArr.map((m) => {
          const time = formatDate(m.commentTime);
          return (
            <React.Fragment key={Math.random()}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={m?.photoURL} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ mt: 2 }}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline", mr: "10px" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {m.fullName}
                        <Typography variant="body1">{m.comment}</Typography>
                        <Typography variant="subtitle2">{time}</Typography>
                      </Typography>
                      <Box sx={{ display: "flex", ml: 1 }}>
                        <Button onClick={() => onHandleIcons(m.id, "thumbUp")}>
                          <ThumbUpAltIcon /> {m.thumbUp}
                        </Button>
                        <Button onClick={() => onHandleIcons(m.id, "favorite")}>
                          <FavoriteIcon /> {m.favorite}
                        </Button>
                        <Button
                          onClick={() => onHandleIcons(m.id, "thumbDown")}
                        >
                          <ThumbDownAltIcon /> {m.thumbDown}
                        </Button>
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};
