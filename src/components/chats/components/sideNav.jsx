import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/sideBar.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function SideNav(props) {
  const navigate = useNavigate();

  const deleteConversations = () => {
    props.onClick("");
  };
  const logOut = () => {
    localStorage.clear();
    checUser();
  };
  const handelTemperature = (value) => {
    props.onTemperatureChange(value);
  };
  const handleModel = (e) => {
    props.onhandleModel(e.target.value);
  };

  const checUser = () => {
    if (!localStorage.getItem("user")) {
      navigate("/auth/login");
    }
  };

  return (
    <>
      <div className="sidebar_container">
        <div className="top_part">
          <button onClick={deleteConversations}>
            <AddOutlinedIcon />
            <div className="freespace"></div>add new chat
          </button>
          <Models />
          <Temperature />
        </div>

        <div className="bottom_part">
          <ul>
            <li>
              <Popup
                trigger={
                  <li>
                    <SettingsOutlinedIcon />
                    <div className="freespace"></div>
                    Settings
                  </li>
                }
                modal
                nested
              >
                {(close) => (
                  <div className="modal">
                    <div className="content">
                      <h4>Account Information</h4>
                      <h5>Name : {localStorage.getItem("user") ? localStorage.getItem("user").split("@", 1) : "hello"}</h5>
                      <h5>email : {localStorage.getItem("user") ? localStorage.getItem("user") : "hello"} </h5>
                    </div>
                    <div className="popUpBtns">
                      <button className="logOutBtn" onClick={logOut}>
                        Log Out
                      </button>
                      <button className="closeBtn" onClick={() => close()}>
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
  function Temperature() {
    return (
      <div className="temperature">
        <div className="temperature_button" onClick={() => handelTemperature(0)}>
          <p>0 - Logical</p>
        </div>
        <div className="temperature_button" onClick={() => handelTemperature(0.5)}>
          <p>0.5 - Balanced</p>
        </div>
        <div className="temperature_button" onClick={() => handelTemperature(1)}>
          <p>1 - Creative</p>
        </div>
        <div className="temperature_discription">The temperature parameter controls the randomness of the model.0 is the most logical,1 is the most creative</div>
      </div>
    );
  }

  function Models() {
    return (
      <div className="model">
        <div className="model_heading">Model</div>
        <div className="model_selection">
          <select name="model" id="model" onChange={(e) => handleModel(e)}>
            <option value={props.selectedModel}>{props.selectedModel}</option>
            {props.model.map((data) => (
              <option key={data.id} value={data.id}>
                {data.id}
              </option>
            ))}
          </select>
        </div>
        <div className="model_selection_button" onClick={(e) => handleModel(e)}>
          <p value="text-davinci-003">Smart - Davinci</p>
        </div>
        <div className="model_selection_button">
          <p>Code - Crushman</p>
        </div>
        <div className="about_model">
          <p>The model parameter controls the engine used to generate the response. Davinci produces best results.</p>
        </div>
      </div>
    );
  }
}

export default SideNav;
