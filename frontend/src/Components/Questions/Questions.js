import React, { useState, useEffect } from "react";
import "./Questions.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const [index, setIndex] = useState(43);
  const [data, setData] = useState([]); // Initialize as an array
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState({
    "Database_Fundamentals":0,
    "Computer_Architecture":0,
    "Distributed_Computing":0,
    "Cyber_Security":0,
    "Networking":0,
    "Software_Development":0,
    "Programming_Skills":0,
    "Project_Management":0,
    "Computer_Forensics_Fundamentals":0,
    "Technical_Communication":0,
    "AI_ML":0,
    "Software_Engineering":0,
    "Business_Analysis":0,
    "Data_Science":0,
    "Troubleshooting_Skills":0,
    "Graphics_Designing":0
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionCheck = await axios.get("http://localhost:3001/session/details", {
          withCredentials: true, // Ensures cookies are sent & received
        });
        if (sessionCheck.data.message === "Session active") {
          console.log("user",sessionCheck.data)
          const response = await axios.get("http://localhost:3001/questions");
          setData(response.data);
        } else {
          window.alert("Session Expired");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  

  // Only set question when data is available
  const question = data.length > 0 ? data[index] : null;

  const checkAns = (key) => {
    setSelectedAnswer(key);
    if (question && question.answer === key) {
        setScore(prevScore => ({
            ...prevScore,
            [question.type]: prevScore[question.type]  + 1
          }));
    }
  };

  const next = () => {
    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    }
    else{
        navigate('/question2',{ state:score })
    }
    console.log(score);
  };

  if (!question) {
    return <h2>Loading questions...</h2>;
  }

  return (
    <div className="entire-page">
      <div className="container">
        <h1>Questions</h1>
        <hr />
        <h2>
          {index + 1}. {question.question}
        </h2>
        <ul>
          {Object.entries(question.options).map(([key, value]) => (
            <li
              key={key}
              onClick={() => checkAns(key)}
              className={selectedAnswer === key ? "selected" : ""}
            >
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <button onClick={next} >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questions;
