import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import EditInterestedWork from "../EditInterestedWork/EditInterestedWork";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";

function Interested() {
  let dispatch = useDispatch();
  const studentData = useSelector((state) => state.setBanner.setProfileData);
  const modalToggle = useSelector(
    (state) => state.setBanner.setInterestedToggle
  );
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
  function handleOpen() {
    dispatch(setAllData(actionType.SET_INTERESTED_WORK_TOGGLE, true));
  }
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
      {studentData.interested_work === null ? (
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
              Interested
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
                Interested data not added yet.
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
              Interested Work
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {studentData.interested_work?.map((item) => {
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
                  {item.interested_Work_name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        open={modalToggle}
        onClose={modalToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditInterestedWork passDataToProps={studentData} />
        </Box>
      </Modal>
    </div>
  );
}
export default Interested;
