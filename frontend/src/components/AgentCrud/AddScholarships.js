import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddScholarships() {
    const [formData, setFormData] = useState({
        scholarshipTitle: '',
        organization: '',
        applicationDeadline: '',
        eligibilityCriteria: '',
        applicationLink: '',
        description: '',
        scholarshipType: '',
        fieldOfStudy: '',
        country: '',
        applicationRequirements: '',
        image: null // Image state
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file input change for the image
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] }); // Get the first selected file
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (!token) {
            setErrorMessage('You must be logged in to add a scholarship.');
            return;
        }

        // Prepare form data for the request (for file uploads)
        const scholarshipData = new FormData();
        scholarshipData.append('scholarshipTitle', formData.scholarshipTitle);
        scholarshipData.append('organization', formData.organization);
        scholarshipData.append('applicationDeadline', formData.applicationDeadline);
        scholarshipData.append('eligibilityCriteria', formData.eligibilityCriteria);
        scholarshipData.append('applicationLink', formData.applicationLink);
        scholarshipData.append('description', formData.description);
        scholarshipData.append('scholarshipType', formData.scholarshipType);
        scholarshipData.append('fieldOfStudy', formData.fieldOfStudy);
        scholarshipData.append('country', formData.country);
        scholarshipData.append('applicationRequirements', formData.applicationRequirements);

        // Append the image file if it exists
        if (formData.image) {
            scholarshipData.append('image', formData.image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/scholarships', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Authorization token
                },
                body: scholarshipData, // Send form data (including file)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Scholarship added successfully');
                navigate('/update-scholarships'); // Redirect to the update page after adding the scholarship
            } else {
                alert(result.error || 'Failed to add scholarship');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the scholarship.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
                <h1 className="text-3xl font-semibold mb-6">Add Scholarship</h1>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="scholarshipTitle" 
                            placeholder="Scholarship Title" 
                            value={formData.scholarshipTitle} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="organization" 
                            placeholder="Organization" 
                            value={formData.organization} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="date" 
                            name="applicationDeadline" 
                            value={formData.applicationDeadline} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="eligibilityCriteria" 
                            placeholder="Eligibility Criteria" 
                            value={formData.eligibilityCriteria} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="url" 
                            name="applicationLink" 
                            placeholder="Application Link" 
                            value={formData.applicationLink} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <textarea 
                            name="description" 
                            placeholder="Description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="scholarshipType" 
                            placeholder="Scholarship Type" 
                            value={formData.scholarshipType} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="fieldOfStudy" 
                            placeholder="Field of Study" 
                            value={formData.fieldOfStudy} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="country" 
                            placeholder="Country" 
                            value={formData.country} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <textarea 
                            name="applicationRequirements" 
                            placeholder="Application Requirements" 
                            value={formData.applicationRequirements} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300" type="submit">
                        Add Scholarship
                    </button>
                </form>
                <button className="mt-4 w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300" onClick={() => navigate('/update-scholarships')}>
                    Update Scholarships
                </button>
            </div>
        </div>
    );
}

export default AddScholarships;
