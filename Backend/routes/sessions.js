const express = require("express")
const router = express.Router()
const {sessionController} = require("../controllers/index")

// Set Session (Login)
router.post("/start",sessionController.setUserSession );

// Updating Session (Login)
router.post("/update",sessionController.updateUserSession );

// Check Active Session
router.get("/details", sessionController.checkSession, (req, res) => {
    res.json({ message: "Session active", user: req.session.user });
});

// Logout (Destroy Session)
router.post("/end", sessionController.destroySession);

module.exports = router