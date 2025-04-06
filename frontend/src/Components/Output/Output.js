import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Output.css";

const Output = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [prediction, setPrediction] = useState({ result: [] });
  const [user, setUser] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionCheck = await axios.get("http://localhost:3001/session/details", {
          withCredentials: true, // Ensures cookies are sent & received
        });
  
        console.log("Session Check Response:", sessionCheck.data);
  
        if (sessionCheck.data.message === "Session active") {
          console.log(sessionCheck.data.user.sessionData, "sessionData");
          setUser(sessionCheck.data.user.name)
  
          if (!sessionCheck.data.user.sessionData || sessionCheck.data.user.sessionData.length < 22) {
            window.alert("Complete the Questionnaire");
            navigate("/question");
            return;
          }
  
          const response = await axios.post("http://localhost:3001/predict", sessionCheck.data.user.sessionData);
          setPrediction(response.data);

          // Adding prediction to prediction table  
          setPrediction(response.data);

          // Use response.data directly
          const prediction_data = {
            user_id: sessionCheck.data.user.id,
            prediction_1: response.data.result[0],
            prediction_2: response.data.result[1],
            prediction_3: response.data.result[2]
          };
          console.log(prediction_data,"Gello")
          const response2 = await axios.post("http://localhost:3001/addPrediction", prediction_data);
          console.log(response2,"Hi")

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
