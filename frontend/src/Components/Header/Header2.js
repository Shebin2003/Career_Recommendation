import React from 'react'
import "./Header.css"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Header2 = () => {
    const navigate = useNavigate();
    const Previous = () => {
        navigate("/output");
    }
    const home = () => {
        async function logout(){
            const response = await axios.post("http://localhost:3001/session/end", {
                withCredentials: true, //Ensures session cookies are stored
              });
              console.log("session response : ",response.data)
        }
        logout()
        navigate("/");
    }
  return (
    <nav className="navbar">
      <div className="logo">CareerGo</div>
      <ul className="nav-links">
        <li><a onClick={home} className="register-btn">Home</a></li>
        <li><a onClick={Previous} className="register-btn">Previous Page</a></li>
      </ul>
    </nav>
  )
}

export default Header2