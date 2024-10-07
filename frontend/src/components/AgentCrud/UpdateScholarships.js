import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import logo from '../../images/future_path_logo.png'; // Adjust this path to your logo

function UpdateScholarships() {
    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/scholarships', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch scholarships');
                }
                return response.json();
            })
            .then((data) => {
                setScholarships(data);
                setFilteredScholarships(data); // Initialize with all scholarships
            })
            .catch((error) => {
                console.error('Error fetching scholarships:', error);
                setError(error.message);
            });
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // Filter scholarships based on the search term
        const filtered = scholarships.filter(scholarship => 
            scholarship.scholarshipTitle.toLowerCase().includes(value.toLowerCase()) ||
            scholarship.organization.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredScholarships(filtered);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/scholarships/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setScholarships(scholarships.filter((scholarship) => scholarship._id !== id));
                setFilteredScholarships(filteredScholarships.filter((scholarship) => scholarship._id !== id));
                alert('Scholarship deleted successfully');
            } else {
                const result = await response.json();
                alert(result.error || 'Failed to delete scholarship');
            }
        } catch (error) {
            console.error('Error deleting scholarship:', error);
            alert('Error deleting scholarship');
        }
    };

    const generatePDF = () => {
        const pdf = new jsPDF();
        const logoImg = new Image();
        logoImg.src = logo;
        logoImg.onload = () => {
            pdf.addImage(logoImg, 'PNG', 10, 10, 50, 20); // Adjust logo size and position

            pdf.setFontSize(22);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Scholarship Listings Report', 10, 40);

            let yPosition = 50; // Start position for the text
            pdf.setFontSize(12);
            filteredScholarships.forEach((scholarship, index) => {
                pdf.text(`Scholarship #${index + 1}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Title: ${scholarship.scholarshipTitle}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Organization: ${scholarship.organization}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Application Deadline: ${new Date(scholarship.applicationDeadline).toLocaleDateString()}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Eligibility Criteria: ${scholarship.eligibilityCriteria}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Application Link: ${scholarship.applicationLink}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Description: ${scholarship.description}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Type: ${scholarship.scholarshipType}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Field of Study: ${scholarship.fieldOfStudy}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Country: ${scholarship.country}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Application Requirements: ${scholarship.applicationRequirements}`, 10, yPosition);
                yPosition += 20;

                pdf.setLineWidth(0.5);
                pdf.line(10, yPosition, 200, yPosition);
                yPosition += 10;

                if (yPosition > 270) {
                    pdf.addPage();
                    yPosition = 20; // Reset the y position for the new page
                }
            });

            pdf.save('scholarships_report.pdf');
        };
    };

    return (
        <div>
            <h1>Your Scholarships</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input 
                type="text" 
                placeholder="Search Scholarships..." 
                value={searchTerm} 
                onChange={handleSearch} 
            />
            <button onClick={generatePDF}>Download Scholarships as PDF</button>

            <ul>
                {filteredScholarships.map((scholarship) => (
                    <li key={scholarship._id}>
                        <h2>{scholarship.scholarshipTitle}</h2>
                        <p><strong>Organization:</strong> {scholarship.organization}</p>
                        <p><strong>Application Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
                        <p><strong>Eligibility Criteria:</strong> {scholarship.eligibilityCriteria}</p>
                        <p><strong>Application Link:</strong> <a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">{scholarship.applicationLink}</a></p>
                        <p><strong>Description:</strong> {scholarship.description}</p>
                        <p><strong>Type:</strong> {scholarship.scholarshipType}</p>
                        <p><strong>Field of Study:</strong> {scholarship.fieldOfStudy}</p>
                        <p><strong>Country:</strong> {scholarship.country}</p>
                        <p><strong>Application Requirements:</strong> {scholarship.applicationRequirements}</p>

                        {/* Display scholarship image if available */}
                        {scholarship.image && (
                            <div>
                                <img src={scholarship.image} alt="Scholarship" style={{ width: '200px', height: 'auto' }} />
                            </div>
                        )}

                        <button onClick={() => handleDelete(scholarship._id)}>Delete</button>
                        <button onClick={() => window.location.href = `/update-scholarship/${scholarship._id}`}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UpdateScholarships;
