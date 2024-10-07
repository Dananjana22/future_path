const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    employmentType: { type: String, required: true }, // e.g., Full-time, Part-time, Contract, Internship
    salaryRange: { type: String, required: false }, // e.g., "50k-60k" or "Negotiable"
    jobDescription: { type: String, required: true },
    requirements: { type: String, required: true },
    applicationDeadline: { type: Date, required: false },
    websiteURL: { type: String, required: false }, // for applying or more info
    image: { type: String, required: false }, // Path to the uploaded image
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    } // Reference to the User who added the job
});

module.exports = mongoose.model('Job', jobSchema);
