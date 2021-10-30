import React, { useState, useEffect } from "react";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./UpdateEducation.css";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

function UpdateEducation(props) {
  const [degreeValue, setDegreeValue] = useState("");
  const [fieldStudy, setFieldStudy] = useState("");
  const [university, setUniversity] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [addAnotherData, setAddAnotherData] = useState([]);
  const [allStudentData, setAllStudentData] = useState({
    degree: "",
    fieldOfStudy: "",
    university: "",
    month: "",
    year: "",
  });
  const [addAnotherEducationData, setAddAnotherEducationData] = useState(false);
  const data = useSelector((state) => state.setBanner.setProfileData);
  const degreeData = useSelector((state) => state.setBanner.setDegreeData);
  const StudyFieldData = useSelector(
    (state) => state.setBanner.setFieldOfStudyData
  );
  const universityData = useSelector(
    (state) => state.setBanner.setUniversityData
  );
  const monthData = useSelector((state) => state.setBanner.setMonthData);
  const yearData = useSelector((state) => state.setBanner.setYearData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllData(actionType.SET_PROFILE_DATA_GET, allStudentData));
  }, [allStudentData, dispatch]);
  useEffect(() => {
    axios
      .get(
        "https://develop.hipoz.com/api/getdegree?degree_id=0&status_enum_id=1"
      )
      .then((response) => {
        dispatch(setAllData(actionType.SET_DEGREE_DATA, response.data.data));
      });
  }, [dispatch]);
  useEffect(() => {
    axios
      .get(
        "https://develop.hipoz.com/api/getfieldofStudy?filed_of_study_id=0&status_enum_id=1"
      )
      .then((response) => {
        dispatch(
          setAllData(actionType.SET_FIELD_OF_STUDY_DATA, response.data.data)
        );
      });
  }, [dispatch]);
  useEffect(() => {
    axios
      .get(
        "https://develop.hipoz.com/api/getuniversity?university_id=0&status_enum_id=1"
      )
      .then((response) => {
        dispatch(
          setAllData(actionType.SET_UNIVERSITY_DATA, response.data.data)
        );
      });
  }, [dispatch]);
  useEffect(() => {
    axios
      .get(
        "https://develop.hipoz.com/api/getmonth?enum_id=0&enum_type_name=Month"
      )
      .then((response) => {
        dispatch(setAllData(actionType.SET_MONTH_DATA, response.data.data));
      });
  }, [dispatch]);
  useEffect(() => {
    axios
      .get(
        "https://develop.hipoz.com/api/getyear?enum_id=0&enum_type_name=Year"
      )
      .then((response) => {
        dispatch(setAllData(actionType.SET_YEAR_DATA, response.data.data));
      });
  }, [dispatch]);
  const localData = JSON.parse(localStorage.getItem("userDetails"));
  function submitStudentUpdatedData(e) {
    e.preventDefault();
    const educationData = {
      actionby_id: 1098,
      user_education_json: [
        {
          user_education_id: 0,
          degree_id: degreeValue,
          field_of_study_id: fieldStudy,
          university_id: university,
          graduate_month_id: month,
          graduate_year_id: year,
          status_enum_id: 1,
        },
        {},
      ],
      user_id: 1098,
    };
    axios
      .post(
        "https://develop.hipoz.com/api/userestudenteducation",
        educationData
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_EDUCATION_TOGGLE, false));
          props.educationData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function anotherEducationData() {
    setAddAnotherEducationData(true);
  }
  function closeModal() {
    dispatch(setAllData(actionType.SET_EDUCATION_TOGGLE, false));
    props.educationData();
  }
  return (
    <form className="contact-form">
      <ClearIcon
        onClick={closeModal}
        style={{
          float: "right",
          color: "white",
        }}
      />
      <CheckIcon
        onClick={submitStudentUpdatedData}
        style={{
          float: "right",
          color: "white",
        }}
      />
      <br />
      <label style={{ color: "white" }}>Your Degree</label>
      <select onChange={(e) => setDegreeValue(e.target.value)}>
        <option value="" disabled="">
          {data.degree_name}
        </option>
        {degreeData.map((items) => {
          return <option value={items.degree_id}>{items.degree_name}</option>;
        })}
      </select>
      <br />
      <label style={{ color: "white" }}>Study Field Data</label>
      <select onChange={(e) => setFieldStudy(e.target.value)}>
        <option value="" disabled="">
          {data.field_of_study_name}
        </option>
        {StudyFieldData.map((items) => {
          return (
            <option value={items.filed_of_study_id}>
              {items.filed_of_study_name}
            </option>
          );
        })}
      </select>
      <label style={{ color: "white" }}>University</label>
      <select onChange={(e) => setUniversity(e.target.value)}>
        <option value="" disabled="">
          {data.university_name}
        </option>
        {universityData.map((items) => {
          return (
            <option value={items.university_id}>{items.university_name}</option>
          );
        })}
      </select>
      <label style={{ color: "white" }}>Month</label>
      <select onChange={(e) => setMonth(e.target.value)}>
        <option value="" disabled="">
          {data.graduate_month_name}
        </option>
        {monthData.map((items) => {
          return <option value={items.enum_id}>{items.enum_key}</option>;
        })}
      </select>
      <label style={{ color: "white" }}>Year</label>
      <select onChange={(e) => setYear(e.target.value)}>
        <option value="" disabled="">
          {data.graduate_year}
        </option>
        {yearData.map((items) => {
          return <option value={items.enum_id}>{items.enum_key}</option>;
        })}
      </select>
      <hr style={{ color: "white" }} />
      {addAnotherEducationData ? (
        <div style={{ maxWidth: "100%" }}>
          <form onSubmit={submitStudentUpdatedData}>
            <label style={{ color: "white" }}>Your Degree</label>
            <select onChange={(e) => setDegreeValue(e.target.value)}>
              <option value="" disabled="">
                {data.degree_name}
              </option>
              {degreeData.map((items) => {
                return (
                  <option value={items.degree_id}>{items.degree_name}</option>
                );
              })}
            </select>
            <br />
            <label style={{ color: "white" }}>Study Field Data</label>
            <select onChange={(e) => setFieldStudy(e.target.value)}>
              <option value="" disabled="">
                {data.field_of_study_name}
              </option>
              {StudyFieldData.map((items) => {
                return (
                  <option value={items.filed_of_study_id}>
                    {items.filed_of_study_name}
                  </option>
                );
              })}
            </select>
            <label style={{ color: "white" }}>University</label>
            <select onChange={(e) => setUniversity(e.target.value)}>
              <option value="" disabled="">
                {data.university_name}
              </option>
              {universityData.map((items) => {
                return (
                  <option value={items.university_id}>
                    {items.university_name}
                  </option>
                );
              })}
            </select>
            <label style={{ color: "white" }}>Month</label>
            <select onChange={(e) => setMonth(e.target.value)}>
              <option value="" disabled="">
                {data.graduate_month_name}
              </option>
              {monthData.map((items) => {
                return <option value={items.enum_id}>{items.enum_key}</option>;
              })}
            </select>
            <label style={{ color: "white" }}>Year</label>
            <select onChange={(e) => setYear(e.target.value)}>
              <option value="" disabled="">
                {data.graduate_year}
              </option>
              {yearData.map((items) => {
                return <option value={items.enum_id}>{items.enum_key}</option>;
              })}
            </select>
          </form>
        </div>
      ) : (
        <Button
          variant="contained"
          style={{
            width: "100%",
            color: "#FFFFFF8C",
            backgroundColor: "#1e1d2b",
            border: "1px dashed white",
          }}
          onClick={anotherEducationData}
        >
          Add Another Graduate History
        </Button>
      )}
      <br />
    </form>
  );
}

export default UpdateEducation;
