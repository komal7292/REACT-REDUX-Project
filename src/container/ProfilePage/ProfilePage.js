import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../../components/Header/Header";
import GetStudentLoginData from "../../components/GetStudentLoginData/GetStudentLoginData";
import DescriptionPage from "../../components/DescriptionPage/DescriptionPage";
import EducationPage from "../../Education/EducationPage";
import axios from "axios";
import { setAllData } from "../../components/redux/action/action";
import { actionType } from "../../components/redux/constant/actionType";
import { useSelector, useDispatch } from "react-redux";
import TypeOfJob from "../../components/TypeOfJob/TypeOfJob";
import Interested from "../../components/Interested/Interested";
import CompanyLocation from "../../components/CompanyLocation/CompanyLocation";
import IndustryField from "../../components/IndustryField/IndustryField";
import UploadResume from "../../components/UploadResume/UploadResume";
import Language from "../../components/Language/Language";
import Scholarship from "../../components/Scholarship/Scholarship";
import Skills from "../../components/Skills/Skills";
import ExpectedSalary from "../../components/ExpectedSalary/ExpectedSalary";
import Experience from "../../components/Experience/Experience";
import Education from "../../components/Education/Education";

function ProfilePage() {
  const ProfileData = useSelector((state) => state.setBanner.setProfileData);
  console.log("c", ProfileData);
  let dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem("userDetails"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getData() {
    axios
      .get(
        `https://develop.hipoz.com/api/userprofile?user_id=${data?.admin_id}&status_enum_id=1`
      )
      .then((response) => {
        console.log("jk", response.data.data[0]);
        dispatch(
          setAllData(actionType.SET_PROFILE_DATA_GET, response.data.data[0])
        );
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <img
        src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
        alt="DreamsTime"
        style={{
          width: "100%",
          height: "500px",
          marginTop: "-20px",
          paddingBottom: "200px",
        }}
      />
      <Grid container>
        <Grid item md={3}>
          <GetStudentLoginData />
        </Grid>
        <Grid item md={6}>
          <Education />
          <div style={{ marginTop: "220px" }}>
            <TypeOfJob />
          </div>
          <div style={{ marginTop: "220px" }}>
            <Interested />
          </div>
          <div style={{ marginTop: "220px" }}>
            <CompanyLocation />
          </div>
          <div style={{ marginTop: "220px" }}>
            <IndustryField />
          </div>
          <div style={{ marginTop: "220px" }}>
            <UploadResume />
          </div>
          <div style={{ marginTop: "220px" }}>
            <Language />
          </div>
          <div style={{ marginTop: "220px" }}>
            <Scholarship />
          </div>
          <div style={{ marginTop: "220px" }}>
            <Skills />
          </div>
          <div style={{ marginTop: "220px" }}>
            <ExpectedSalary />
          </div>
          <div style={{ marginTop: "220px" }}>
            <Experience />
          </div>
        </Grid>
        <Grid item md={3}>
          <DescriptionPage />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
