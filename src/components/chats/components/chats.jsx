import React, { useEffect, useState } from "react";
import "./css/chats.css";
import EmptyChat from "./emptyChat";

function Chats(props) {
  return (
    <div className="chating_content">
      {props.data != "" ? (
        props.data.map((data, index) => (
          <div key={index} className="chatMessage">
            <div className="avatar">{data.user === "ai" ? <div className="ai-icon"></div> : <div className="client-icon"></div>}</div>
            <div className="message">
              <p>{data.message}</p>
            </div>
          </div>
        ))
      ) : (
        <EmptyChat />
      )}
    </div>
  );
}

export default Chats;
