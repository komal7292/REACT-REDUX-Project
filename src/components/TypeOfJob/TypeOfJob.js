import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import EditTypeOfJobs from "../EditTypeOfJobs/EditTypeOfJobs";

function TypeOfJob() {
  let dispatch = useDispatch();
  const dataOfJobs = useSelector((state) => state.setBanner.setTypeOfJobsData);
  const data = JSON.parse(localStorage.getItem("userDetails"));
  const JobsToggle = useSelector((state) => state.setBanner.setJobsToggle);
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
    dispatch(setAllData(actionType.SET_JOBS_TOGGLE, true));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getTypeOfJobsData() {
    axios
      .get(
        `https://develop.hipoz.com/api/userprofile?user_id=${data?.admin_id}&status_enum_id=1`
      )
      .then((response) => {
        dispatch(
          setAllData(actionType.SET_TYPE_OF_JOBS_DATA, response.data.data[0])
        );
      });
  }
  useEffect(() => {
    getTypeOfJobsData();
  }, [getTypeOfJobsData]);

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
      {dataOfJobs === null ? (
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
              Type Of job2
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
                Type of Jobs not added yet.
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
              Type Of job
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {dataOfJobs.job_type_name?.map((item) => {
              return (
                <div
                  style={{
                    backgroundColor: "#7269d4",
                    width: "20%",
                    padding: "5px",
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    marginRight: "5px",
                  }}
                >
                  {item.job_type_name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        open={JobsToggle}
        onClose={JobsToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditTypeOfJobs passDataToProps={getTypeOfJobsData} />
        </Box>
      </Modal>
    </div>
  );
}
export default TypeOfJob;
