import React from "react";
import { Grid } from "@mui/material";
import Banner from "../components/Banner/Banner";
import Newsfeed from "../components/Newsfeed/Newsfeed";
import "./Home.css";
import Header from "../components/Header/Header";
import { Redirect } from "react-router-dom";
import Favorites from "../components/Favorites/Favorites";
import StudentFollowJobs from "../components/StudentFollowJobs/StudentFollowJobs";

function Home() {
  const userDetails = localStorage.getItem("userDetails");
  if (!userDetails) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Header />
      <Grid container>
        <Grid id="box-2" item md={3}>
          <Favorites />
        </Grid>
        <Grid item md={6}>
          <Banner />
          <Newsfeed />
        </Grid>
        <Grid id="box-1" item md={3}>
          <StudentFollowJobs />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
