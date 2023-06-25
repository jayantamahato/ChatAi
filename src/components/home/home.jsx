import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/index.css";
function Home() {
  const navigation = useNavigate();
  function navigateFun() {
    navigation("/auth/login");
  }
  useEffect(() => {
    setTimeout(navigateFun, 3000);
  });
  return (
    <>
      <div className="home-container">
        <h2>Welcome To Chat Application </h2>
        <p> Developed by - Jayanta & Dip</p>
      </div>
    </>
  );
}

export default Home;
