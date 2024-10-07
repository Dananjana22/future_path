import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SeeAllScholarships.module.css'; // Import CSS module

function SeeAllScholarships() {
    const [scholarships, setScholarships] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/scholarships')
            .then(response => response.json())
            .then(data => setScholarships(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleScholarshipClick = (id) => {
        navigate(`/scholarships/${id}`);
    };

    const handleUserClick = (id) => {
        navigate(`/agents/${id}`); // Navigate to the user's profile
    };

    return (
        <div className={styles.scholarshipsPage}>
            <h1>All Scholarships</h1>
            <ul className={styles.scholarshipList}>
                {scholarships.map(scholarship => (
                    <li key={scholarship._id} className={styles.scholarshipCard} onClick={() => handleScholarshipClick(scholarship._id)}>
                        <h2 className={styles.scholarshipTitle}>{scholarship.scholarshipTitle}</h2>
                        <div className={styles.scholarshipDetails}>
                            {/* Display scholarship image if available */}
                            {scholarship.image && (
                                <img 
                                    src={scholarship.image} // Use the full image URL returned by the backend
                                    alt={`Scholarship: ${scholarship.scholarshipTitle}`} 
                                    className={styles.scholarshipImage} // Add class for image styling
                                />
                            )}
                            <p><strong>Organization:</strong> {scholarship.organization}</p>
                            <p><strong>Application Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
                            <p><strong>Eligibility Criteria:</strong> {scholarship.eligibilityCriteria}</p>
                            <p><strong>Application Link:</strong> <a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">{scholarship.applicationLink}</a></p>
                            <p><strong>Description:</strong> {scholarship.description}</p>
                            <p><strong>Type:</strong> {scholarship.scholarshipType}</p>
                            <p><strong>Field of Study:</strong> {scholarship.fieldOfStudy}</p>
                            <p><strong>Country:</strong> {scholarship.country}</p>
                            <p><strong>Application Requirements:</strong> {scholarship.applicationRequirements}</p>
                            <p>
                                <strong>Added by:</strong>{' '}
                                {scholarship.addedBy ? (
                                    <button className={styles.addedByBtn} onClick={() => handleUserClick(scholarship.addedBy._id)}>
                                        {scholarship.addedBy.name}
                                    </button>
                                ) : (
                                    'Unknown'
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SeeAllScholarships;
