const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    scholarshipTitle: { type: String, required: true },
    organization: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    eligibilityCriteria: { type: String, required: true },
    applicationLink: { type: String, required: true },
    description: { type: String, required: true },
    scholarshipType: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    country: { type: String, required: true },
    applicationRequirements: { type: String, required: true },
    image: { type: String }, // Field for storing the image URL or path
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    } // Reference to the User who added the scholarship
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
