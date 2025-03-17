import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
    const [inputs, setInputs] = useState({ email_id: "", password: "" });
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputs.email_id || !inputs.password) {
            alert("All fields are required!");
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:3001/login", inputs);
            if (data.status === "Authenticated") {
                alert("Login Successful!");
                const sessionUser = {"id": data.user_id,"name": data.user_name}
                const response = await axios.post("http://localhost:3001/session/start", sessionUser    , {
                    withCredentials: true, //Ensures session cookies are stored
                  });
                console.log("session response : ",response.data)
                navigate("/");
            } else {
                alert(data.status);
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-inner-container">
                <div className="login-heading">Login</div>
                <input
                    className="login-input"
                    name="email_id"
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={handleInput}
                    value={inputs.email_id}
                />
                <input
                    className="login-input"
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={handleInput}
                    value={inputs.password}
                /><br/>
                <button className="login-submit-button" onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
