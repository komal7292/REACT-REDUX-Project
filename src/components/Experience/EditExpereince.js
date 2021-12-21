import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Grid } from "@mui/material";
import axios from "axios";

function EditExpereince(props) {
  const [workExpereinceData, setWorkExpereinceData] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const [getMonthData, setGetMonthData] = useState([]);
  const [getYearData, setGetYearData] = useState([]);
  const initialObject = {
    currentlyWorkingId: "",
    jobTypeId: "",
    companyNameId: "",
    monthId: "",
    yearId: "",
    endMonthId: "",
    endYearId: "",
    userWorkExpereinceId: 0,
  };
  const [allData, setAllData] = useState([{ ...initialObject }]);
  function WorkExpereince() {
    axios
      .get(
        "https://develop.hipoz.com/api/getcondition?enum_id=0&enum_type_name=Condition"
      )
      .then((resp) => {
        setWorkExpereinceData(resp.data.data);
      });
  }
  useEffect(() => {
    WorkExpereince();
  }, []);
  function JobType() {
    axios
      .get(
        "https://develop.hipoz.com/api/employmenttype?enum_id=0&enum_type_name=Type%20of%20employment"
      )
      .then((resp) => {
        setJobTypeData(resp.data.data);
      });
  }
  useEffect(() => {
    JobType();
  }, []);
  function monthType() {
    axios
      .get(
        "https://develop.hipoz.com/api/getmonth?enum_id=0&enum_type_name=Month"
      )
      .then((resp) => {
        setGetMonthData(resp.data.data);
      });
  }
  useEffect(() => {
    monthType();
  }, []);
  function yearType() {
    axios
      .get(
        "https://develop.hipoz.com/api/getyear?enum_id=0&enum_type_name=Year"
      )
      .then((resp) => {
        setGetYearData(resp.data.data);
      });
  }
  useEffect(() => {
    yearType();
  }, []);
  function onEventHandler(e, i, type) {
    let array = [...allData];
    array[i][type] = e.target.value;
    setAllData([...array]);
    console.log(allData, "select");
  }
  useEffect(() => {
    let data = [];
    if (props.propsData && props.propsData !== 0) {
      // eslint-disable-next-line array-callback-return
      props.propsData.map((item) => {
        let object = { ...initialObject };
        object.currentlyWorkingId = item.currently_workinng;
        object.jobTypeId = item.job_type_enum_id;
        object.companyNameId = item.company_name;
        object.monthId = item.start_work_on_month_id;
        object.yearId = item.start_work_on_year_id;
        object.endMonthId = item.last_work_month_id;
        object.endYearId = item.last_work_year_id;
        object.userWorkExpereinceId = item.user_work_experience_id;
        data.push(object);
      });
      setAllData([...data]);
    }
  }, []);

  function postAllExpereinceData(e) {
    e.preventDefault();
    {
      let userJson = [];
      var result = {};
      for (let i = 0; i < allData.length; i++) {
        const temp = {
          currently_workinng: allData[i].currentlyWorkingId,
          job_type_enum_id: allData[i].jobTypeId,
          company_name: allData[i].companyNameId,
          work_on_month: allData[i].monthId,
          work_on_year: allData[i].yearId,
          last_work_month: allData[i].endMonthId,
          last_work_year: allData[i].endYearId,
          user_work_experience_id: allData[i].userWorkExpereinceId,
          status_enum_id: 1,
        };
        userJson.push(temp);
      }
      result = {
        user_id: 1098,
        user_work_experience_json: userJson,
        actionby_id: 1098,
      };
      axios
        .post(
          "https://develop.hipoz.com/api/updatestudentworkexperience",
          result
        )
        .then((resp) => {
          console.log(resp.data);
        });
    }
  }
  let selectValue = [];
  for (var i = 0; i < allData.length; i++) {
    selectValue = [...selectValue, false];
  }
  function addAnotherSet() {
    let copyExpereinceArray = [...allData];
    copyExpereinceArray.push(initialObject);
    setAllData([...copyExpereinceArray]);
  }
  function removedOtherSet(i) {
    let array = [...allData];
    array.splice(i, 1);
    setAllData(array);
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
        onClick={postAllExpereinceData}
        style={{
          float: "right",
          color: "white",
        }}
      />
      <ClearIcon
        // onClick={closeModal}
        style={{
          color: "white",
          float: "right",
        }}
      />
      {allData.map((item, i) => {
        return (
          <>
            {/* <label style={{ color: "white" }}>Work Expereince</label> */}
            <select
              onChange={(e) => onEventHandler(e, i, "currentlyWorkingId")}
              value={item.currentlyWorkingId}
            >
              <option hidden>Work Expereince</option>
              {workExpereinceData.map((item) => {
                return (
                  <option value={item.enum_id}>{item.enum_display}</option>
                );
              })}
            </select>
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
                {/* <lebel style={{ color: "white" }}>Job Type</lebel> */}
                <select
                  value={item.jobTypeId}
                  onChange={(e) => onEventHandler(e, i, "jobTypeId")}
                >
                  <option hidden>Your Job Type</option>
                  {jobTypeData.map((item) => {
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
                {/* <lebel style={{ color: "white" }}>Company Name</lebel> */}
                <input
                  type="text"
                  placeholder="Your Company Name"
                  value={item.companyNameId}
                  style={{ width: "100%", padding: "9px" }}
                  onChange={(e) => onEventHandler(e, i, "companyNameId")}
                />
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
                {/* <lebel style={{ color: "white" }}>Job Type</lebel> */}
                <select
                  value={item.monthId}
                  onChange={(e) => onEventHandler(e, i, "monthId")}
                >
                  <option hidden>Month</option>
                  {getMonthData.map((item) => {
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
                {/* <lebel style={{ color: "white" }}>Job Type</lebel> */}
                <select
                  value={item.yearId}
                  onChange={(e) => onEventHandler(e, i, "yearId")}
                >
                  <option hidden>Year</option>
                  {getYearData.map((item) => {
                    return (
                      <option value={item.enum_id}>{item.enum_display}</option>
                    );
                  })}
                </select>
              </Grid>
              {allData.map((item, i) => {
                return item.currentlyWorkingId === "134"
                  ? (selectValue[i] = true)
                  : (selectValue[i] = false);
              })}
              {selectValue[i] === true ? (
                <>
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
                    {/* <lebel style={{ color: "white" }}>Job Type</lebel> */}
                    <select
                      value={item.endMonthId}
                      onChange={(e) => onEventHandler(e, i, "endMonthId")}
                    >
                      <option hidden>End Month</option>
                      {getMonthData.map((item) => {
                        return (
                          <option value={item.enum_id}>
                            {item.enum_display}
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
                    {/* <lebel style={{ color: "white" }}>Job Type</lebel> */}
                    <select
                      value={item.endYearId}
                      onChange={(e) => onEventHandler(e, i, "endYearId")}
                    >
                      <option hidden>End Year</option>
                      {getYearData.map((item) => {
                        return (
                          <option value={item.enum_id}>
                            {item.enum_display}
                          </option>
                        );
                      })}
                    </select>
                  </Grid>
                </>
              ) : (
                ""
              )}
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
            <hr style={{ color: "white" }} />
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
export default EditExpereince;
