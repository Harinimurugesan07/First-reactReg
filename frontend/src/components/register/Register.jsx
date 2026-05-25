
import React, { useState } from 'react'
import "./register.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {

  const navigate = useNavigate();

  const [regData, setregData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setregData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleRegister = () => {

  //   localStorage.setItem(
  //     "regData",
  //     JSON.stringify(regData)
  //   );

  //   alert("Registration Successful");

  //   navigate("/login");
  // };

  const handleRegister =async ()=>{
    try {
      const res= await axios.post( "http://127.0.0.1:8000/register",regData)
      alert(res.data.message)
      navigate("/login")
    } catch (error) {
      console.log(error)
      alert("invalid credentials")
      
    }
  }

  return (
    <div className="form-container">

      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={regData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={regData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={regData.password}
        onChange={handleChange}
      />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  )
}

export default Register