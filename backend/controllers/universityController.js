const University = require('../models/University');
const User = require('../models/User');

// Create a new university with an image upload
exports.createUniversity = async (req, res) => {
    const { universityName, country, city, websiteURL, availablePrograms, admissionRequirements, establishedYear } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and `req.user` contains the logged-in user's info

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const university = new University({
            universityName,
            country,
            city,
            websiteURL,
            availablePrograms,
            admissionRequirements,
            establishedYear,
            addedBy: userId, // Adding the user who added the university
            image: req.file ? req.file.path : null // Save image path if uploaded
        });

        await university.save();
        res.status(201).json({ message: 'University added successfully', university });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all universities with optional search functionality and display image correctly
exports.getAllUniversities = async (req, res) => {
    const { query } = req.query; // Get the search query from the request

    try {
        const filter = query
            ? { universityName: { $regex: query, $options: 'i' } } // Case-insensitive search on universityName
            : {};

        let universities = await University.find(filter).populate('addedBy', 'name'); // Populating addedBy with the user’s name

        // Append full image URL for each university
        universities = universities.map((university) => ({
            ...university._doc,
            image: university.image ? `${req.protocol}://${req.get('host')}/${university.image}` : null, // Construct full image URL
        }));

        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a university by ID including the image
exports.getUniversityById = async (req, res) => {
    try {
        let university = await University.findById(req.params.id).populate('addedBy', 'name'); // Populating addedBy field
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        university = {
            ...university._doc,
            image: university.image ? `${req.protocol}://${req.get('host')}/${university.image}` : null // Append full image URL
        };

        res.status(200).json(university);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a university with the option to update the image
exports.updateUniversity = async (req, res) => {
    const { universityName, country, city, websiteURL, availablePrograms, admissionRequirements, establishedYear } = req.body;

    try {
        const updateData = {
            universityName,
            country,
            city,
            websiteURL,
            availablePrograms,
            admissionRequirements,
            establishedYear
        };

        if (req.file) {
            updateData.image = req.file.path; // Update the image path if a new image is uploaded
        }

        let university = await University.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        university = {
            ...university._doc,
            image: university.image ? `${req.protocol}://${req.get('host')}/${university.image}` : null // Append full image URL
        };

        res.status(200).json({ message: 'University updated successfully', university });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a university
exports.deleteUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }
        res.status(200).json({ message: 'University deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
