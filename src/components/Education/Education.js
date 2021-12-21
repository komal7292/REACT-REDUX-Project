import React, { useEffect } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import EditEducation from "./EditEducation";

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

function Education() {
  const educationToggle = useSelector(
    (state) => state.setBanner.setEducationToggle
  );
  let dispatch = useDispatch();
  function handleOpen() {
    dispatch(setAllData(actionType.SET_EDUCATION_TOGGLE, true));
  }
  const EducationData = useSelector(
    (state) => state.setBanner.setEducationData
  );
  console.log(EducationData, "dataEdu");
  const data = JSON.parse(localStorage.getItem("userDetails"));
  function getEducationData() {
    axios
      .get(
        `https://develop.hipoz.com/api/userprofile?user_id=${data?.admin_id}&status_enum_id=1`
      )
      .then((response) => {
        console.log("jk", response.data.data);
        dispatch(
          setAllData(actionType.SET_EDUCATION_DATA, response.data.data[0])
        );
      });
  }
  useEffect(() => {
    getEducationData();
  }, []);

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
      {EducationData.education === null ? (
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
              Education
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
                Education data not added yet.
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
              Edit Education
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {EducationData.education?.map((item) => {
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
                  {item.degree_name}
                  {item.university_name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        open={educationToggle}
        onClose={educationToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditEducation />
        </Box>
      </Modal>
    </div>
  );
}
export default Education;
