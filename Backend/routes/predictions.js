const express = require('express')

const router = express.Router()
const { predictions } = require('../controllers')

router.post('/addprediction',predictions.addPrediction)          
router.get('/retrieveprediction',predictions.retrievePrediction)     

module.exports = router