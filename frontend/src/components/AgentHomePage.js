import React from 'react';
import { Link } from 'react-router-dom';

function AgentHomePage() {
  const agentId = localStorage.getItem('agentId'); // Fetch the agent ID from local storage

  return (
    <div>
      <h1>Agent Home</h1>
      <p>Welcome, agent! Here you can manage your universities and other details.</p>
      <Link to="/add-universities">
        <button>Add Universities</button>
      </Link>
      <Link to="/add-job">
        <button>Add Jobs</button>
      </Link>
      <Link to="/add-scholarships">
        <button>Add Scholarships</button>
      </Link>
      <Link to="/update-agent-profile">
        <button>Update My Profile</button>
      </Link>
      <Link to="/agent/appointments">
        <button>Manage Appointments</button>
      </Link>
      <Link to="/agent/payments">
        <button>View My Payments</button>
      </Link>
      <Link to="/agents">
        <button>View All Agents</button>
      </Link>
      <Link to="/students">
        <button>View student</button>
      </Link>

    </div>
  );
}

export default AgentHomePage;
