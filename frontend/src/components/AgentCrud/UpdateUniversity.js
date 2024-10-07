import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUniversity() {
  const { id } = useParams(); // Get the university ID from the URL
  const [university, setUniversity] = useState(null); // State to hold university data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [image, setImage] = useState(null); // State to handle the uploaded image
  const [preview, setPreview] = useState(null); // State to preview the selected image
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversity = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:5000/api/universities/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch university details');
        const data = await response.json();
        setUniversity(data);
        // Set the current image as preview if it exists
        setPreview(data.image);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
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
    formData.append('universityName', university.universityName);
    formData.append('country', university.country);
    formData.append('city', university.city);
    formData.append('websiteURL', university.websiteURL);
    formData.append('availablePrograms', university.availablePrograms);
    formData.append('admissionRequirements', university.admissionRequirements);
    formData.append('establishedYear', university.establishedYear);
    
    // Append the image if a new one is uploaded
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/universities/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}` // Token for authorization
        },
        body: formData, // Send formData with text fields and image
      });

      if (response.ok) {
        alert('University updated successfully');
        navigate('/update-universities'); // Redirect to the list of universities after update
      } else {
        alert('Failed to update university');
      }
    } catch (error) {
      console.error('Error updating university:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Update University</h1>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <input
          type="text"
          placeholder="University Name"
          value={university?.universityName || ''}
          onChange={(e) => setUniversity({ ...university, universityName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={university?.country || ''}
          onChange={(e) => setUniversity({ ...university, country: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={university?.city || ''}
          onChange={(e) => setUniversity({ ...university, city: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Website URL"
          value={university?.websiteURL || ''}
          onChange={(e) => setUniversity({ ...university, websiteURL: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Available Programs"
          value={university?.availablePrograms || ''}
          onChange={(e) => setUniversity({ ...university, availablePrograms: e.target.value })}
        />
        <textarea
          placeholder="Admission Requirements"
          value={university?.admissionRequirements || ''}
          onChange={(e) => setUniversity({ ...university, admissionRequirements: e.target.value })}
        />
        <input
          type="number"
          placeholder="Established Year"
          value={university?.establishedYear || ''}
          onChange={(e) => setUniversity({ ...university, establishedYear: e.target.value })}
          min="1000" max="2100"
        />
        
        {/* File input for image upload */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
        
        {/* Image preview */}
        {preview && (
          <div>
            <img src={preview} alt="University Preview" style={{ width: '200px', height: 'auto' }} />
          </div>
        )}

        <button type="submit">Update University</button>
      </form>
    </div>
  );
}

export default UpdateUniversity;
