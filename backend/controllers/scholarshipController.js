const Scholarship = require('../models/Scholarship');
const User = require('../models/User');
const path = require('path');

// Create a new scholarship with an image upload
exports.createScholarship = async (req, res) => {
    const { 
        scholarshipTitle, 
        organization, 
        applicationDeadline, 
        eligibilityCriteria, 
        applicationLink, 
        description, 
        scholarshipType, 
        fieldOfStudy, 
        country, 
        applicationRequirements 
    } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and `req.user` contains the logged-in user's info

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const scholarship = new Scholarship({
            scholarshipTitle,
            organization,
            applicationDeadline,
            eligibilityCriteria,
            applicationLink,
            description,
            scholarshipType,
            fieldOfStudy,
            country,
            applicationRequirements,
            addedBy: userId,
            image: req.file ? req.file.path : null // Save image path if uploaded
        });

        await scholarship.save();
        res.status(201).json({ message: 'Scholarship added successfully', scholarship });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all scholarships with optional search functionality and display image correctly
exports.getAllScholarships = async (req, res) => {
    const { search } = req.query;

    try {
        // Build the search filter
        const filter = search
            ? {
                $or: [
                    { scholarshipTitle: { $regex: search, $options: 'i' } },
                    { organization: { $regex: search, $options: 'i' } }
                ]
            }
            : {}; // No filter if no search term is provided

        let scholarships = await Scholarship.find(filter).populate('addedBy', 'name');

        // Append full image URL for each scholarship
        scholarships = scholarships.map((scholarship) => ({
            ...scholarship._doc,
            image: scholarship.image ? `${req.protocol}://${req.get('host')}/${scholarship.image}` : null, // Construct full image URL
        }));

        res.status(200).json(scholarships);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a scholarship by ID including the image
exports.getScholarshipById = async (req, res) => {
    try {
        let scholarship = await Scholarship.findById(req.params.id).populate('addedBy', 'name');
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }
        scholarship = {
            ...scholarship._doc,
            image: scholarship.image ? `${req.protocol}://${req.get('host')}/${scholarship.image}` : null // Append full image URL
        };
        res.status(200).json(scholarship);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a scholarship with the option to update the image
exports.updateScholarship = async (req, res) => {
    const { 
        scholarshipTitle, 
        organization, 
        applicationDeadline, 
        eligibilityCriteria, 
        applicationLink, 
        description, 
        scholarshipType, 
        fieldOfStudy, 
        country, 
        applicationRequirements 
    } = req.body;

    try {
        const updateData = {
            scholarshipTitle,
            organization,
            applicationDeadline,
            eligibilityCriteria,
            applicationLink,
            description,
            scholarshipType,
            fieldOfStudy,
            country,
            applicationRequirements
        };

        if (req.file) {
            updateData.image = req.file.path; // Update the image path if a new image is uploaded
        }

        let scholarship = await Scholarship.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }

        scholarship = {
            ...scholarship._doc,
            image: scholarship.image ? `${req.protocol}://${req.get('host')}/${scholarship.image}` : null // Append full image URL
        };

        res.status(200).json({ message: 'Scholarship updated successfully', scholarship });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a scholarship
exports.deleteScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }
        res.status(200).json({ message: 'Scholarship deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
