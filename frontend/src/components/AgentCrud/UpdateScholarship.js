import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateScholarship() {
    const { id } = useParams(); // Get the scholarship ID from the URL
    const [scholarship, setScholarship] = useState(null); // State to hold scholarship data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const [image, setImage] = useState(null); // State to handle the uploaded image
    const [preview, setPreview] = useState(null); // State to preview the selected image
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScholarship = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:5000/api/scholarships/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch scholarship details');
                const data = await response.json();
                setScholarship(data);
                setPreview(data.image); // Set the current image as preview
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarship();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Preview the image before uploading
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        // Create a new FormData object
        const formData = new FormData();
        formData.append('scholarshipTitle', scholarship.scholarshipTitle);
        formData.append('organization', scholarship.organization);
        formData.append('applicationDeadline', scholarship.applicationDeadline);
        formData.append('eligibilityCriteria', scholarship.eligibilityCriteria);
        formData.append('applicationLink', scholarship.applicationLink);
        formData.append('description', scholarship.description);
        formData.append('scholarshipType', scholarship.scholarshipType);
        formData.append('fieldOfStudy', scholarship.fieldOfStudy);
        formData.append('country', scholarship.country);
        formData.append('applicationRequirements', scholarship.applicationRequirements);
        
        // Append the image if a new one is uploaded
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/scholarships/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, // Token for authorization
                },
                body: formData, // Send formData with text fields and image
            });

            if (response.ok) {
                alert('Scholarship updated successfully');
                navigate('/update-scholarships'); // Redirect to the list of scholarships after update
            } else {
                alert('Failed to update scholarship');
            }
        } catch (error) {
            console.error('Error updating scholarship:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Update Scholarship</h1>
            <form onSubmit={handleUpdate} encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Scholarship Title"
                    value={scholarship.scholarshipTitle || ''}
                    onChange={(e) => setScholarship({ ...scholarship, scholarshipTitle: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Organization"
                    value={scholarship.organization || ''}
                    onChange={(e) => setScholarship({ ...scholarship, organization: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Application Deadline"
                    value={scholarship.applicationDeadline || ''}
                    onChange={(e) => setScholarship({ ...scholarship, applicationDeadline: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Eligibility Criteria"
                    value={scholarship.eligibilityCriteria || ''}
                    onChange={(e) => setScholarship({ ...scholarship, eligibilityCriteria: e.target.value })}
                    required
                />
                <input
                    type="url"
                    placeholder="Application Link"
                    value={scholarship.applicationLink || ''}
                    onChange={(e) => setScholarship({ ...scholarship, applicationLink: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={scholarship.description || ''}
                    onChange={(e) => setScholarship({ ...scholarship, description: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Scholarship Type"
                    value={scholarship.scholarshipType || ''}
                    onChange={(e) => setScholarship({ ...scholarship, scholarshipType: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Field of Study"
                    value={scholarship.fieldOfStudy || ''}
                    onChange={(e) => setScholarship({ ...scholarship, fieldOfStudy: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={scholarship.country || ''}
                    onChange={(e) => setScholarship({ ...scholarship, country: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Application Requirements"
                    value={scholarship.applicationRequirements || ''}
                    onChange={(e) => setScholarship({ ...scholarship, applicationRequirements: e.target.value })}
                    required
                />
                
                {/* File input for image upload */}
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                />
                
                {/* Image preview */}
                {preview && (
                    <div>
                        <img src={preview} alt="Scholarship Preview" style={{ width: '200px', height: 'auto' }} />
                    </div>
                )}

                <button type="submit">Update Scholarship</button>
            </form>
        </div>
    );
}

export default UpdateScholarship;
