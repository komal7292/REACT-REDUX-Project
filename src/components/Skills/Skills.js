import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import EditSkills from "./EditSkills";

function Skills() {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.setBanner.setSkillsData);
  console.log("state", state);
  const SkillsToggle = useSelector((state) => state.setBanner.setSkillsToggle);
  function getSkillsData() {
    axios
      .get("https://develop.hipoz.com/api/userskills?user_id=1098")
      .then((res) => {
        dispatch(setAllData(actionType.SET_SKILLS_DATA, res.data.data));
      });
  }
  useEffect(() => {
    getSkillsData();
  }, []);
  function handleOpen() {
    dispatch(setAllData(actionType.SET_SKILLS_TOGGLE, true));
  }
  const style = {
    position: "relative",
    overflow: "scroll",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "100% vcds",
    bgcolor: "#292937",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div
      style={{
        width: "80%",
        height: "100px auto",
        marginLeft: "70px",
        marginTop: "-198px",
        backgroundColor: "#1e1d2b",
        borderRadius: "20px",
      }}
    >
      {state === null ? (
        <div>
          <div
            style={{
              color: "white",
              fontSize: "18px",
              paddingTop: "10px",
              marginLeft: "15px",
            }}
          >
            <p>
              Skills
              <AddIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            <div>
              <p style={{ padding: "50px", textAlign: "center" }}>
                Scholarship data not added yet.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              color: "white",
              fontSize: "18px",
              paddingTop: "10px",
              marginLeft: "15px",
            }}
          >
            <p>
              EditSkill
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {state.map((item) => {
              return (
                <div
                  style={{
                    backgroundColor: "#7269d4",
                    width: "auto",
                    padding: "5px",
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    marginRight: "5px",
                  }}
                >
                  {item.skills_name}
                  {item.expertise_level_name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        open={SkillsToggle}
        onClose={SkillsToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditSkills data={getSkillsData} state={state} />
        </Box>
      </Modal>
    </div>
  );
}

export default Skills;
