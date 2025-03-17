exports.checkSession = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized. No active session." });
    }
    next();
};

exports.setUserSession = (req, res) => {
    console.log(req.body)
    const { id, name } = req.body;  // ✅ Destructure directly
    if (!id || !name) {
        return res.status(400).json({ error: "Missing user ID or name" });
    }

    req.session.user = { id, name };

    res.status(200).json({ message: "Session set", session: req.session.user });
};

exports.updateUserSession = (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({ error: "No active session found!" });
    }

    // Merge new data into the existing session
    req.session.user = {
        ...req.session.user,  // Keep existing data
        ...req.body  // Add new data
    };

    res.status(200).json({ message: "Session updated successfully", session: req.session.user });
};

exports.destroySession = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Error destroying session" });
        }
        res.json({ message: "Logged out successfully" });
    });
};
