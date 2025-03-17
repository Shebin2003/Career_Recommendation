const express = require('express');
const router = express.Router();

const { questions } = require("../controllers")

router.get('/',questions.question)
router.get('/ocean',questions.oceanQuestions)


module.exports = router