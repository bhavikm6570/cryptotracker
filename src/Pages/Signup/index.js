import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.scss";

export default function Login() {
  const [inputValue, setInputValue] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleClick = () => {
    let response = axios
      .post("http://localhost:8000/api/v1/user/signup", inputValue)
      .then((res) => {
        if (res?.data?.success === true) {
          localStorage.setItem("token", JSON.stringify(res?.data?.payload.token));
          navigate("/dashboard");
        } else {
          alert(res?.data?.messages);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  console.log("inputValue", inputValue);

  return (
    // <div>
    //   <div>
    //     <input onChange={(e) => handleChange(e)} name="user_name" />
    //     <input onChange={(e) => handleChange(e)} name="email" />
    //     <input onChange={(e) => handleChange(e)} name="password" />

    //     <button onClick={handleClick}>Signup Submit</button>
    //   </div>
    // </div>

    <div className="login_wrapper">
      <div className="container-fluid">
        <div className="main_wrapper">
          <h5 className="login_text">Sign up</h5>
          <div className="login_input">
            <input type="text" name="user_name" onChange={(e) => handleChange(e)} placeholder="Enter username" />
          </div>
          <div className="login_input">
            <input type="text" name="email" onChange={(e) => handleChange(e)} placeholder="Enter Email" />
          </div>
          <div className="login_input">
            <input type="text" name="password" onChange={(e) => handleChange(e)} placeholder="Enter Password" />
          </div>
          <div className="login_button">
            <button onClick={handleClick}>Sign up</button>
          </div>
          <p className="already_text">
            Already User ? <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
      <div className="bottom_wave" />
    </div>
  );
}
