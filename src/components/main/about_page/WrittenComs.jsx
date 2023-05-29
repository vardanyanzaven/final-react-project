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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Box, IconButton } from "@mui/material";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getCommentsCollection } from "../../../store/slicers/commentSlice";
import { useAuth } from "../../../hooks/useAuth";
import { writtenComStyles } from "./styles";
import { formatDate } from "../../../utils/formatDate";
import "./Comments.css";
import { openDialog } from "../../../store/slicers/dialogSlice";
export const WrittenComs = ({ dontShowAll }) => {
  const dispatch = useDispatch();
  const commentsArr = useSelector((state) => state.comments.commentsCol);
  const auth = useAuth();
  const curArr = dontShowAll
    ? [...commentsArr].filter((com) => com.personId === auth.id)
    : [...commentsArr];

  const onHandleIcons = async (id, icon) => {
    if (!auth.isAuth) {
      dispatch(
        openDialog({
          isSignUpOpen: false,
          isSignInOpen: true,
        })
      );
    }
    const mainRef = doc(db, "comments", id);
    const currentCommentRef = await getDoc(mainRef);
    const { thumbUp, thumbDown, favorite, handleLikedPeople } =
      currentCommentRef.data();

    const { thumbUpList, thumbDownList, favoriteList } = handleLikedPeople;
    if (icon === "thumbUp") {
      const index = thumbUpList.indexOf(auth.id);
      const indexDown = thumbDownList.indexOf(auth.id);
      const isDisliked = indexDown !== -1;
      const d = index === -1 ? 1 : -1;

      await updateDoc(mainRef, {
        thumbUp: +thumbUp + d,
        thumbDown: isDisliked ? +thumbDown - 1 : +thumbDown,
        handleLikedPeople: {
          thumbUpList:
            index === -1
              ? [...thumbUpList, auth.id]
              : [...thumbUpList.filter((id) => id !== auth.id)],
          thumbDownList: isDisliked
            ? [...thumbDownList.filter((id) => id !== auth.id)]
            : thumbDownList,
          favoriteList,
        },
      });
      dispatch(getCommentsCollection());
    }
    if (icon === "thumbDown") {
      const index = thumbDownList.indexOf(auth.id);
      const indexUp = thumbUpList.indexOf(auth.id);
      const isLiked = indexUp !== -1;
      const d = index === -1 ? 1 : -1;

      await updateDoc(mainRef, {
        thumbDown: +thumbDown + d,
        thumbUp: isLiked ? +thumbUp - 1 : thumbUp,
        handleLikedPeople: {
          thumbDownList:
            index === -1
              ? [...thumbDownList, auth.id]
              : [...thumbDownList.filter((id) => id !== auth.id)],
          thumbUpList: isLiked
            ? thumbDownList.filter((id) => id !== auth.id)
            : thumbUpList,
          favoriteList,
        },
      });
      dispatch(getCommentsCollection());
    }
    if (icon === "favorite") {
      const index = favoriteList.indexOf(auth.id);
      const d = index === -1 ? 1 : -1;

      await updateDoc(mainRef, {
        favorite: +favorite + d,
        handleLikedPeople: {
          favoriteList:
            index === -1
              ? [...favoriteList, auth.id]
              : [...favoriteList.filter((id) => id !== auth.id)],
          thumbUpList,
          thumbDownList,
        },
      });
      dispatch(getCommentsCollection());
    }
  };

  return (
    <div className="mainDiv" style={writtenComStyles.mainDiv}>
      <List sx={writtenComStyles.list}>
        {curArr.map((m) => {
          const time = formatDate(m.commentTime);
          const { thumbUpList, thumbDownList, favoriteList } =
            m.handleLikedPeople;
          const isThumbedUp = thumbUpList.includes(auth.id);
          const isThumbedDown = thumbDownList.includes(auth.id);
          const isFavorite = favoriteList.includes(auth.id);
          return (
            <React.Fragment key={Math.random()}>
              <ListItem sx={writtenComStyles.listItem}>
                <ListItemAvatar>
                  <Avatar src={m?.photoURL} />
                </ListItemAvatar>
                <Box sx={writtenComStyles.mainBox}>
                  <ListItemText sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        margin: "20px",
                      }}
                      component="span"
                      variant="body2"
                      color="#FFBD00">
                      {m.fullName}
                    </Typography>
                    <Typography variant="body1" color="white">
                      {m.comment}
                    </Typography>
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        margin: "20px",
                      }}
                      variant="subtitle2"
                      color="grey">
                      {time}
                    </Typography>
                  </ListItemText>
                  <Box
                    sx={{
                      display: "flex",
                      ml: 1,
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      margin: "20px",
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        disabled={dontShowAll}
                        color="primary"
                        onClick={() => onHandleIcons(m.id, "thumbUp")}>
                        {isThumbedUp ? (
                          <ThumbUpAltIcon />
                        ) : (
                          <ThumbUpOffAltIcon />
                        )}
                      </IconButton>
                      <Typography>{m.thumbUp}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        disabled={dontShowAll}
                        color="primary"
                        onClick={() => onHandleIcons(m.id, "favorite")}>
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <Typography>{m.favorite}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        disabled={dontShowAll}
                        color="primary"
                        onClick={() => onHandleIcons(m.id, "thumbDown")}>
                        {isThumbedDown ? (
                          <ThumbDownAltIcon />
                        ) : (
                          <ThumbDownOffAltIcon />
                        )}
                      </IconButton>
                      <Typography>{m.thumbDown}</Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};
