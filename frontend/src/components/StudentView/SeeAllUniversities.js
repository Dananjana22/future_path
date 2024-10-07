import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SeeAllUniversities.module.css'; // Import CSS module

function SeeAllUniversities() {
    const [universities, setUniversities] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/universities?search=${searchTerm}`) // Fetch with search term
            .then(response => response.json())
            .then(data => setUniversities(data))
            .catch(error => console.error('Error:', error));
    }, [searchTerm]); // Refetch universities whenever the search term changes

    const handleUserClick = (id) => {
        navigate(`/agents/${id}`);
    };

    return (
        <div className={styles.universitiesPage}>
            <h1 className={styles.title}>All Universities</h1>
            <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                className={styles.searchInput} // Optional: Add a class for styling
            />
            <ul className={styles.universityList}>
                {universities.map(university => (
                    <li key={university._id} className={styles.universityCard}>
                        <h2 className={styles.universityName}>{university.universityName}</h2>

                        {/* Display university image if available */}
                        {university.image && (
                            <img 
                                src={university.image} // Use the full image URL returned by the backend
                                alt={`${university.universityName}`} 
                                className={styles.universityImage} // Add class for image styling
                            />
                        )}

                        <p className={styles.universityLocation}>
                            {university.country}, {university.city}
                        </p>
                        <p>
                            <strong>Website:</strong> 
                            <a href={university.websiteURL} target="_blank" rel="noopener noreferrer">
                                {university.websiteURL}
                            </a>
                        </p>
                        <p><strong>Available Programs:</strong> {university.availablePrograms}</p>
                        <p><strong>Admission Requirements:</strong> {university.admissionRequirements}</p>
                        <p><strong>Established Year:</strong> {university.establishedYear}</p>
                        <p>
                            <strong>Added by:</strong>{' '}
                            {university.addedBy ? (
                                <button className={styles.addedByBtn} onClick={() => handleUserClick(university.addedBy._id)}>
                                    {university.addedBy.name}
                                </button>
                            ) : (
                                'Unknown'
                            )}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SeeAllUniversities;
