import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Button, Modal } from "@mui/material";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import EditExpereince from "./EditExpereince";
function Experience() {
  let dispatch = useDispatch();
  const expereinceData = useSelector(
    (state) => state.setBanner.setExpereinceData
  );
  const experienceToggle = useSelector(
    (state) => state.setBanner.setExpereinceToggle
  );
  function getExpereinceData() {
    axios
      .get("https://develop.hipoz.com/api/userworkexperince?user_id=1098")
      .then((resp) => {
        console.log("resp", resp.data);
        dispatch(setAllData(actionType.SET_EXPERIENCE_DATA, resp.data.data));
      });
  }
  useEffect(() => {
    getExpereinceData();
  }, []);
  function handleOpen() {
    dispatch(setAllData(actionType.SET_EXPERIENCE_TOGGLE, true));
  }
  const style = {
    position: "relative",
    overflow: "scroll",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "100%",
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
      {expereinceData === null ? (
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
              Experience
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
                Experience data not added yet.
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
              Edit Expereince
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {expereinceData.map((item) => {
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
                  {item.company_name}
                  {item.start_work_on_year}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        open={experienceToggle}
        onClose={experienceToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditExpereince propsData={expereinceData} />
        </Box>
      </Modal>
    </div>
  );
}

export default Experience;
