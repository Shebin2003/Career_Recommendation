import React, { useState, useEffect } from 'react';
import "./Header.css"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);

    useEffect(() => {
      async function sessionCheck (){
        try {
          const sessionCheck = await axios.get("http://localhost:3001/session/details", {
            withCredentials: true, // Ensures cookies are sent & received
          });
          console.log("hello",sessionCheck.data.user.name)
          setOptions(['logout','myaccount']);
          

        } catch (error) {
          setOptions(['login', 'register']);
          
        }
      }
      sessionCheck()
    }, []); // Empty dependency array to run effect only once on component mount
    
    const home = () => {
        async function logout(){
            const response = await axios.post("http://localhost:3001/session/end", {
                withCredentials: true, //Ensures session cookies are stored
              });
              console.log("session response : ",response.data)
              setOptions(['login', 'register']);
        }
        logout()
        navigate("/");
    }
    const handleOptionChange = async (event) => {
      const selectedOption = event.target.value;
    
      if (selectedOption === "login") {
        navigate("/login");
      } else if (selectedOption === "register") {
        navigate("/register");
        window.location.reload(false);
      } else if (selectedOption === "logout") {
        try {
          await axios.post("http://localhost:3001/session/end", {}, {
            withCredentials: true,
          });
          setOptions([ "login", "register"]);
          navigate("/");
          window.location.reload(); // Refresh the page to re-trigger session check
        } catch (error) {
          console.error("Logout error:", error);
        }
      }
      else if(selectedOption === "myaccount"){
        navigate('/myaccount')
      }
    };

  return (
    <nav className="navbar">
      <div className="logo">CareerGo</div>
      <ul className="nav-links">
        <li><a onClick={home} className="register-btn">Home</a></li>
        <select className='account-dropdown' defaultValue="Account" onChange={handleOptionChange}>
                    <option  value="Account" disabled={true}>Account</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                </select> 
      </ul>
    </nav>
  )
}

export default Header