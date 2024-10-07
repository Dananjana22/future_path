const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    universityName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    websiteURL: { type: String, required: true },
    availablePrograms: { type: String, required: true },
    admissionRequirements: { type: String, required: true },
    establishedYear: { type: Number, required: false, min: 1000, max: 2100 },
    image: { type: String, required: false }, // Path to the uploaded image
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    } // Reference to the User who added the university
   
});

module.exports = mongoose.model('University', universitySchema);
