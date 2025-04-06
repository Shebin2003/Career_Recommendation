import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';

const Account = () => {
    const [userName, setUserName] = useState();
    const [predictions, setPrediction] = useState([]);

    useEffect(() => {
        const getPredictions = async () => {
            try {
                const sessionCheck = await axios.get("http://localhost:3001/session/details", {
                    withCredentials: true,
                });
                setUserName(sessionCheck.data.user.name)
                const id = sessionCheck.data.user.id;
                const response = await axios.get(`http://localhost:3001/retrieveprediction?user_id=${id}`);
                setPrediction(response.data);

                console.log(id, "Fetched Predictions for this user");
            } catch (error) {
                console.error("Error fetching predictions", error);
            }
        };

        getPredictions();
    }, []);

    const renderTableHeaders = () => {
        if (predictions.length === 0) return null;
        return Object.keys(predictions[0]).map((key) => <th key={key}>{key}</th>);
    };

    const renderTableRows = () => {
        return predictions.map((item, index) => (
            <tr key={index}>
                {Object.values(item).map((value, idx) => (
                    <td key={idx}>{value.toString()}</td>
                ))}
            </tr>
        ));
    };

    return (
        <div className="account-container">
            <h2 className="account-title">{userName}'s Predictions</h2>
            {predictions.length === 0 ? (
                <p className="no-predictions">No predictions found.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="predictions-table">
                        <thead>
                            <tr>{renderTableHeaders()}</tr>
                        </thead>
                        <tbody>{renderTableRows()}</tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Account;
