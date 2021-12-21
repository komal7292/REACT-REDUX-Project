import axios from "axios";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { setAllData } from "../redux/action/action";
import { actionType } from "../redux/constant/actionType";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

function EditResume() {
  const resumeData = useSelector((state) => state.setBanner.setTypeOfJobsData);
  let dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState([]);
  function handleFile(e) {
    setSelectFile(e.target.files[0]);
  }
  const uploadFile = async () => {
    let fileName,
      uniqueFileName = "";
    const formData = new FormData();
    formData.append("file", selectFile);
    await fileUploading(formData)
      .then((res) => {
        fileName = res.data.data[0].file_name;
        uniqueFileName = res.data.data[0].unique_file_name;
        dataSubmit(fileName, uniqueFileName, "add");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fileUploading = (param) => {
    return new Promise((resolve, reject) => {
      axios
        .post("https://develop.hipoz.com/api/fileupload", param, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("upload", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("Error from file uploading", err);
          reject(err);
        });
    });
  };
  const dataSubmit = (fileName, uniqueFileName) => {
    const param = {
      upload_resume_file_path: uniqueFileName,
      resume_file_name: fileName,
      actionby_id: 1098,
      user_id: 1098,
    };
    axios
      .post("https://develop.hipoz.com/api/updateresume", param)
      .then((res) => {
        console.log("ko", res);
        dispatch(setAllData(actionType.SET_RESUME_TOGGLE, false));
        toast.success("successsfull");
      })
      .catch((err) => {
        console.log("Error from submit data", err);
      });
  };
  function removeData() {
    dataSubmit(null, null);
  }

  return (
    <div>
      {resumeData.resume_file_name ? (
        <div>
          <p style={{ color: "white" }}>Delete Data</p>
          <DeleteIcon
            style={{
              float: "right",
              marginTop: "-40px",
              marginRight: "-20px",
              color: "white",
            }}
            onClick={removeData}
          />
          <div
            style={{
              width: "100%",
              border: "2px solid white",
              padding: "10px",
              margin: "10px",
            }}
          >
            <div style={{ color: "white" }}>{resumeData.resume_file_name}</div>
          </div>
        </div>
      ) : (
        <>
          <CheckIcon
            onClick={uploadFile}
            style={{
              float: "right",
              marginTop: "-30px",
              marginRight: "-20px",
              color: "white",
            }}
          />
          <p style={{ color: "white" }}>Edit Resume</p>
          <input
            type="file"
            name="img"
            onChange={(e) => handleFile(e)}
            style={{ color: "white" }}
          />
        </>
      )}
    </div>
  );
}
export default EditResume;
