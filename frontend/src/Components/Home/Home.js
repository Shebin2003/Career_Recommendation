import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
      const question = () => {
        async function setSession(){
          try {
            // Check if logged ( session already started )
            try{
              const sessionCheck = await axios.get("http://localhost:3001/session/details", {
                withCredentials: true, // Ensures cookies are sent & received
              });
            }catch(error){
              window.alert("Log in to save your recommendations")
              const sessionUser = {"id": "0","name": "John Doe"}
              const response = await axios.post("http://localhost:3001/session/start", sessionUser, {
                withCredentials: true, //Ensures session cookies are stored
              });
              console.log("session response : ",response.data)
            }
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        setSession()
        navigate("/question");
      }
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-heading">Intelligent Career Guidance System</h1>
        <p className="hero-para">Discover yourself</p>
        <p className="hero-para">Take the test to find the perfect role for you after Engineering</p>
        <button className="get-started-btn" onClick={question}>Get Started!</button>
      </div>
    </div>
  )
}

export default Home