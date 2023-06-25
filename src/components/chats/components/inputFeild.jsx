import React, { useState } from "react";
import "./css/inputSection.css";
function InputSection(props) {
  const [message, setMessage] = useState([]);
  const handleChange = (e) => {
    setMessage({ ...message, user: "me", [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onChange(message);
    e.target.reset();
  };

  return (
    <div className="inputSection">
      <form onSubmit={handleSubmit}>
        <input name="message" type="text" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputSection;
