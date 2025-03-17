const config = require("../config/config")
const model = config.model
const axios = require('axios');

async function sendPostRequest(req, res) {
    try {
      const inputData  = req.body; // Assume input data comes in the body of the request
      console.log("hi",req.body)
      const values = {"features":[
        inputData.Database_Fundamentals,
        inputData.Computer_Architecture,
        inputData.Distributed_Computing,
        inputData.Cyber_Security,
        inputData.Networking,
        inputData.Software_Development,
        inputData.Programming_Skills,
        inputData.Project_Management,
        inputData.Computer_Forensics_Fundamentals,
        inputData.Technical_Communication,
        inputData.AI_ML,
        inputData.Software_Engineering,
        inputData.Business_Analysis,
        inputData.Data_Science,
        inputData.Troubleshooting_Skills,
        inputData.Graphics_Designing,
        inputData.openness,
        inputData.conscientiousness,
        inputData.extraversion,
        inputData.agreeableness,
        inputData.neuroticism,
        inputData.communcation_skills
      ]}
      const response = await axios.post(`${model}/predict`, values);
      res.status(200).json({
        success: true,
        result: response.data,
      });
    } catch (error) {
      console.error('Error sending request to ML Model:', error);
      res.status(500).json({
        success: false,
        message: 'Error communicating with the machine learning model.'
      });
    }
  }
  
  module.exports = { sendPostRequest };