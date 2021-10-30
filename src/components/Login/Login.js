import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actionType } from "../redux/constant/actionType";
import { setAllData } from "../redux/action/action";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const email_id = useSelector((state) => state.setBanner.email);
  const password = useSelector((state) => state.setBanner.password);
  const userDetails = localStorage.getItem("userDetails");
  const dispatch = useDispatch();
  function submitData(e) {
    e.preventDefault();
    const userData = {
      email_id,
      password,
    };
    axios
      .post("https://develop.hipoz.com/api/commanloginuser", userData)
      .then((response) => {
        dispatch(setAllData(actionType.USER_DATA, response.data));
        if (userData.email_id === "" && userData.password === "") {
          toast.warn("Fill the input fields");
        } else if (response.data.statuscode === 422) {
          toast.error("Please fill correct data!");
        } else {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.data[0])
          );
          history.push("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function showData(e) {
    e.preventDefault();
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
    console.log(showPassword);
  }

  return (
    <div>
      <div className="login1">
        <form className="login_form" onSubmit={submitData}>
          <h1 style={{ color: "white" }}>Login Here</h1>
          <input
            type="email"
            placeholder="Type your email"
            onChange={(e) =>
              dispatch(setAllData(actionType.SET_EMAIL, e.target.value))
            }
          />
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Type your password"
              onChange={(e) =>
                dispatch(setAllData(actionType.SET_PASSWORD, e.target.value))
              }
            />
            <i onClick={showData}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </i>
          </div>

          <br />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
