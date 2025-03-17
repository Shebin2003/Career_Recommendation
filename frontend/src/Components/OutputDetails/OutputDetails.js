import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./OutputDetails.css";

const OutputDetails = () => {
    const location = useLocation();
    const state = location.state;
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const sessionCheck = await axios.get("http://localhost:3001/session/details", {
                    withCredentials: true, // Ensures cookies are sent & received
                  });
                  if (sessionCheck.data.message === "Session active") {
                    console.log(sessionCheck.data.user.sessionData, "sessionData");
                    if (!state) {
                        alert("Complete the Questionnaire");
                        navigate("/question");
                        return;
                    }
    
                    const response = await axios.get(`http://localhost:3001/getJob?job_title=${state}`);
                    setData(response.data);
                  }
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [state, navigate]);

    return (
        <div className="outputdetails">
            <div className="outputdetails-container">
                <h1 className="outputdetails-title">{data.Job_Title || "Loading..."}</h1>

                <h2 className="outputdetails-subtitle">Job Description</h2>
                <p className="outputdetails-description">
                    {data.Job_Description || "Information not available."}
                </p>

                <h2 className="outputdetails-subtitle">Skills Required</h2>
                <p className="outputdetails-description">
                    {data.Skill_Required || "Information not available."}
                </p>

                <h2 className="outputdetails-subtitle">Duties and Responsibilities</h2>
                <p className="outputdetails-description">
                    {data.Duties || "Information not available."}
                </p>

                <h2 className="outputdetails-subtitle">Salary Range</h2>
                <p className="outputdetails-description">
                    {data.Salary || "Information not available."}
                </p>
            </div>
        </div>
    );
};

export default OutputDetails;
