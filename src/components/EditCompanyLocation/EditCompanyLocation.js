import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
function EditCompanyLocation(props) {
  let dispatch = useDispatch();
  const studentData = useSelector((state) => state.setBanner.setProfileData);
  const [studentCompanyLocationData, setStudentCompanyLocationData] = useState(
    []
  );
  const [studentCompanyId, setStudentCompanyId] = useState([]);
  function studentCompanyData() {
    axios
      .get("https://develop.hipoz.com/api/countrylist?country_id=0")
      .then((response) => {
        setStudentCompanyLocationData(response.data.data);
        console.log("koko", response.data.data);
      });
  }
  useEffect(() => {
    studentCompanyData();
  }, []);
  function closeModal() {
    dispatch(setAllData(actionType.SET_COMPANY_LOCATION_TOGGLE, false));
  }
  function dataSubmit() {
    let array = [];
    studentCompanyId.map((item) => {
      array.push(item.country_id);
    });
    const jsonData = {
      user_id: 1098,
      pref_country_location_id: [array],
      actionby_id: 1098,
    };
    axios
      .post(
        "https://develop.hipoz.com/api/updatestudentprefcountrylocation",
        jsonData
      )
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_COMPANY_LOCATION_TOGGLE, false));
          setAllData(actionType.SET_PROFILE_DATA_GET, response.data.data);
        }
      });
  }
  return (
    <div>
      <ClearIcon
        onClick={closeModal}
        style={{
          float: "right",
          marginTop: "-30px",
          marginRight: "20px",
          color: "white",
        }}
      />
      <CheckIcon
        onClick={dataSubmit}
        style={{
          float: "right",
          marginTop: "-30px",
          marginRight: "-20px",
          color: "white",
        }}
      />
      <Autocomplete
        style={{ backgroundColor: "white" }}
        multiple
        value={studentCompanyId}
        id="multiple-limit-tags"
        options={studentCompanyLocationData}
        onChange={(e, newValue) => setStudentCompanyId(newValue)}
        getOptionLabel={(data) => data.country_name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your Job"
            placeholder={studentData.pref_country_name?.map((item) => {
              return item.country_name;
            })}
          />
        )}
      />
    </div>
  );
}
export default EditCompanyLocation;
