import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleClick = () => {
    axios
      .post("https://ff17-2405-201-200d-1c68-6887-c6e4-cfb-fa60.ngrok-free.app/api/v1/user/login", inputValue)
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
    //     <input onChange={(e) => handleChange(e)} name="email" />
    //     <input onChange={(e) => handleChange(e)} name="password" />
    //     <button onClick={handleClick}>Login Submit</button>
    //   </div>
    // </div>
    <div className="login_wrapper">
      <div className="container-fluid">
        <div className="main_wrapper">
          <h5 className="login_text">Login</h5>
          <div className="login_input">
            <input type="text" name="email" onChange={(e) => handleChange(e)} placeholder="Enter Email" />
          </div>
          <div className="login_input">
            <input type="text" name="password" onChange={(e) => handleChange(e)} placeholder="Enter Password" />
          </div>
          <div className="login_button">
            <button onClick={handleClick}>Login</button>
          </div>
          <p className="already_text">
            Already User ? <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </div>
      </div>
      <div className="bottom_wave" />
    </div>
  );
}
