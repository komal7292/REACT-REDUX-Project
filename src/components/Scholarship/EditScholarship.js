import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";

function EditScholarship(props) {
  let dispatch = useDispatch();
  const [scholarshipData, setScholarshipData] = useState([]);
  const [scholarshipCondition, setScholarshipCondition] = useState([]);
  const initialObject = {
    conditionId: "",
    scholarshipId: "",
    scholarshipNameId: "",
    userScholarshipId: 0,
  };
  const [copyArray, setCopyArray] = useState([{ ...initialObject }]);
  let array = [];
  for (var i = 0; i < copyArray.length; i++) {
    array = [...array, false];
  }
  const conditionData = () => {
    axios
      .get(
        "https://develop.hipoz.com/api/getcondition?enum_id=0&enum_type_name=Condition"
      )
      .then((res) => {
        console.log("yes", res.data.data);
        setScholarshipCondition(res.data.data);
      });
  };

  function scholarshipTypeData() {
    axios
      .get(
        "https://develop.hipoz.com/api/getSchloreship?schlorship_type_id=0&status_enum_id=1"
      )
      .then((res) => {
        console.log("no", res.data.data);
        setScholarshipData(res.data.data);
      });
  }
  useEffect(() => {
    scholarshipTypeData();
    console.log("props", props.state);
  }, []);

  useEffect(() => {
    conditionData();
  }, []);
  function addAnotherSet() {
    let copySch = [...copyArray];
    copySch.push(initialObject);
    setCopyArray([...copySch]);
  }
  const onEventHandler = (e, i, type) => {
    let copyScholarshipSet = [...copyArray];
    copyScholarshipSet[i][type] = e.target.value;
    setCopyArray([...copyScholarshipSet]);
  };
  useEffect(() => {
    let array = [];
    if (props.state && props.state !== 0) {
      // eslint-disable-next-line array-callback-return
      props.state.map((item) => {
        let data = { ...initialObject };
        data.conditionId = item.merit_schlorship_id;
        data.scholarshipId = item.schlorship_type_id;
        data.scholarshipNameId = item.schlorship_name;
        data.userScholarshipId = item.user_schlorship_id;
        array.push(data);
      });
      setCopyArray([...array]);
    }
  }, []);
  function postScholarshipData(e) {
    e.preventDefault();
    {
      let userJson = [];
      var result = {};
      for (let i = 0; i < copyArray.length; i++) {
        const temp = {
          user_schlorship_id: copyArray[i].userScholarshipId,
          merit_schlorship_id: copyArray[i].conditionId,
          schlorship_type_id: copyArray[i].scholarshipId,
          schlorship_name: copyArray[i].scholarshipNameId,
          status_enum_id: 1,
        };
        userJson.push(temp);
      }
      // eslint-disable-next-line no-unused-vars
      result = {
        user_id: 1098,
        user_schlorship_json: userJson,
        actionby_id: 1098,
      };
    }
    axios
      .post("https://develop.hipoz.com/api/updatestudentschlorship", result)
      .then((res) => {
        if (res.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_SCHOLARSHIP_TOGGLE, false));
          props.secondData();
        }
      });
  }
  function removedOtherSet(i) {
    let array = [...copyArray];
    array.splice(i, 1);
    setCopyArray(array);
  }
  function closeModal() {
    dispatch(setAllData(actionType.SET_SCHOLARSHIP_TOGGLE, false));
  }
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
        Edit Scholarship
      </p>
      <CheckIcon
        onClick={postScholarshipData}
        style={{
          float: "right",
          color: "white",
        }}
      />
      <ClearIcon
        onClick={closeModal}
        style={{
          color: "white",
          float: "right",
        }}
      />
      {copyArray.map((item, i) => {
        return (
          <>
            <select
              value={item.conditionId}
              onChange={(e) => onEventHandler(e, i, "conditionId")}
            >
              <option hidden>
                In the course of studies, I received a merit scholarship
              </option>
              {scholarshipCondition.map((item) => {
                return (
                  <option value={item.enum_id}>{item.enum_display}</option>
                );
              })}
            </select>
            {copyArray.map((item, i) => {
              return item.conditionId === "134"
                ? (array[i] = true)
                : (array[i] = false);
            })}
            {array[i] === true ? (
              <Grid container>
                <Grid
                  item
                  md={6}
                  style={{
                    padding: "5px",
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <select
                    value={item.scholarshipId}
                    onChange={(e) => onEventHandler(e, i, "scholarshipId")}
                  >
                    <option hidden>Your Scholarship Type</option>
                    {scholarshipData.map((data) => {
                      return (
                        <option value={data.schlorship_type_id}>
                          {data.schlorship_type_name}
                        </option>
                      );
                    })}
                  </select>
                </Grid>
                <Grid
                  item
                  md={6}
                  style={{
                    padding: "5px",
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    value={item.scholarshipNameId}
                    name="scholarshipNameId"
                    placeholder="Your Scholarship Name"
                    onChange={(e) => onEventHandler(e, i, "scholarshipNameId")}
                    style={{ width: "100%", padding: "9px" }}
                  />
                </Grid>
              </Grid>
            ) : (
              ""
            )}
            {i !== 0 ? (
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  color: "red",
                  borderColor: "red",
                  backgroundColor: "#1e1d2b",
                  border: "1px dashed white",
                }}
                onClick={(e) => removedOtherSet(i)}
              >
                Remove this set
              </Button>
            ) : null}
            <hr style={{ color: "white" }} />;
          </>
        );
      })}
      <Button
        style={{
          width: "100%",
          color: "#FFFFFF8C",
          backgroundColor: "#1e1d2b",
          border: "1px dashed white",
        }}
        onClick={addAnotherSet}
      >
        add
      </Button>
    </div>
  );
}

export default EditScholarship;
