import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { actionType } from "../redux/constant/actionType";
import { setAllData } from "../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
function EditLanguage(props) {
  let dispatch = useDispatch();
  let languageField = {
    languageId: "",
    basicLevelId: "",
    userLanguageId: 0,
  };

  const [languageArray, setLanguageArray] = useState([{ ...languageField }]);
  const [LanguageData, setLanguageData] = useState([]);
  const [basicLevel, setBasicLevel] = useState([]);

  function dataGet() {
    axios
      .get(
        "https://develop.hipoz.com/api/getlanguage?language_id=0&status_enum_id=1"
      )
      .then((response) => {
        setLanguageData(response.data.data);
      });
  }
  const addAnotherData = () => {
    let lastElement = languageArray[languageArray.length - 1];
    if (!lastElement.languageId && !lastElement.basicLevelId) {
      alert("firstly fill this set");
    } else {
      let array = [...languageArray];
      array.push(languageField);
      setLanguageArray([...array]);
    }
  };
  useEffect(() => {
    let array = [];
    if (props.languageData && props.languageData !== 0) {
      // eslint-disable-next-line array-callback-return
      props.languageData.map((item) => {
        let initialObject = { ...languageField };
        initialObject.languageId = item.language_enum_id;
        initialObject.basicLevelId = item.language_level_enum_id;
        initialObject.userLanguageId = item.user_language_id;
        array.push(initialObject);
      });
      setLanguageArray([...array]);
    }
  }, []);
  const handleLanguageChange = (e, index, type) => {
    let array = [...languageArray];
    array[index][type] = e.target.value;
    setLanguageArray([...array]);
  };
  function removedOtherSet(i) {
    let array = [...languageArray];
    array.splice(i, 1);
    setLanguageArray(array);
  }
  useEffect(() => {
    dataGet();
  }, []);

  function levelData() {
    axios
      .get(
        "https://develop.hipoz.com/api/expertiselevel?enum_id=0&enum_type_name=Expertise%20level"
      )
      .then((response) => {
        setBasicLevel(response.data?.data);
      });
  }
  useEffect(() => {
    levelData();
  }, []);
  function postLanguageData(e) {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      let userJson = [];
      var result = {};
      for (let i = 0; i < languageArray.length; i++) {
        const temp = {
          user_language_id: languageArray[i].userLanguageId,
          language_enum_id: languageArray[i].languageId,
          language_level_enum_id: languageArray[i].basicLevelId,
          status_enum_id: 1,
        };
        userJson.push(temp);
      }
      console.log(userJson);
      // eslint-disable-next-line no-unused-vars
      result = {
        user_id: 1098,
        user_language_json: userJson,
        actionby_id: 1098,
      };
    }

    axios
      .post("https://develop.hipoz.com/api/updatestudentlanguage", result)
      .then((res) => {
        if (res.data.statuscode === 200) {
          dispatch(setAllData(actionType.SET_LANGUAGE_TOGGLE, false));
          props.languageData();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function closeModal() {
    dispatch(setAllData(actionType.SET_LANGUAGE_TOGGLE, false));
  }
  return (
    <>
      <p
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "-30px",
          marginBottom: "30px",
        }}
      >
        Edit Language
      </p>

      <CheckIcon
        onClick={postLanguageData}
        style={{
          float: "right",
          color: "white",
          marginTop: "-50px",
        }}
      />
      <ClearIcon
        onClick={closeModal}
        style={{
          color: "white",
          marginLeft: "880px",
          marginTop: "-100px",
        }}
      />
      {languageArray.map((item, index) => {
        return (
          <>
            <Grid container>
              <Grid
                item
                md={6}
                style={{
                  padding: "5px",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label
                  style={{
                    color: "white",
                    marginTop: "-90px",
                  }}
                >
                  Language
                </label>
                <br />
                <select
                  value={item.languageId}
                  onChange={(e) => handleLanguageChange(e, index, "languageId")}
                  style={{ marginRight: "80px", marginLeft: "-80px" }}
                >
                  <option hidden>Your Language</option>
                  {LanguageData.map((item) => {
                    return (
                      <option value={item.language_id}>
                        {item.language_name}
                      </option>
                    );
                  })}
                </select>
              </Grid>
              <Grid
                item
                md={6}
                style={{
                  padding: "5px",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label
                  style={{
                    color: "white",
                    marginTop: "-90px",
                  }}
                >
                  Basic
                </label>
                <select
                  value={item.basicLevelId}
                  onChange={(e) =>
                    handleLanguageChange(e, index, "basicLevelId")
                  }
                >
                  <option hidden>Your Basic Language</option>
                  {basicLevel.map((item) => {
                    return (
                      <option value={item.enum_id}>{item.enum_display}</option>
                    );
                  })}
                </select>
              </Grid>
            </Grid>
            {index !== 0 ? (
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  color: "red",
                  borderColor: "red",
                  backgroundColor: "#1e1d2b",
                  border: "1px dashed white",
                }}
                onClick={(e) => removedOtherSet(index)}
              >
                Remove this set
              </Button>
            ) : null}
            <hr style={{ color: "white" }} />;
          </>
        );
      })}
      <div>
        <Button
          style={{
            width: "100%",
            color: "#FFFFFF8C",
            backgroundColor: "#1e1d2b",
            border: "1px dashed white",
          }}
          onClick={addAnotherData}
        >
          add
        </Button>
      </div>
    </>
  );
}

export default EditLanguage;
