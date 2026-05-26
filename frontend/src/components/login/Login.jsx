import React, { useState } from 'react'
import "../register/register.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "https://reg-firstreact-2.onrender.com",
        // "http://127.0.0.1:8000/login" ,
        logindata
      );

      alert(res.data.message);
      if (res.data.message === "Login Successful"){
        navigate("/users")
      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };

  return (
    <div>

      <div className="form-container">

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={logindata.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={logindata.password}
          onChange={handleChange}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  )
}

export default Login