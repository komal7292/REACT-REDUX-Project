import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";

function EditTypeOfJobs(props) {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.setBanner.setTypeOfJobsData);
  const [dataOfJob, setDataOfJob] = useState([]);
  const [typeOfJob, setTypeOfJob] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://develop.hipoz.com/api/employmenttype?enum_id=0&enum_type_name=Type%20of%20employment"
      )
      .then((response) => {
        setDataOfJob(response.data.data);
      });
  }, []);
  function submitAllData(e) {
    e.preventDefault();
    let array = [];
    // eslint-disable-next-line array-callback-return
    typeOfJob.map((item) => {
      array.push(item.enum_id);
    });

    const postData = {
      user_id: 1098,
      job_type_id: array,
      actionby_id: 1098,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentjobtype", postData)
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_JOBS_TOGGLE, false));
          props.passDataToProps();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Button type="submit" onClick={submitAllData}>
        Submit
      </Button>
      <Autocomplete
        style={{ backgroundColor: "white" }}
        multiple
        value={typeOfJob}
        id="multiple-limit-tags"
        options={dataOfJob}
        onChange={(e, newValue) => setTypeOfJob(newValue)}
        getOptionLabel={(hello) => hello.enum_display}
        renderInput={(params) => (
          <>
            {console.log("f", params)}
            <TextField
              {...params}
              label="Your Job"
              placeholder={state.job_type_name?.map((item) => {
                return item.job_type_name;
              })}
            />
          </>
        )}
      />
    </div>
  );
}
export default EditTypeOfJobs;

// import * as React from "react";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import { useDispatch, useSelector } from "react-redux";
// import { JobType } from "../../ReduxStateManagement/actions/Action";

// export default function AutoComplete({ data, setdata }) {
//   const jobtype = useSelector((state) => state.UpdateDatas.Typeofjob);

//   let obj5 = [];
//   var c = 0;

//   for (var i = 0; i < joboptions.length; i++) {
//     for (var j = 0; j < jobtype.length; j++) {
//       if (jobtype[j] === joboptions[i].title) {
//         c++;
//         break;
//       }
//     }
//     if (c === 0) {
//       obj5 = [...obj5, joboptions[i]];
//     }
//     c = 0;
//   }
//   console.log(data);
//   const obj4 =
//     jobtype === undefined
//       ? null
//       : jobtype.map((d) => {
//           return { title: d };
//         });
//   console.log(obj4);
//   return (
//     <Autocomplete
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label=""
//           placeholder=""
//           onMouseOut={() => {
//             setdata(params.InputProps.startAdornment);
//           }}
//         />
//       )}
//       style={{ backgroundColor: "white" }}
//       multiple
//       //limitTags={2}
//       id="multiple-limit-tags"
//       options={joboptions}
//       getOptionLabel={(option) => option.title}
//       defaultValue={obj4}
//       // value={obj4}
//       placeholder="Enter preference"
//     />
//   );
// }
// const joboptions = [
//   { title: "Intern" },
//   { title: "Full Time" },
//   { title: "Part Time" },
// ];
