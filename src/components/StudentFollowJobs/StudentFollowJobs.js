import React, { useState, useEffect } from "react";
import "./StudentFollowJobs.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Button } from "@mui/material";
function StudentFollowJobs() {
  const [openButton, setOpenButton] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.setBanner.setLikesData);
  const favCompany = useSelector(
    (state) => state.setBanner.setFavoriteCompanyData
  );
  console.log(data);
  function getLikesPost() {
    axios
      .get("https://develop.hipoz.com/api/getcompany?company_id=0&user_id=1001")
      .then((response) => {
        console.log(response.data);
        dispatch(setAllData(actionType.SET_LIKES, response.data.data));
      });
  }
  useEffect(() => {
    getLikesPost();
  }, []);
  function showAllDataList() {
    setOpenButton(false);
  }
  function followCompany(i) {
    let companyArray = [...data];
    let favArray = [...favCompany];
    favArray.push(companyArray[i]);
    dispatch(setAllData(actionType.SET_FAVORITE_COMPANY, favArray));
    companyArray.splice(i, 1);
    dispatch(setAllData(actionType.SET_LIKES, companyArray));
  }
  return (
    <List
      className="container"
      sx={{
        marginLeft: "-60px",
        width: "80%",
        maxWidth: 360,
        backgroundColor: "#1e1d2b",
        position: "relative",
        overflow: "auto",
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <ListSubheader
        style={{
          backgroundColor: "#1e1d2b",
          color: "white",
          fontSize: "18px",
          paddingTop: "10px",
        }}
      >
        You may like
      </ListSubheader>
      <hr
        style={{
          color: "white",
          marginRight: "18px",
          marginLeft: "18px",
        }}
      />
      <Button
        style={{ float: "right", color: "white" }}
        onClick={showAllDataList}
      >
        All
      </Button>
      {openButton ? (
        <>
          {data.slice(0, 5).map((sectionId, i) => (
            <li key={`section-${sectionId}`}>
              <ul>
                <ListItem style={{ color: "white" }}>
                  <ListItemText primary={sectionId.company_name} />
                </ListItem>
                <ListItemText
                  primary={sectionId.country_name}
                  style={{ paddingLeft: "19px", color: "white" }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    followCompany(i);
                  }}
                  style={{ marginLeft: "200px", borderRadius: "20px" }}
                >
                  Follow
                </Button>
                <hr
                  style={{
                    backgroundColor: "white",
                    marginRight: "18px",
                    marginLeft: "18px",
                  }}
                />
              </ul>
            </li>
          ))}
        </>
      ) : (
        <>
          {data.map((sectionId, i) => (
            <li key={`section-${sectionId}`}>
              <ul>
                <ListItem style={{ color: "white" }}>
                  <ListItemText primary={sectionId.company_name} />
                </ListItem>
                <ListItemText
                  primary={sectionId.country_name}
                  style={{ paddingLeft: "19px", color: "white" }}
                />
                <Button
                  variant="contained"
                  color="success"
                  style={{ float: "right", borderRadius: "20px" }}
                  onClick={() => {
                    followCompany(i);
                  }}
                >
                  Follow
                </Button>
              </ul>
            </li>
          ))}
        </>
      )}
    </List>
  );
}

export default StudentFollowJobs;
