import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem } from "@mui/material";

function GetStudentLoginData() {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const data = JSON.parse(localStorage.getItem("userDetails"));
  async function getData() {
    await axios
      .get(
        `https://develop.hipoz.com/api/userprofile?user_id=${data?.admin_id}&status_enum_id=1`
      )
      .then((response) => {
        setName(response.data.data[0]);
        setUniversity(response.data.data[0].education[0]);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <List
      className="container"
      sx={{
        marginLeft: "120px",
        width: "80%",
        maxWidth: 360,
        backgroundColor: "#1e1d2b",
        position: "relative",
        overflow: "auto",
        marginTop: "-200px",
        borderRadius: "20px",
        height: "200px",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
        alt="Circle-icons-profile"
        style={{
          height: "60px",
          width: "60px",
          marginLeft: "120px",
          marginTop: "-8px",
        }}
      />
      <ListItem
        style={{
          color: "white",
          paddingLeft: "100px",
          paddingTop: "70px",
          fontSize: "23px",
          fontWeight: "800px",
          textTransform: " capitalize",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "15px",
            marginTop: "-50px",
            marginLeft: "10px",
          }}
        >
          {name?.user_name}
          <div
            style={{
              color: "#B9B9B9",
              fontSize: "12px",
              marginLeft: "-40px",
              marginTop: "10px",
            }}
          >
            {university?.university_name}
          </div>
        </div>
      </ListItem>
    </List>
  );
}

export default GetStudentLoginData;
