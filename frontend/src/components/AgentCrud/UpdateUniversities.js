import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import logo from '../../images/future_path_logo.png'; // Adjust path to your logo image

function UpdateUniversities() {
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Fetching universities...'); // Debugging log

        fetch('http://localhost:5000/api/universities', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch universities');
            }
            return response.json();
        })
        .then((data) => {
            setUniversities(data);
            setFilteredUniversities(data); // Set initial filtered universities
        })
        .catch((error) => {
            setError(error.message);
        });
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/universities/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setUniversities(universities.filter((uni) => uni._id !== id));
                setFilteredUniversities(filteredUniversities.filter((uni) => uni._id !== id));
                alert('University deleted successfully');
            } else {
                const result = await response.json();
                alert(result.error || 'Failed to delete university');
            }
        } catch (error) {
            alert('Error deleting university');
        }
    };

    const generatePDF = () => {
        const pdf = new jsPDF();

        // Add website logo at the top
        const logoImg = new Image();
        logoImg.src = logo;
        logoImg.onload = () => {
            pdf.addImage(logoImg, 'PNG', 10, 10, 50, 20); // Adjust logo size and position

            pdf.setFontSize(22);
            pdf.setFont('helvetica', 'bold');
            pdf.text('University Listings Report', 10, 40);

            let yPosition = 50;
            pdf.setFontSize(12);
            filteredUniversities.forEach((university, index) => {
                pdf.text(`University #${index + 1}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Name: ${university.universityName}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Country: ${university.country}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`City: ${university.city}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Website: ${university.websiteURL}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Available Programs: ${university.availablePrograms}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Admission Requirements: ${university.admissionRequirements}`, 10, yPosition);
                yPosition += 10;
                pdf.text(`Established Year: ${university.establishedYear}`, 10, yPosition);
                yPosition += 20;

                pdf.setLineWidth(0.5);
                pdf.line(10, yPosition, 200, yPosition);
                yPosition += 10;

                if (yPosition > 270) {
                    pdf.addPage();
                    yPosition = 20;
                }
            });

            pdf.save('universities_report.pdf');
        };
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = universities.filter((university) => 
            university.universityName.toLowerCase().includes(query.toLowerCase()) ||
            university.country.toLowerCase().includes(query.toLowerCase()) ||
            university.city.toLowerCase().includes(query.toLowerCase()) ||
            university.websiteURL.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredUniversities(filtered);
    };

    return (
        <div>
            <h1>Your Universities</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="text"
                placeholder="Search universities..."
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
            />

            <button onClick={generatePDF}>Download Universities as PDF</button>

            <ul>
                {filteredUniversities.map((university) => (
                    <li key={university._id}>
                        <h2>{university.universityName}</h2>
                        <p><strong>Country:</strong> {university.country}</p>
                        <p><strong>City:</strong> {university.city}</p>
                        <p><strong>Website:</strong> <a href={university.websiteURL} target="_blank" rel="noopener noreferrer">{university.websiteURL}</a></p>
                        <p><strong>Available Programs:</strong> {university.availablePrograms}</p>
                        <p><strong>Admission Requirements:</strong> {university.admissionRequirements}</p>
                        <p><strong>Established Year:</strong> {university.establishedYear}</p>

                        {/* Display university image if available */}
                        {university.image && (
                            <div>
                                <img src={university.image} alt="University" style={{ width: '200px', height: 'auto' }} />
                            </div>
                        )}

                        <button onClick={() => handleDelete(university._id)}>Delete</button>
                        <button onClick={() => window.location.href = `/update-university/${university._id}`}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UpdateUniversities;
