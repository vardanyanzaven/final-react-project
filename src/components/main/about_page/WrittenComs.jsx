import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Box, Button } from "@mui/material";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

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
  const commentsArr = useSelector((state) => state.comments.commentsCol);
  const curArr = [...commentsArr];

  const onHandleIcons = async (id, icon) => {
    const mainRef = doc(db, "comments", id);
    const currentCommentRef = await getDoc(mainRef);
    const { thumbUp, thumbDown, favorite } = currentCommentRef.data();

    if (icon === "thumbUp") {
      updateDoc(mainRef, {
        thumbUp: parseInt(thumbUp) + 1,
      });
    }
    if (icon === "thumbDown") {
      updateDoc(mainRef, {
        thumbDown: parseInt(thumbDown) + 1,
      });
    }
    if (icon === "favorite") {
      updateDoc(mainRef, {
        favorite: parseInt(favorite) + 1,
      });
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
                        color="text.primary">
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
                          onClick={() => onHandleIcons(m.id, "thumbDown")}>
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
