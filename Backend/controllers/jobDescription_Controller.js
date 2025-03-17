
const getJobByTitle = async (req, res) => {
    try {
        const jobTitle = req.query.job_title; // Get job title from query parameter
        
        if (!jobTitle) {
            return res.status(400).json({ message: "Job title is required" });
        }

        const descriptions = require("../Data/Jobs.json"); // Load the JSON file
        
        // Search for the job by title
        const job = descriptions.find(job => job.Job_Title.toLowerCase() === jobTitle.toLowerCase());
        
        if (job) {
            return res.json(job); // Return the job object
        } else {
            return res.status(404).json({ message: "Job not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getJobByTitle
};
