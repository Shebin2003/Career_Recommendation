const express = require("express")
const router = express.Router()
const questions = require("./questions")
const {job_description} = require("../controllers/index")
const {model} = require("../controllers/index")
const users = require('./users')
const session = require("./sessions")
const predictions = require('./predictions')

router.use("/questions",questions)
router.get("/getJob",job_description.getJobByTitle)
router.post("/predict",model.sendPostRequest)

router.use('/',users)
router.use('/session',session)
router.use('/',predictions)

module.exports = router