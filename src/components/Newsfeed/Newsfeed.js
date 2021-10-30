import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { actionType } from "../redux/constant/actionType";
import { setAllData } from "../redux/action/action";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import "./Newsfeed.css";

function Newsfeed() {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.setBanner.setNewfeedData);
  console.log("Mydata", state);

  const getNewsfeedData = () => {
    axios
      .get(
        "https://develop.hipoz.com/api/getnewsfeed?status_enum_id=0&news_user_type_id=0"
      )
      .then((response) => {
        dispatch(setAllData(actionType.SET_NEWSFEED, response.data.data));
      });
  };
  useEffect(() => {
    getNewsfeedData();
  }, []);

  const renderedList = state.map((item) => {
    return (
      <Card
        className="newsfeed"
        style={{
          backgroundColor: "#1e1d2b",
          color: "white",
          fontSize: 32,
          fontFamily: "Montserrat",
          width: "80%",
          padding: "-20px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
          }
          title={item.news_title}
          subheader={item.creation_date}
        />
        <CardMedia
          component="img"
          style={{ margin: "20px", paddingRight: "40px" }}
          image={item.news_image_signed_url}
          alt={item.news_image_name}
        />
        <CardContent>
          <Typography
            variant="body2"
            style={{
              backgroundColor: "#1e1d2b",
              color: "white",
              fontSize: "16px",
              fontFamily: "Montserrat",
            }}
          >
            {item.news_short_description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon style={{ color: "white" }} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon style={{ color: "white" }} />
          </IconButton>
          <a href={item.news_url} target="_blank">
            <Button variant="contained" style={{ marginLeft: "380px" }}>
              Apply Now
            </Button>
          </a>
        </CardActions>
      </Card>
    );
  });
  return <div>{renderedList}</div>;
}

export default Newsfeed;
