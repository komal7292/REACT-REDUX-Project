import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import EditResume from "../EditResume/EditResume";

function UploadResume() {
  let dispatch = useDispatch();
  const resumeModal = useSelector((state) => state.setBanner.setResumeToggle);
  const studentData = useSelector((state) => state.setBanner.setProfileData);

  function handleOpen() {
    dispatch(setAllData(actionType.SET_RESUME_TOGGLE, true));
  }
  const style = {
    position: "relative",
    overflow: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "auto",
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
      {studentData.resume_file_name === null ? (
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
              Resume
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
                No resume uploaded yet!
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
              Edit Resume
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
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
              {studentData.resume_file_name}
            </div>
          </div>
        </div>
      )}
      <Modal
        open={resumeModal}
        onClose={resumeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditResume />
        </Box>
      </Modal>
    </div>
  );
}
export default UploadResume;
