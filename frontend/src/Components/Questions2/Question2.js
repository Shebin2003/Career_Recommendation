import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Questions2.css";

const Question2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure state is not null/undefined
  const [state, setState] = useState(location.state || {});
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [heading, setHeading] = useState("Question");
  const [isFinalQuestion, setIsFinalQuestion] = useState(false);
  
  const [score, setScore] = useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
    communcation_skills: 0,
  });

  const options = [
    "Strongly Disagree",
    "Disagree",
    "Neither agree nor disagree",
    "Agree",
    "Strongly Agree",
  ];

  useEffect(() => {
    async function fetchData() {
      const sessionCheck = await axios.get("http://localhost:3001/session/details", {
        withCredentials: true, // Ensures cookies are sent & received
      });

      if (sessionCheck.data.message === "Session active") {
        console.log("user",sessionCheck.data) 

        if (!state || Object.keys(state).length === 0) { 
          // Check if state is null or undefined
          window.alert("Complete the Questionnaire");
          navigate("/question");
          return;
        }
  
        try {
          const response = await axios.get("http://localhost:3001/questions/ocean");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      else{
        window.alert("Session Expired");
        navigate("/");
      }
      
    }

    fetchData();
  }, [state, navigate]);

  useEffect(() => {
    if (isFinalQuestion) {
      const updatedState = { ...state, ...score };
      console.log("Navigating with state:", updatedState);
      async function updateSession(){
        const sessionUser = {"sessionData": updatedState}
        const response = await axios.post("http://localhost:3001/session/update", sessionUser, {
            withCredentials: true, //Ensures session cookies are stored
        });
        console.log("session response : ",response.data)
      }
      updateSession()
      navigate("/output", { state: updatedState });
    }
  }, [isFinalQuestion, score, state, navigate]);

  const next = () => {
    if (selectedAnswer === null) {
      window.alert("Please select an option before proceeding!");
      return;
    }

    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);

      if (index + 1 >= data.length - 1) {
        setHeading("Rate on a scale of 1-5");
      }
    } else {
      const updatedScore = { ...score };
      for (let val in updatedScore) {
        if (val === "communcation_skills") {
          updatedScore[val] = updatedScore[val] * 2;
        } else {
          updatedScore[val] = parseFloat((updatedScore[val] / 15).toFixed(4));
        }
      }

      setScore(updatedScore);
      setIsFinalQuestion(true);
    }
  };

  const checkAns = (key) => {
    setSelectedAnswer(key);
    setScore((prevScore) => ({
      ...prevScore,
      [data[index].type]: prevScore[data[index].type] + parseInt(key) + 1,
    }));
  };

  if (data.length === 0) {
    return <h2>Loading questions...</h2>;
  }

  return (
    <div className="entire-page">
      <div className="container">
        <h1>{heading}</h1>
        <hr />
        <h2>" {data[index]?.question} "</h2>
        <ul>
          {options.map((value, key) => (
            <li
              key={key}
              onClick={() => checkAns(key)}
              className={selectedAnswer === key ? "selected" : ""}
            >
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Question2;
