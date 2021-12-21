import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import EditLanguage from "./EditLanguage";

function Language() {
  let dispatch = useDispatch();

  const languageModal = useSelector(
    (state) => state.setBanner.setLanguageToggle
  );
  const [data, setData] = useState([]);
  function dataGet() {
    axios
      .get("https://develop.hipoz.com/api/userlanguage?user_id=1098")
      .then((resp) => {
        setData(resp.data.data);
      });
  }
  useEffect(() => {
    dataGet();
  }, []);
  function handleOpen() {
    dispatch(setAllData(actionType.SET_LANGUAGE_TOGGLE, true));
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
      <div>
        <p
          style={{
            color: "white",
            fontSize: "18px",
            paddingTop: "10px",
            marginLeft: "15px",
          }}
        >
          Basic Languages
          <EditIcon
            style={{
              float: "right",
              marginRight: "20px",
              marginTop: "4px",
            }}
            onClick={handleOpen}
          />
        </p>
      </div>
      {console.log(data, "data")}
      {data.map((item) => {
        return (
          <div
            style={{
              color: "white",
              fontSize: "18px",
              paddingTop: "10px",
              marginLeft: "15px",
              marginBottom: "5px",
            }}
          >
            <Grid container>
              <Grid
                item
                md={6}
                style={{
                  backgroundColor: "#7269d4",
                  padding: "5px",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {item.language_name}
              </Grid>
              <Grid
                item
                md={6}
                style={{
                  backgroundColor: "#7269d4",
                  padding: "5px",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {item.level_name}
              </Grid>
            </Grid>
          </div>
        );
      })}
      <Modal
        open={languageModal}
        onClose={languageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditLanguage languageData={data} />
        </Box>
      </Modal>
    </div>
  );
}
export default Language;
