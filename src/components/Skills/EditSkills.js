import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";

function EditSkills(props) {
  let dispatch = useDispatch();
  const [skillsData, setSkillsData] = useState([]);
  const [ExpertiseLevel, setExpertiseLevel] = useState([]);

  const skillsObject = {
    skillsName: "",
    expertiseName: "",
    userSkillsId: 0,
  };
  const [array, setArray] = useState([{ ...skillsObject }]);
  // console.log("id", props.data, array);
  useEffect(() => {
    axios
      .get("https://develop.hipoz.com/api/skills?skill_id=0&status_id=1")
      .then((response) => {
        setSkillsData(response.data.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://develop.hipoz.com/api/expertiselevel?enum_id=0&enum_type_name=Expertise%20level"
      )
      .then((response) => {
        setExpertiseLevel(response.data.data);
      });
  }, []);
  const eventHandler = (e, i, type) => {
    let copyArray = [...array];
    copyArray[i][type] = e.target.value;
    setArray([...copyArray]);
    console.log(array);
  };
  useEffect(() => {
    let data = [];
    if (props.state && props.state !== 0) {
      // eslint-disable-next-line array-callback-return
      props.state.map((item) => {
        let initialObject = { ...skillsObject };
        initialObject.skillsName = item.skills_ids;
        initialObject.expertiseName = item.expertise_level_enum_id;
        initialObject.userSkillsId = item.user_skills_id;
        data.push(initialObject);
      });
      setArray([...data]);
    }
  }, []);
  function addAnotherSetsInArray() {
    let lastElement = array[array.length - 1];
    if (lastElement.skillsName === "" && lastElement.expertiseName === "") {
      alert("firstly fill these set");
    } else {
      let copyArrayForAddData = [...array];
      copyArrayForAddData.push(skillsObject);
      setArray(copyArrayForAddData);
    }
  }
  function removedOtherSet(i) {
    let copyArray = [...array];
    copyArray.splice(i, 1);
    setArray(copyArray);
  }
  function postSkillsData(e) {
    e.preventDefault();
    {
      let userJson = [];
      var result = {};
      for (let i = 0; i < array.length; i++) {
        const temp = {
          user_skills_id: array[i].userSkillsId,
          expertise_level_enum_id: array[i].expertiseName,
          skills_ids: array[i].skillsName,
          status_enum_id: 1,
        };
        userJson.push(temp);
      }
      // eslint-disable-next-line no-unused-vars
      result = {
        user_id: 1098,
        skills_json: userJson,
        actionby_id: 1098,
      };
    }
    axios
      .post("https://develop.hipoz.com/api/updatestudentskills", result)
      .then((res) => {
        if (res.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_SKILLS_TOGGLE, false));
          props.data();
        }
      });
  }
  function closeModal() {
    dispatch(setAllData(actionType.SET_SKILLS_TOGGLE, false));
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
        Edit Skills
      </p>
      <CheckIcon
        onClick={postSkillsData}
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
                  Skills
                </label>
                <select
                  value={item.skillsName}
                  style={{ width: "100%" }}
                  onChange={(e) => eventHandler(e, i, "skillsName")}
                >
                  <option hidden>Your Skills</option>
                  {skillsData.map((item) => {
                    return (
                      <option value={item.skills_id}>{item.skills_name}</option>
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
                  Level
                </label>
                <select
                  style={{ width: "100%" }}
                  value={item.expertiseName}
                  onChange={(e) => eventHandler(e, i, "expertiseName")}
                >
                  <option hidden>Your Expertise Level</option>
                  {ExpertiseLevel.map((item) => {
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
        onClick={addAnotherSetsInArray}
      >
        Add
      </Button>
    </div>
  );
}

export default EditSkills;
