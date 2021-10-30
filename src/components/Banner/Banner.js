import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { actionType } from "../redux/constant/actionType";
import { setAllData } from "../redux/action/action";
import "./Banner.css";
function Banner() {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.setBanner.setBannerData);
  console.log("hellok", state);

  const getBannerData = () => {
    axios
      .get(
        "https://develop.hipoz.com/api/getbanners?banner_id=0&role_enum_id=149&status_enum_id=1"
      )
      .then((response) => {
        dispatch(setAllData(actionType.SET_BANNER, response.data.data[0]));
      });
  };
  useEffect(() => {
    getBannerData();
  }, []);

  return (
    <div>
      <a href={state.banner_url} target="_blank">
        <img
          className="banner_image"
          src={state.banner_unique_singedurl_name}
          alt={state.banner_type_name}
        />
      </a>
    </div>
  );
}

export default Banner;
