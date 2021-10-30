import React from "react";
import "./Favorites.css";
import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { useSelector } from "react-redux";

function Favorites() {
  const addData = useSelector(
    (state) => state.setBanner.setFavoriteCompanyData
  );

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
        Favorite Jobs
      </ListSubheader>
      <hr style={{ color: "white", marginRight: "18px", marginLeft: "18px" }} />
      {addData.map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListItem style={{ color: "white" }}>
              <ListItemText primary={sectionId.company_name} />
            </ListItem>
            <ListItemText
              primary={sectionId.country_name}
              style={{ paddingLeft: "19px", color: "white" }}
            />
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
    </List>
  );
}

export default Favorites;
