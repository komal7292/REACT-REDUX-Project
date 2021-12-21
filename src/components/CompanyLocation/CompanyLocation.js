import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import EditCompanyLocation from "../EditCompanyLocation/EditCompanyLocation";

function CompanyLocation() {
  let dispatch = useDispatch();
  const modalToggle = useSelector(
    (state) => state.setBanner.setCompanyLocationToggle
  );
  const studentData = useSelector((state) => state.setBanner.setProfileData);
  console.log("country", studentData);
  function handleOpen() {
    dispatch(setAllData(actionType.SET_COMPANY_LOCATION_TOGGLE, true));
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
      {studentData.pref_country_name === null ? (
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
              Company Location
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
                Company Location data not added yet.
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
              Company Location
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {studentData.pref_country_name?.map((item) => {
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
                  {item.country_name}
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
          <EditCompanyLocation />
        </Box>
      </Modal>
    </div>
  );
}
export default CompanyLocation;
