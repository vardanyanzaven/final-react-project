import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export const WrittenComs = () => {
  const commentsArr = useSelector((state) => state.comments.commentsCol);
  return (
    <div style={{ overflow: "auto", maxHeight: "400px" }}>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
        {commentsArr.map((m) => {
          return (
            <React.Fragment key={Math.random()}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={m?.photoURL} />
                </ListItemAvatar>
                <ListItemText
                  //   primary={m.}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {m?.fullName}
                      </Typography>
                      {m.com}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};
