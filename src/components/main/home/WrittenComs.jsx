import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

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
  const curArr = [...commentsArr].sort((a, b) => b.commentTime - a.commentTime);

  return (
    <div style={{ overflow: "auto", maxHeight: "400px" }}>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
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
                    <Typography
                      sx={{ display: "inline", mr: "10px" }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      {m.fullName}
                      <Typography variant="body1">{m.comment}</Typography>
                      <Typography variant="subtitle2">{time}</Typography>
                    </Typography>
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
