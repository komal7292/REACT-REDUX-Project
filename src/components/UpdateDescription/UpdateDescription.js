import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";

function UpdateDescription(props) {
  let dispatch = useDispatch();
  const [desc, setDesc] = useState([]);
  useEffect(() => {
    setDesc(props.description);
  }, [props.description]);

  function submitData(e) {
    e.preventDefault();
    const descriptionData = {
      description: desc,
      actionby_id: 1098,
      user_id: 1098,
    };
    axios
      .post(
        "https://develop.hipoz.com/api/updatestudentdescription",
        descriptionData
      )
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_MODAL_TOGGLE, false));
          toast.success("successsfull");
          props.getData();
        }
      });
  }
  function closeModal() {
    dispatch(setAllData(actionType.SET_MODAL_TOGGLE, false));
    props.getData();
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <ClearIcon
        onClick={closeModal}
        style={{
          float: "right",
          marginTop: "-30px",
          marginRight: "20px",
        }}
      />
      <CheckIcon
        onClick={submitData}
        style={{ float: "right", marginTop: "-30px", marginRight: "-20px" }}
      />
      <div>
        <label style={{ marginLeft: "10px" }}>Description</label>
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
    </Box>
  );
}

export default UpdateDescription;
