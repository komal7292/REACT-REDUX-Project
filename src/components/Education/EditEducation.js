import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Grid } from "@mui/material";
import axios from "axios";

function EditEducation() {
  const [degreeData, setDegreeData] = useState([]);
  function getDegreeData() {
    axios
      .get(
        "http://develop.hipoz.com/api/getdegree?degree_id=0&status_enum_id=1"
      )
      .then((resp) => {
        setDegreeData(resp.data.data);
      });
  }
  useEffect(() => {
    getDegreeData();
  }, []);
  return (
    <div>
      <p
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "-30px",
          marginBottom: "30px",
        }}
      >
        Edit Education
      </p>
      <ClearIcon
        // onClick={closeModal}
        style={{
          float: "right",
          color: "white",
        }}
      />
      <CheckIcon
        // onClick={submitStudentUpdatedData}
        style={{
          float: "right",
          color: "white",
        }}
      />
      <select style={{ width: "100%", height: "50px", padding: "9px" }}>
        <option hidden>Your Degree</option>
      </select>
      <select style={{ width: "100%", height: "50px", padding: "9px" }}>
        <option hidden>Your Field Of Study</option>
      </select>
      <select style={{ width: "100%", height: "50px", padding: "9px" }}>
        <option hidden>Your University</option>
      </select>
      <Grid container>
        <Grid item md={6}>
          <select style={{ width: "100%", height: "50px", padding: "9px" }}>
            <option>Month</option>
          </select>
        </Grid>
        <Grid item md={6}>
          <select style={{ width: "100%", height: "50px", padding: "9px" }}>
            <option>Year</option>
          </select>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditEducation;
