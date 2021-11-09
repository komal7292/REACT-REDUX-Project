import React, { useState, useEffect } from "react";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./UpdateEducation.css";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

function UpdateEducation(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let initialObject = {
    degree: "",
    fieldOfStudy: "",
    university: "",
    graduateMonth: "",
    graduateYear: "",
    userEducationId: 0,
  };
  const [graduation, setGraduation] = useState([{ ...initialObject }]);
  console.log("graduation", graduation);
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

  function addGraduationHandler() {
    let array = [...graduation];
    array.push(initialObject);
    setGraduation([...array]);
  }
  function removedOtherSet(i) {
    let array = [...graduation];
    array.splice(i, 1);
    setGraduation(array);
  }
  const handleInputChange = (e, i, type) => {
    let array = [...graduation];
    array[i][type] = e.target.value;
    setGraduation([...array]);
  };

  function closeModal() {
    dispatch(setAllData(actionType.SET_EDUCATION_TOGGLE, false));
    props.educationData();
  }

  // useEffect(() => {
  //   let array = [];
  //   if (props.state && props.state.length !== 0) {
  //     // eslint-disable-next-line array-callback-return
  //     props.state.map((education) => {
  //       let object = { ...initialObject };
  //       object.degree = education.degree_id;
  //       object.fieldOfStudy = education.field_of_study_id;
  //       object.university = education.university_id;
  //       object.graduateMonth = education.graduate_month_id;
  //       object.graduateYear = education.graduate_year_id;
  //       object.userEducationId = education.user_education_id;
  //       array.push(object);
  //     });
  //     setGraduation([...array]);
  //     console.log(array, "Array<<<<<<<<<<<<");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, props.state]);

  function submitStudentUpdatedData(e) {
    e.preventDefault();
    let educationJson = [];
    // eslint-disable-next-line array-callback-return
    graduation.map((data) => {
      let object = {};
      object.user_education_id = data.userEducationId;
      object.degree_id = data.degree ? data.degree : null;
      object.field_of_study_id = data.fieldOfStudy ? data.fieldOfStudy : null;
      object.university_id = data.university ? data.university : null;
      object.graduate_month_id = data.graduateMonth ? data.graduateMonth : null;
      object.graduate_year_id = data.graduateYear ? data.graduateYear : null;
      object.status_enum_id = 1;
      educationJson.push(object);
    });
    console.log(graduation);
    const param = {
      user_id: 1098,
      user_education_json: educationJson,
      actionby_id: 1098,
    };
    axios
      .post("https://develop.hipoz.com/api/userestudenteducation", param)
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_EDUCATION_TOGGLE, false));
          props.educationData();
          alert("successfull");
        }
      })
      .catch((error) => {
        alert("error");
      });
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
      {graduation.map((item, i) => (
        <>
          {console.log(item, "Itrem")}
          <label style={{ color: "white" }}>Your Degree</label>
          <select
            inputId={"degree"}
            inputName={"degree"}
            value={item.degree}
            onChange={(e) => handleInputChange(e, i, "degree")}
          >
            {/* <option>
              {props.educationStudentData?.degree_name
                ? props.educationStudentData?.degree_name
                : "Your Degree"}
            </option> */}
            {degreeData.map((item) => {
              return <option value={item.degree_id}>{item.degree_name}</option>;
            })}
          </select>
          <label style={{ color: "white" }}>Study Field Data</label>
          <select
            inputId={"fieldOfStudy"}
            inputName={"fieldOfStudy"}
            value={item.fieldOfStudy}
            onChange={(e) => handleInputChange(e, i, "fieldOfStudy")}
          >
            {/* <option>
              {props.educationStudentData?.field_of_study_name
                ? props.educationStudentData?.field_of_study_name
                : "Study Field"}
            </option> */}
            {StudyFieldData.map((items) => {
              return (
                <option value={items.filed_of_study_id}>
                  {items.filed_of_study_name}
                </option>
              );
            })}
          </select>
          <label style={{ color: "white" }}>University</label>
          <select
            inputId={"university"}
            inputName={"university"}
            value={item.university}
            onChange={(e) => handleInputChange(e, i, "university")}
          >
            {/* <option>
              {props.educationStudentData?.university_name
                ? props.educationStudentData?.university_name
                : "Your University Name"}
            </option> */}
            {universityData.map((items) => {
              return (
                <option value={items.university_id}>
                  {items.university_name}
                </option>
              );
            })}
          </select>
          <label style={{ color: "white" }}>Month</label>
          <select
            inputId={"graduateMonth"}
            inputName={"graduateMonth"}
            value={item.graduateMonth}
            onChange={(e) => handleInputChange(e, i, "graduateMonth")}
          >
            {/* <option>
              {props.educationStudentData?.graduate_month_name
                ? props.educationStudentData?.graduate_month_name
                : "Graduate Month"}
            </option> */}
            {monthData.map((items) => {
              return <option value={items.enum_id}>{items.enum_key}</option>;
            })}
          </select>
          <label style={{ color: "white" }}>Year</label>
          <select
            inputId={"graduateYear"}
            inputName={"graduateYear"}
            value={item.graduateYear}
            onChange={(e) => handleInputChange(e, i, "graduateYear")}
          >
            {/* <option>
              {props.educationStudentData?.graduate_year
                ? props.educationStudentData?.graduate_year
                : "Graduate Year"}
            </option> */}
            {yearData.map((items) => {
              return <option value={items.enum_id}>{items.enum_key}</option>;
            })}
          </select>
          {i !== 0 ? (
            <Button
              variant="contained"
              style={{
                width: "100%",
                color: "#FFFFFF8C",
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
      ))}
      <Button
        variant="contained"
        style={{
          width: "100%",
          color: "#FFFFFF8C",
          backgroundColor: "#1e1d2b",
          border: "1px dashed white",
        }}
        onClick={addGraduationHandler}
      >
        Add Another Graduate History
      </Button>
    </form>
  );
}

export default UpdateEducation;

// {
//   /* <ClearIcon
//         onClick={closeModal}
//         style={{
//           float: "right",
//           color: "white",
//         }}
//       />
//       <CheckIcon
//         onClick={submitStudentUpdatedData}
//         style={{
//           float: "right",
//           color: "white",
//         }}
//       />
//       <br />
//       <label style={{ color: "white" }}>Your Degree</label>
//
//       <br />

//       <label style={{ color: "white" }}>Month</label>
//       <select onChange={(e) => setMonth(e.target.value)}>
//         <option value="" disabled="">
//           {data.graduate_month_name}
//         </option>
//         {monthData.map((items) => {
//           return <option value={items.enum_id}>{items.enum_key}</option>;
//         })}
//       </select>
//       <label style={{ color: "white" }}>Year</label>
//       <select onChange={(e) => setYear(e.target.value)}>
//         <option value="" disabled="">
//           {data.graduate_year}
//         </option>
//         {yearData.map((items) => {
//           return <option value={items.enum_id}>{items.enum_key}</option>;
//         })}
//       </select>
//       <hr style={{ color: "white" }} />
//       {addAnotherEducationData ? (
//         <div style={{ maxWidth: "100%" }}>
//           <form onSubmit={submitStudentUpdatedData}>
//             <label style={{ color: "white" }}>Your Degree</label>
//             <select onChange={(e) => setDegreeValue(e.target.value)}>
//               <option value="" disabled="">
//                 {data.degree_name}
//               </option>
//               {degreeData.map((items) => {
//                 return (
//                   <option value={items.degree_id}>{items.degree_name}</option>
//                 );
//               })}
//             </select>
//             <br />
//             <label style={{ color: "white" }}>Study Field Data</label>
//             <select onChange={(e) => setFieldStudy(e.target.value)}>
//               <option value="" disabled="">
//                 {data.field_of_study_name}
//               </option>
//               {StudyFieldData.map((items) => {
//                 return (
//                   <option value={items.filed_of_study_id}>
//                     {items.filed_of_study_name}
//                   </option>
//                 );
//               })}
//             </select>
//             <label style={{ color: "white" }}>University</label>
//             <select onChange={(e) => setUniversity(e.target.value)}>
//               <option value="" disabled="">
//                 {data.university_name}
//               </option>
//               {universityData.map((items) => {
//                 return (
//                   <option value={items.university_id}>
//                     {items.university_name}
//                   </option>
//                 );
//               })}
//             </select>

//           </form>
//           <Button
//             variant="contained"
//             style={{
//               width: "100%",
//               color: "#FFFFFF8C",
//               backgroundColor: "#1e1d2b",
//               border: "1px dashed white",
//             }}
//             onClick={removedOtherSet}
//           >
//             Remove this set
//           </Button>
//         </div>
//       ) : (
//         <>
//           <Button
//             variant="contained"
//             style={{
//               width: "100%",
//               color: "#FFFFFF8C",
//               backgroundColor: "#1e1d2b",
//               border: "1px dashed white",
//             }}
//             onClick={anotherEducationData}
//           >
//             Add Another Graduate History
//           </Button>
//         </>
//       )}
//       <br />*/
// }
// const localData = JSON.parse(localStorage.getItem("userDetails"));

// function anotherEducationData() {
//   setAddAnotherEducationData(true);
// }
// console.log(graduation);
// const educationData = {
//   actionby_id: 1098,
//   user_education_json: [
//     {
//       user_education_id: 0,
//       degree_id: graduation[0].degree,
//       field_of_study_id: graduation[0].fieldOfStudy,
//       university_id: graduation[0].university,
//       graduate_month_id: graduation[0].graduateMonth,
//       graduate_year_id: graduation[0].graduateYear,
//       status_enum_id: 1,
//     },
//   ],
//   user_id: 1098,
// };
// console.log(educationData);
// axios
//   .post(
//     "https://develop.hipoz.com/api/userestudenteducation",
//     educationData
//   )
//   .then((response) => {
//     console.log(response.data);
//     if (response.data.statuscode === 200) {
//       dispatch(setAllData(actionType.SET_EDUCATION_TOGGLE, false));
//       props.educationData();
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
