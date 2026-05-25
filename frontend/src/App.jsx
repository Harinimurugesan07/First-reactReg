import React from 'react'
import Register from './components/register/Register'
import Login from "./components/login/Login"
import Users from "./components/users/Users"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const App = () => {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
    <Route path="/login" element={<Login/>}/>
    <Route path='/users' element={<Users/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
