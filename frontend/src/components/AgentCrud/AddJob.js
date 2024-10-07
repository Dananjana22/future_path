import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddJob() {
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        employmentType: '',
        salaryRange: '',
        jobDescription: '',
        requirements: '',
        applicationDeadline: '',
        websiteURL: '',
        image: null,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('You must be logged in to add a job.');
            return;
        }

        const jobData = new FormData();
        jobData.append('jobTitle', formData.jobTitle);
        jobData.append('companyName', formData.companyName);
        jobData.append('location', formData.location);
        jobData.append('employmentType', formData.employmentType);
        jobData.append('salaryRange', formData.salaryRange);
        jobData.append('jobDescription', formData.jobDescription);
        jobData.append('requirements', formData.requirements);
        jobData.append('applicationDeadline', formData.applicationDeadline);
        jobData.append('websiteURL', formData.websiteURL);

        if (formData.image) {
            jobData.append('image', formData.image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: jobData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Job added successfully');
                navigate('/update-jobs');
            } else {
                alert(result.error || 'Failed to add job');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the job.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add Job</h1>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input 
                    type="text" 
                    name="jobTitle" 
                    placeholder="Job Title" 
                    value={formData.jobTitle} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="text" 
                    name="companyName" 
                    placeholder="Company Name" 
                    value={formData.companyName} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <select 
                    name="employmentType" 
                    value={formData.employmentType} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                    <option value="">Employment Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
                <input 
                    type="text" 
                    name="salaryRange" 
                    placeholder="Salary Range (optional)" 
                    value={formData.salaryRange} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <textarea 
                    name="jobDescription" 
                    placeholder="Job Description" 
                    value={formData.jobDescription} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <textarea 
                    name="requirements" 
                    placeholder="Requirements" 
                    value={formData.requirements} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="date" 
                    name="applicationDeadline" 
                    value={formData.applicationDeadline} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="url" 
                    name="websiteURL" 
                    placeholder="Website URL (optional)" 
                    value={formData.websiteURL} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleChange} 
                    className="mb-4"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Add Job</button>
            </form>
            <button onClick={() => navigate('/update-jobs')} className="mt-4 w-full bg-gray-300 p-2 rounded hover:bg-gray-400 transition duration-200">Update Jobs</button>
        </div>
    );
}

export default AddJob;
