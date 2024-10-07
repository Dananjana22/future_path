import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateJob() {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null); // State to hold job data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [image, setImage] = useState(null); // State to handle the uploaded image
  const [preview, setPreview] = useState(null); // State to preview the selected image
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch job details');
        const data = await response.json();
        setJob(data);
        setPreview(data.image); // Set the current image as preview
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
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
    formData.append('jobTitle', job.jobTitle);
    formData.append('companyName', job.companyName);
    formData.append('location', job.location);
    formData.append('employmentType', job.employmentType);
    formData.append('salaryRange', job.salaryRange);
    formData.append('jobDescription', job.jobDescription);
    formData.append('requirements', job.requirements);
    formData.append('applicationDeadline', job.applicationDeadline);
    formData.append('websiteURL', job.websiteURL);
    
    // Append the image if a new one is uploaded
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Token for authorization
        },
        body: formData, // Send formData with text fields and image
      });

      if (response.ok) {
        alert('Job updated successfully');
        navigate('/update-jobs'); // Redirect to the list of jobs after update
      } else {
        alert('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Update Job</h1>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Job Title"
          value={job?.jobTitle || ''}
          onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={job?.companyName || ''}
          onChange={(e) => setJob({ ...job, companyName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={job?.location || ''}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Employment Type"
          value={job?.employmentType || ''}
          onChange={(e) => setJob({ ...job, employmentType: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Salary Range"
          value={job?.salaryRange || ''}
          onChange={(e) => setJob({ ...job, salaryRange: e.target.value })}
        />
        <textarea
          placeholder="Job Description"
          value={job?.jobDescription || ''}
          onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}
          required
        />
        <textarea
          placeholder="Requirements"
          value={job?.requirements || ''}
          onChange={(e) => setJob({ ...job, requirements: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Application Deadline"
          value={job?.applicationDeadline ? new Date(job.applicationDeadline).toISOString().substring(0, 10) : ''}
          onChange={(e) => setJob({ ...job, applicationDeadline: e.target.value })}
        />
        <input
          type="url"
          placeholder="Website URL"
          value={job?.websiteURL || ''}
          onChange={(e) => setJob({ ...job, websiteURL: e.target.value })}
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
            <img src={preview} alt="Job Preview" style={{ width: '200px', height: 'auto' }} />
          </div>
        )}

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}

export default UpdateJob;
