import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";

function EditExpectedSalary(props) {
  let dispatch = useDispatch();
  const [getSalaryData, setGetSalaryData] = useState([]);
  const [getEmployeeType, setGetEmployeeType] = useState([]);
  const object = {
    expectSalaryId: "",
    jobTypeId: "",
    userSalaryId: 0,
  };
  const [array, setArray] = useState([{ ...object }]);
  function getExpectedSalaryPerMonth() {
    axios
      .get(
        "https://develop.hipoz.com/api/salaryunit?enum_id=0&enum_type_name=Salary"
      )
      .then((res) => {
        setGetSalaryData(res.data.data);
      });
  }
  useEffect(() => {
    getExpectedSalaryPerMonth();
  }, []);
  function getEmployeetype() {
    axios
      .get(
        "https://develop.hipoz.com/api/employmenttype?enum_id=0&enum_type_name=Type%20of%20employment"
      )
      .then((res) => {
        setGetEmployeeType(res.data.data);
        console.log("employee", res.data.data);
      });
  }
  useEffect(() => {
    getEmployeetype();
    console.log("props.data", props.data);
  }, []);
  function eventHandler(e, i, type) {
    let myArray = [...array];
    myArray[i][type] = e.target.value;
    setArray([...myArray]);
  }
  function addAnotherSetsInArray() {
    let lastElement = array[array.length - 1];
    if (lastElement.expectSalaryId === "" && lastElement.jobTypeId === "") {
      alert("firstly fill these set");
    } else {
      let addArray = [...array];
      addArray.push(object);
      setArray(addArray);
    }
  }
  useEffect(() => {
    let data = [];
    if (props.data && props.data !== 0) {
      props.data.map((item) => {
        let initialObject = { ...object };
        initialObject.expectSalaryId = item.salary_enum_id;
        initialObject.jobTypeId = item.salary_level_enum_id;
        initialObject.userSalaryId = item.user_salary_id;
        data.push(initialObject);
      });
      setArray([...data]);
    }
  }, []);
  function postExpectedSalaryData(e) {
    e.preventDefault();
    {
      let userJson = [];
      for (let i = 0; i < array.length; i++) {
        const temp = {
          salary_enum_id: array[i].expectSalaryId,
          salary_level_enum_id: array[i].jobTypeId,
          user_salary_id: array[i].userSalaryId,
          status_enum_id: 1,
        };
        userJson.push(temp);
      }
      var jsonData = {
        user_id: 1098,
        user_salary_json: userJson,
        actionby_id: 1098,
      };
    }
    axios
      .post("https://develop.hipoz.com/api/updatestudentsalary", jsonData)
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_SALARY_TOGGLE, false));
          props.propsData();
        }
      });
  }
  function closeModal() {
    dispatch(setAllData(actionType.SET_SALARY_TOGGLE, false));
  }
  function removedOtherSet(i) {
    let copyArray = [...array];
    copyArray.splice(i, 1);
    setArray(copyArray);
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
        Edit Expected Salary
      </p>
      <CheckIcon
        onClick={postExpectedSalaryData}
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
      {array.map((item, i) => {
        return (
          <>
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
                <label
                  style={{
                    color: "white",
                    marginTop: "-90px",
                  }}
                >
                  Expected salary per month
                </label>
                <select
                  value={item.expectSalaryId}
                  style={{ width: "100%" }}
                  onChange={(e) => eventHandler(e, i, "expectSalaryId")}
                >
                  <option hidden>Expected salary per month</option>
                  {getSalaryData.map((item) => {
                    return (
                      <option value={item.enum_id}>{item.enum_display}</option>
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
                <label
                  style={{
                    color: "white",
                    marginTop: "-90px",
                  }}
                >
                  Job type
                </label>
                <select
                  style={{ width: "100%" }}
                  value={item.jobTypeId}
                  onChange={(e) => eventHandler(e, i, "jobTypeId")}
                >
                  <option hidden>Job type</option>
                  {getEmployeeType.map((item) => {
                    return (
                      <option value={item.enum_id}>{item.enum_display}</option>
                    );
                  })}
                </select>
              </Grid>
            </Grid>
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
        onClick={addAnotherSetsInArray}
      >
        Add
      </Button>
    </div>
  );
}

export default EditExpectedSalary;
