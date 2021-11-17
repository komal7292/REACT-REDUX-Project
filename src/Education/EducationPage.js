import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAllData } from "../components/redux/action/action";
import { actionType } from "../components/redux/constant/actionType";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateEducation from "../components/UpdateEducation/UpdateEducation";

const style = {
  position: "relative",
  overflow: "auto",
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

function EducationPage() {
  const educationToggle = useSelector(
    (state) => state.setBanner.setEducationToggle
  );
  function handleOpen() {
    dispatch(setAllData(actionType.SET_EDUCATION_TOGGLE, true));
  }

  const data = JSON.parse(localStorage.getItem("userDetails"));
  let dispatch = useDispatch();
  const state = useSelector((state) => state.setBanner.setEducationData);
  function educationDataGet() {
    axios
      .get(
        `https://develop.hipoz.com/api/userprofile?user_id=${data?.admin_id}&status_enum_id=1`
      )
      .then((response) => {
        dispatch(
          setAllData(
            actionType.SET_EDUCATION_DATA,
            response.data.data[0].education[0]
          )
        );
      });
  }
  useEffect(() => {
    educationDataGet();
  }, []);
  return (
    <div
      style={{
        width: "80%",
        height: "250px",
        marginLeft: "70px",
        marginTop: "-198px",
        backgroundColor: "#1e1d2b",
        borderRadius: "20px",
      }}
    >
      {state?.education === null ? (
        "Education not added yet"
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
              Education
              <ModeEditOutlineIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
          </div>
          =21
          <div
            style={{
              width: "40%",
              height: "120px",
              marginLeft: "15px",
              backgroundColor: "#292937",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "white", fontSize: "12px" }}>
              <CastForEducationIcon
                style={{
                  backgroundColor: "#fff",
                  marginRight: "7px",
                  color: "blue",
                  marginLeft: "10px",
                  marginTop: "35px",
                  fontSize: "50px",
                  padding: "6px",
                  borderRadius: "10px",
                }}
              />
              {state?.degree_name}
              <div
                style={{
                  marginLeft: "65px",
                  marginTop: "-30px",
                  color: "#B9B9B9",
                  fontSize: "11px",
                }}
              >
                {state?.university_name}
              </div>
            </div>
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
          <UpdateEducation
            educationData={educationDataGet}
            educationStudentData={state}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default EducationPage;
