import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
function EditInterestedWork(props) {
  let dispatch = useDispatch();
  const studentData = useSelector((state) => state.setBanner.setProfileData);
  const [studentInterestedWorkData, setStudentInterestedWorkData] = useState(
    []
  );
  const [getInterestedId, setGetInterestedId] = useState([]);
  console.log(getInterestedId);

  function interestedWorkData() {
    axios
      .get(
        "https://develop.hipoz.com/api/getintresetedworkin?interested_work_in_id=0&status_enum_id=1"
      )
      .then((response) => {
        setStudentInterestedWorkData(response.data.data);
        console.log(response.data.data);
      });
  }
  useEffect(() => {
    interestedWorkData();
  }, []);
  function dataSubmit() {
    let data = [];
    // eslint-disable-next-line array-callback-return
    getInterestedId.map((item) => {
      data.push(item.interested_work_in_id);
    });
    const jsonData = {
      user_id: 1098,
      interested_work_in_id: data,
      actionby_id: 1098,
    };
    axios
      .post(
        "https://develop.hipoz.com/api/updatestudentinterestedworkin",
        jsonData
      )
      .then((response) => {
        console.log(response.data.data);
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_INTERESTED_WORK_TOGGLE, false));
          props.passDataToProps();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function closeModal() {
    dispatch(setAllData(actionType.SET_INTERESTED_WORK_TOGGLE, false));
  }
  return (
    <div>
      {/* <Button type="submit" onClick={dataSubmit}>
        submit
      </Button> */}
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
        value={getInterestedId}
        id="multiple-limit-tags"
        options={studentInterestedWorkData}
        onChange={(e, newValue) => setGetInterestedId(newValue)}
        getOptionLabel={(hello) => hello.interested_work_in_name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your Job"
            placeholder={studentData.interested_work?.map((item) => {
              return item.interested_Work_name;
            })}
          />
        )}
      />
    </div>
  );
}
export default EditInterestedWork;
