import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/fireBaseConfig.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "./css/index.css";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/chat");
    }
  }, []);
  const [userDetails, setUserDetails] = useState([]);
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails.con_password !== userDetails.password) {
      createUser();
    } else {
      toast.warning("Check Password ", { theme: "colored", autoClose: 1500 });
    }
  };
  //
  const createUser = async () => {
    toast.warning("creating...", { theme: "colored" });
    try {
      const result = await createUserWithEmailAndPassword(auth, userDetails.user, userDetails.password);
      if (result.user.email) {
        console.log(result.user.email);
        localStorage.setItem("user", result.user.email);
        toast.success("Account Created !", { autoClose: 1000, theme: "colored", onClose: () => navigate("/chat") });
      } else {
        toast.error("Try Again !");
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") toast.error("Invalid email !", { theme: "colored" });
      if (error.message === "Firebase: Error (auth/email-already-in-use).") toast.error(" Used email !", { theme: "colored" });
      if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") toast.error(" Password should be at least 6 characters !", { theme: "colored" });
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="Login-container">
        <div className="loginBox">
          <div className="heading">Signup</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user"> User Name</label>
            <input name="user" type="text" onChange={(e) => handleChange(e)} required />

            <label htmlFor="password"> Paassword</label>
            <input name="password" type="password" onChange={(e) => handleChange(e)} required />

            <label htmlFor="con_password"> Confirm Paassword</label>
            <input name="con-password" type="password" onChange={(e) => handleChange(e)} required />

            <div className="submitButton">
              <button type="submit">SignUp</button>
            </div>
          </form>
          <div className="signuplink">
            <a href="/auth/login">SignIn</a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
