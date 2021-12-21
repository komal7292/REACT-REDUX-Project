import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import EditScholarship from "./EditScholarship";

function Scholarship() {
  let dispatch = useDispatch();
  const scholarshipData = useSelector(
    (state) => state.setBanner.setScholarshipData
  );
  const scholarShipToggle = useSelector(
    (state) => state.setBanner.setScholarshipToggle
  );
  function studentScholarship() {
    axios
      .get("https://develop.hipoz.com/api/userschlorship?user_id=1098")
      .then((result) => {
        dispatch(setAllData(actionType.SET_SCHOLARSHIP_DATA, result.data.data));
        console.log("jkl", result.data.data);
      });
  }
  useEffect(() => {
    studentScholarship();
  }, []);
  function handleOpen() {
    dispatch(setAllData(actionType.SET_SCHOLARSHIP_TOGGLE, true));
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
      {scholarshipData === null ? (
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
              Scholarship
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
              Scholarship
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {console.log("check", scholarshipData)}
            {scholarshipData.map((items) => {
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
                  {items.schlorship_type_name}
                  {items.schlorship_name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        open={scholarShipToggle}
        onClose={scholarShipToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditScholarship
            secondData={studentScholarship}
            state={scholarshipData}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Scholarship;
