import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { Box } from "@mui/system";
import { Button, Modal } from "@mui/material";
import EditExpectedSalary from "./EditExpectedSalary";
function ExpectedSalary() {
  let dispatch = useDispatch();
  const [seeAllData, setSeeAllData] = useState(true);
  const state = useSelector((state) => state.setBanner.setSalaryToggle);
  const expectedSalary = useSelector((state) => state.setBanner.setSalaryData);
  function getExpectedSalaryData() {
    axios
      .get("https://develop.hipoz.com/api/usersalary?user_id=1098")
      .then((res) => {
        dispatch(setAllData(actionType.SET_SALARY_DATA, res.data.data));
      });
  }
  useEffect(() => {
    getExpectedSalaryData();
  }, []);
  function handleOpen() {
    dispatch(setAllData(actionType.SET_SALARY_TOGGLE, true));
  }
  function showAllData() {
    setSeeAllData(!seeAllData);
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
      {expectedSalary === null ? (
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
              Expected Salary Per Month
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
                Salary data not added yet.
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
              Expected Salary Per Month
              <EditIcon
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "4px",
                }}
                onClick={handleOpen}
              />
            </p>
            {seeAllData
              ? expectedSalary.slice(0, 2).map((item, i) => {
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
                      {item.salary}
                      {item.salary_level_name}
                    </div>
                  );
                })
              : expectedSalary.map((item, i) => {
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
                      {item.salary}
                      {item.salary_level_name}
                    </div>
                  );
                })}
          </div>
          <Button onClick={showAllData}>See All</Button>
        </div>
      )}
      <Modal
        open={state}
        onClose={state}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditExpectedSalary
            data={expectedSalary}
            propsData={getExpectedSalaryData}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default ExpectedSalary;
