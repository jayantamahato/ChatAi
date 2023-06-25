import React from "react";
// import { Person, ThreeDRotation } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

import "./css/chatheader.css";
function ChatHeader(chat) {
  return (
    <div className="chat-header-container">
      {console.log(chat)}
      <div className="chatContet">
        <div className="userDetails">
          <div className="usericon">
            <PersonIcon />
          </div>
          <h4>Name</h4>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
