import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Output.css";

const Output = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [prediction, setPrediction] = useState({ result: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionCheck = await axios.get("http://localhost:3001/session/details", {
          withCredentials: true, // Ensures cookies are sent & received
        });
  
        console.log("Session Check Response:", sessionCheck.data);
  
        if (sessionCheck.data.message === "Session active") {
          console.log(sessionCheck.data.user.sessionData, "sessionData");
  
          if (!sessionCheck.data.user.sessionData || sessionCheck.data.user.sessionData.length < 22) {
            window.alert("Complete the Questionnaire");
            navigate("/question");
            return;
          }
  
          const response = await axios.post("http://localhost:3001/predict", sessionCheck.data.user.sessionData);
          setPrediction(response.data);
          console.log("Prediction:", response.data);
        } else {
          window.alert("Session Expired");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [ navigate]);
  

  const handleClick = (study) => {
    navigate('/outputdetails', { state: study });
  };
  

  return (
    <div className="output">
      <div className="output-container">
        <h2 className="heading">Hey! The job roles that matched your skills ...</h2>
        <ul className="recommendation-list">
          {prediction.result.map((study, index) => (
            <li key={index} className="recommendation-item" onClick={() => handleClick(study)}> 
              {study}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Output;
