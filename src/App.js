import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login";
import Home from "./components/home/home";
import Background from "./background";

import "./App.css";
import Signup from "./components/auth/signup";
import Chat from "./components/chats";

function App() {
  return (
    <div className="App">
      <Background />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth/login" exact element={<Login />} />
          <Route path="/auth/signup" exact element={<Signup />} />
          <Route path="/chat" exact element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
