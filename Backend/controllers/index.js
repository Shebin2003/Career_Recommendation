const job_description = require("./jobDescription_Controller")
const questions = require("./questions_Controller")
const model = require("./Model_Controller")
const sessionController = require("./Session_Contoller")
const users = require('./Users')
const predictions = require('./Predictions')

const routes = {
    questions,
    job_description,
    model,
    sessionController,
    users,
    predictions
}

module.exports = routes