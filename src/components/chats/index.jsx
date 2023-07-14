import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import SideNav from "./components/sideNav.jsx";
import Chats from "./components/chats.jsx";
import "./css/index.css";

import InputSection from "./components/inputFeild.jsx";

function Chat() {
  const [messageLog, setMessageLog] = useState([]);
  const [temperature, setTemperature] = useState(0.5);
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState("text-davinci-003");

  const userMessage = (data) => {
    let userChat = [...messageLog, data];
    setMessageLog(userChat);
    callApi(data, userChat);
  };

  const callApi = async (data, userChat) => {
    data.temperature = temperature;
    data.model = selectedModel;
    try {
      const res = await axios.post("http://localhost:3001", data);
      if (res.status === 200) {
        const aiData = {
          user: "ai",
          message: res.data,
          temperature: temperature,
          model: "test",
        };
        setMessageLog([...userChat, aiData]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getModels = async () => {
    try {
      const res = await axios.get("http://localhost:3001/models");
      setModel(res.data);
    } catch (error) {
      console.log("Error while calling calling Models...", error);
      toast.error(error.message);
    }
  };

  const clearMessage = () => {
    setMessageLog([]);
  };
  const temperatureHandle = (data) => {
    setTemperature(data);
  };
  const handleModel = (data) => {
    setSelectedModel(data);
  };
  useState(() => {
    getModels();
  }, []);
  return (
    <div className="chat-container">
      <div className="left">
        <SideNav onClick={clearMessage} onTemperatureChange={temperatureHandle} model={model} onhandleModel={handleModel} selectedModel={selectedModel} />
      </div>
      <div className="right">
        <Chats data={messageLog} />
        <InputSection onSubmit={userMessage} />
      </div>
      <div className="bottom"></div>
      <ToastContainer />
    </div>
  );
}

export default Chat;
