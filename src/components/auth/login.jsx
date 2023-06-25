import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { auth } from "../../firebase/fireBaseConfig";
import "./css/index.css";
import { signInWithEmailAndPassword } from "firebase/auth";
function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/chat");
    }
  }, []);
  const [authConfig, setAuthConfig] = useState();
  const handleChange = (e) => {
    setAuthConfig({ ...authConfig, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(authConfig);
    login();
  };
  const login = async () => {
    toast.warning("Please Wait...", { theme: "colored" });
    try {
      const result = await signInWithEmailAndPassword(auth, authConfig.user, authConfig.password);
      if (result.user.email) {
        console.log(result.user.email);
        localStorage.setItem("user", result.user.email);
        toast.success("Loged In !", { autoClose: 600, theme: "colored", onClose: () => navigate("/chat") });
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/user-not-found).") toast.error("User Not Found !");
      if (error.message === "Firebase: Error (auth/wrong-password).") toast.error("Check password !");
    }
  };

  return (
    <>
      <div className="Login-container">
        <div className="loginBox">
          <div className="heading">Login</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user"> User Name</label>
            <input name="user" type="text" onChange={handleChange} />

            <label htmlFor="password"> Paassword</label>
            <input name="password" type="password" onChange={handleChange} />
            <div className="submitButton">
              <button>login</button>
            </div>
          </form>
          <div className="signuplink">
            <a href="/auth/signup">Signup</a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
