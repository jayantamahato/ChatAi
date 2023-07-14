import React, { useEffect, useState } from "react";
import axios from "axios";

import SideNav from "./components/sideNav.jsx";
import Chats from "./components/chats.jsx";
import "./css/index.css";

import InputSection from "./components/inputFeild.jsx";
import EmptyChat from "./components/emptyChat.jsx";

function Chat() {
  const [messageLog, setMessageLog] = useState([]);
  const [input, setInput] = useState("");
  // const userMessage = (data) => {
  //   console.log("User Data : ", data);
  //   setMessageLog([...messageLog, data]);
  //   // setMessageLog((messageLog) => [...messageLog, data]);
  //   callApi(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userChat = [...messageLog, { user: "me", message: input }];
    setInput("");
    setMessageLog(userChat);
    e.target.reset();
    await callApi(input, userChat);
  };
  const callApi = async (userMessage, log) => {
    const data = {
      user: "me",
      message: userMessage,
    };
    try {
      const res = await axios.post("http://localhost:3001", data);
      if (res.status == 200) {
        const aiData = {
          user: "ai",
          message: res.data,
        };
        // console.log("AI: ", aiData);
        console.log(messageLog);
        await setMessageLog([...log, aiData]);
        // setMessageLog((messageLog) => [...messageLog, data]);
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
        <div className="chating_content">
          {messageLog != "" ? (
            messageLog.map((data, index) => (
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
        <div className="inputSection">
          <form onSubmit={handleSubmit}>
            <input
              name="message"
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default Chat;
