import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./css/sideBar.css";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function SideNav(props) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("print");
    checUser();
  }, []);

  var recentData = ["data1", "data2", "data3"];
  const deleteConversations = () => {
    props.onClick("");
  };
  const logOut = () => {
    localStorage.clear();
    checUser();
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
          <button>
            <AddOutlinedIcon />
            <div className="freespace"></div>add new chat
          </button>
          <div className="recent_chats">
            {recentData.map((msg, index) => (
              <RecentChat key={index} msg={msg} />
            ))}
          </div>
        </div>

        <div className="bottom_part">
          <ul>
            <li onClick={deleteConversations}>
              <DeleteOutlineOutlinedIcon />
              <div className="freespace"></div>
              Delete all conversation
            </li>

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
}

export default SideNav;
function RecentChat(data) {
  return (
    <div className="recent_chat">
      <ChatBubbleOutlineOutlinedIcon />
      <div className="freespace"></div>
      {data.msg}
    </div>
  );
}
