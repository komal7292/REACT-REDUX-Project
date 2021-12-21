import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";

import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";

function EditIndustryField(props) {
  let dispatch = useDispatch();
  const [industryData, setIndustryData] = useState([]);
  const [selectId, setSelectId] = useState([]);
  const [myData, setMyData] = useState([]);
  const data = JSON.parse(localStorage.getItem("userDetails"));
  const state = useSelector((state) => state.setBanner.setProfileData);
  function getIndustryData() {
    axios
      .get(
        "https://develop.hipoz.com/api/getindustryfield?industry_field_id=0&status_enum_id=1"
      )
      .then((response) => {
        console.log("ksdj", response.data.data);
        setIndustryData(response.data.data);
      });
  }
  useEffect(() => {
    getIndustryData();
  }, []);
  function getData() {
    axios
      .get(
        `https://develop.hipoz.com/api/userprofile?user_id=${data?.admin_id}&status_enum_id=1`
      )
      .then((response) => {
        console.log("jklmn", response.data.data[0]);
        setMyData(response.data.data[0]);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  function submitAllData() {
    const industrySelectMultipleData = [];
    selectId.map((item) => {
      industrySelectMultipleData.push(item.industry_field_id);
    });
    const jsonData = {
      user_id: 1098,
      industry_field_id: industrySelectMultipleData,
      actionby_id: 1098,
    };
    axios
      .post(
        "https://develop.hipoz.com/api/updatestudentindustryfield",
        jsonData
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_INDUSTRY_FIELD_TOGGLE, false));
          getData();
        }
      });
  }
  return (
    <div>
      <ClearIcon
        // onClick={closeModal}
        style={{
          float: "right",
          marginTop: "-30px",
          marginRight: "20px",
          color: "white",
        }}
      />
      <CheckIcon
        onClick={submitAllData}
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
        options={industryData}
        getOptionLabel={(option) => option.industry_field_name}
        onChange={(e, newValue) => setSelectId(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Industry Field"
            placeholder={
              state.industry_field
                ? state.industry_field.map((item) => {
                    return item.industry_filed_name;
                  })
                : "Favorites"
            }
          />
        )}
      />
    </div>
  );
}

export default EditIndustryField;
