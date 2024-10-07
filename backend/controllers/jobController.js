const Job = require('../models/Job');
const User = require('../models/User');
const path = require('path');

// Create a new job with an image upload
exports.createJob = async (req, res) => {
    const { jobTitle, companyName, location, employmentType, salaryRange, jobDescription, requirements, applicationDeadline, websiteURL } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and `req.user` contains the logged-in user's info

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const job = new Job({
            jobTitle,
            companyName,
            location,
            employmentType,
            salaryRange,
            jobDescription,
            requirements,
            applicationDeadline,
            websiteURL,
            addedBy: userId,
            image: req.file ? req.file.path : null // Save image path if uploaded
        });

        await job.save();
        res.status(201).json({ message: 'Job added successfully', job });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all jobs with optional search functionality and display image correctly
exports.getAllJobs = async (req, res) => {
    const { search } = req.query;

    try {
        // Build the search filter
        const filter = search
            ? {
                $or: [
                    { jobTitle: { $regex: search, $options: 'i' } },
                    { companyName: { $regex: search, $options: 'i' } },
                    { location: { $regex: search, $options: 'i' } },
                    { requirements: { $regex: search, $options: 'i' } },
                ],
            }
            : {}; // No filter if no search term is provided

        let jobs = await Job.find(filter).populate('addedBy', 'name');

        // Append full image URL for each job
        jobs = jobs.map((job) => ({
            ...job._doc,
            image: job.image ? `${req.protocol}://${req.get('host')}/${job.image}` : null, // Construct full image URL
        }));

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a job by ID including the image
exports.getJobById = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id).populate('addedBy', 'name');
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        job = {
            ...job._doc,
            image: job.image ? `${req.protocol}://${req.get('host')}/${job.image}` : null // Append full image URL
        };
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a job with the option to update the image
exports.updateJob = async (req, res) => {
    const { jobTitle, companyName, location, employmentType, salaryRange, jobDescription, requirements, applicationDeadline, websiteURL } = req.body;

    try {
        const updateData = {
            jobTitle,
            companyName,
            location,
            employmentType,
            salaryRange,
            jobDescription,
            requirements,
            applicationDeadline,
            websiteURL,
        };

        if (req.file) {
            updateData.image = req.file.path; // Update the image path if a new image is uploaded
        }

        let job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        job = {
            ...job._doc,
            image: job.image ? `${req.protocol}://${req.get('host')}/${job.image}` : null // Append full image URL
        };

        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get jobs added by the logged-in user with optional search functionality
exports.getUserJobs = async (req, res) => {
    const { search } = req.query; // Get the search query from the request

    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Build the search filter
        const filter = search
            ? {
                addedBy: req.user.id,
                $or: [
                    { jobTitle: { $regex: search, $options: 'i' } },
                    { companyName: { $regex: search, $options: 'i' } },
                    { location: { $regex: search, $options: 'i' } },
                    { requirements: { $regex: search, $options: 'i' } },
                ],
            }
            : { addedBy: req.user.id }; // Only filter by user ID if no search term is provided

        let jobs = await Job.find(filter);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ error: 'No jobs found for this user' });
        }

        // Append full image URL for each job
        jobs = jobs.map((job) => ({
            ...job._doc,
            image: job.image ? `${req.protocol}://${req.get('host')}/${job.image}` : null, // Construct full image URL
        }));

        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching user jobs:', error);
        res.status(500).json({ error: 'An error occurred while fetching jobs. Please try again later.', details: error.message });
    }
};
