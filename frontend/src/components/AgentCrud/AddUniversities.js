import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUniversities() {
    const [formData, setFormData] = useState({
        universityName: '',
        country: '',
        city: '',
        websiteURL: '',
        availablePrograms: '',
        admissionRequirements: '',
        establishedYear: '',
        image: null, // Image state
    });
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
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        // Prepare form data for the request (for file uploads)
        const universityData = new FormData();
        universityData.append('universityName', formData.universityName);
        universityData.append('country', formData.country);
        universityData.append('city', formData.city);
        universityData.append('websiteURL', formData.websiteURL);
        universityData.append('availablePrograms', formData.availablePrograms);
        universityData.append('admissionRequirements', formData.admissionRequirements);
        universityData.append('establishedYear', formData.establishedYear);

        // Append the image file if it exists
        if (formData.image) {
            universityData.append('image', formData.image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/universities', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Authorization token
                },
                body: universityData, // Send form data (including file)
            });
            const result = await response.json();
            if (response.ok) {
                alert('University added successfully');
                navigate('/update-universities'); // Redirect to the update page after adding the university
            } else {
                alert(result.error || 'Failed to add university');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the university.');
        }
    };

    return (
        <div>
            <h1>Add University</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input 
                    type="text" 
                    name="universityName" 
                    placeholder="University Name" 
                    value={formData.universityName} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="country" 
                    placeholder="Country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="city" 
                    placeholder="City" 
                    value={formData.city} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="url" 
                    name="websiteURL" 
                    placeholder="Website URL" 
                    value={formData.websiteURL} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="availablePrograms" 
                    placeholder="Available Programs" 
                    value={formData.availablePrograms} 
                    onChange={handleChange} 
                    required 
                />
                <textarea 
                    name="admissionRequirements" 
                    placeholder="Admission Requirements" 
                    value={formData.admissionRequirements} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="establishedYear" 
                    placeholder="Established Year" 
                    value={formData.establishedYear} 
                    onChange={handleChange} 
                    min="1000" 
                    max="2100" 
                />
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleChange} 
                />
                <button type="submit">Add University</button>
            </form>
            <button onClick={() => navigate('/update-universities')}>Update Universities</button>
        </div>
    );
}

export default AddUniversities;
