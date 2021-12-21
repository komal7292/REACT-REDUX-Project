import { Card, CardContent, ListSubheader, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import UpdateDescription from "../UpdateDescription/UpdateDescription";

function DescriptionPage() {
  const modalValue = useSelector((state) => state.setBanner.setModalToggle);
  function handleToggle() {
    dispatch(setAllData(actionType.SET_MODAL_TOGGLE, true));
  }
  const data = JSON.parse(localStorage.getItem("userDetails"));
  console.log("d", data);
  let dispatch = useDispatch();
  const state = useSelector((state) => state.setBanner.setDescriptionData);
  function getDescriptionData() {
    axios
      .get(
        `https://develop.hipoz.com/api/userprofile?user_id=${data?.admin_id}&status_enum_id=1`
      )
      .then((response) => {
        dispatch(
          setAllData(actionType.SET_DESCRIPTION_DATA, response.data.data[0])
        );
      });
  }

  useEffect(() => {
    getDescriptionData();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card
      className="newsfeed"
      style={{
        width: "80%",
        backgroundColor: "#1e1d2b",
        marginTop: "-200px",
        borderRadius: "20px",
        height: "200px",
        marginLeft: "-60px",
      }}
    >
      <ListSubheader
        style={{
          backgroundColor: "#1e1d2b",
          color: "white",
          fontSize: "18px",
          paddingTop: "10px",
        }}
      >
        Description{" "}
        <ModeEditOutlineIcon
          style={{ float: "right", marginTop: "12px" }}
          onClick={handleToggle}
        />
      </ListSubheader>

      <hr style={{ color: "white", margin: "10px" }} />
      <CardContent>
        <Typography
          variant="body2"
          style={{
            backgroundColor: "#1e1d2b",
            color: "#ffffff8C",
            fontSize: "16px",
            fontFamily: "Montserrat",
          }}
        >
          {state.description === null
            ? "Description not added yet"
            : state.description}
        </Typography>
      </CardContent>
      <Modal
        open={modalValue}
        onClose={modalValue}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateDescription
            description={state.description}
            getData={getDescriptionData}
          />
        </Box>
      </Modal>
    </Card>
  );
}

export default DescriptionPage;
