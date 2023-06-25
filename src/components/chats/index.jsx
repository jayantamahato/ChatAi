import React, { useState } from "react";
import axios from "axios";

import SideNav from "./components/sideNav.jsx";
import Chats from "./components/chats.jsx";
import "./css/index.css";

import InputSection from "./components/inputFeild.jsx";

function Chat() {
  const [messageLog, setMessageLog] = useState([]);

  const userMessage = (data) => {
    console.log("User Data : ", data);
    setMessageLog([...messageLog, data]);
    callApi(data);
  };

  const callApi = async (data) => {
    try {
      const res = await axios.post("http://localhost:3001", data);
      if (res.status == 200) {
        const aiData = {
          user: "ai",
          message: res.data,
        };
        // console.log("AI: ", aiData);
        console.log(messageLog);
        setMessageLog([...messageLog, aiData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearMessage = () => {
    setMessageLog([]);
  };
  return (
    <div className="chat-container">
      <div className="left">
        <SideNav onClick={clearMessage} />
      </div>
      <div className="right">
        <Chats data={messageLog} />
        <InputSection onChange={userMessage} />
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default Chat;
