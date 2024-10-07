// StudentHomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentHomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Student Home</h1>
      <p>Welcome, student! Here you can explore universities and apply for jobs.</p>
      <button onClick={() => navigate('/see-all-universities')}>See All Universities</button>
      <button onClick={() => navigate('/see-all-jobs')}>See All Jobs</button>
      <button onClick={() => navigate('/see-all-scholarships')}>See All Scholarships</button>
      <button onClick={() => navigate('/reviews')}>Manage Reviews</button>
      <button onClick={() => navigate('/students/:id/edit')}>Manage Your Profile</button>
      <button onClick={() => navigate('/appointments')}>My Appointments</button>
      <button onClick={() => navigate('/appointments/approved')}>Upload Documents</button>
      <button onClick={() => navigate('/payments')}>View My Payments</button> 
      <button onClick={() => navigate('/agents')}>View Agents</button> 
      <button onClick={() => navigate('/students')}>View Students</button> 
      <button onClick={() => navigate('/login')}>Login</button> 
    </div>
  );
}

export default StudentHomePage;
