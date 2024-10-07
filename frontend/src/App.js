import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS here
import PreLoginPage from './components/PreLoginPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AgentHomePage from './components/AgentHomePage';
import StudentHomePage from './components/StudentHomePage';
import AddUniversities from './components/AgentCrud/AddUniversities';
import UpdateUniversities from './components/AgentCrud/UpdateUniversities';
import SeeAllUniversities from './components/StudentView/SeeAllUniversities';
import UpdateUniversity from './components/AgentCrud/UpdateUniversity';
import AddScholarships from './components/AgentCrud/AddScholarships';
import UpdateScholarships from './components/AgentCrud/UpdateScholarships';
import SeeAllScholarships from './components/StudentView/SeeAllScholarships';
import UpdateScholarship from './components/AgentCrud/UpdateScholarship';
import AddJob from './components/AgentCrud/AddJob';
import UpdateJobs from './components/AgentCrud/UpdateJobs';
import UpdateJob from './components/AgentCrud/UpdateJob';
import SeeAllJobs from './components/StudentView/SeeAlljobs';
import AgentProfileForm from './components/AgentCrud/AgentProfileForm';
import AgentProfilePage from './components/StudentView/AgentProfilePage';
import ReviewForm from './components/StudentCrud/ReviewForm'; 
import ReviewsPage from './components/StudentCrud/ReviewsPage';  
import StudentProfilePage from './components/AgentView/StudentProfilePage';
import StudentProfileForm from './components/StudentCrud/StudentProfileForm';
import AppointmentForm from './components/StudentCrud/AppointmentForm.js'; 
import AppointmentsPage from './components/StudentView/AppointmentsPage.js';
import AgentAppointmentsPage from'./components/AgentCrud/AgentAppointmentsPage.js';
import ApprovedAppointmentsPage from'./components/StudentView/ApprovedAppointmentsPage.js';
import UploadDocumentsPage  from'./components/StudentCrud/UploadDocumentsPage.js';
import ViewDocumentsPage  from'./components/StudentView/ViewDocumentsPage.js';
import AppointmentDocumentsPage from './components/AgentView/AppointmentDocumentsPage';
import AddPaymentPage from './components/StudentCrud/AddPaymentPage.js';
import PaymentsPage from './components/StudentView/PaymentsPage';
import AgentPaymentsPage  from './components/AgentView/AgentPaymentsPage.js';
import AgentProfiles from './components/AgentProfiles';
import StudentProfiles from './components/StudentProfiles';
import Home from './components/Home.js';



function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/agent-home" element={<AgentHomePage />} />
        <Route path="/student-home" element={<StudentHomePage />} />
        <Route path="/add-universities" element={<AddUniversities />} />
        <Route path="/update-universities" element={<UpdateUniversities />} />
        <Route path="/see-all-universities" element={<SeeAllUniversities />} />
        <Route path="/update-university/:id" element={<UpdateUniversity />} />
        <Route path="/add-scholarships" element={<AddScholarships />} />
        <Route path="/update-scholarships" element={<UpdateScholarships />} />
        <Route path="/see-all-scholarships" element={<SeeAllScholarships />} />
        <Route path="/update-scholarship/:id" element={<UpdateScholarship />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/update-jobs" element={<UpdateJobs />} />
        <Route path="/update-job/:id" element={<UpdateJob />} />
        <Route path="see-all-jobs" element={<SeeAllJobs />} />
        <Route path="/update-agent-profile" element={<AgentProfileForm />} />
        <Route path="/agents/:id" element={<AgentProfilePage />} />
        <Route path="/agents/:id/add-review" element={<ReviewForm />} />
        <Route path="/reviews" element={<ReviewsPage />} /> 
        <Route path="/student-profile/:id" element={<StudentProfilePage />} />
        <Route path="/students/:id/edit" element={<StudentProfileForm />} />
        <Route path="/agents/:id/book-appointment" element={<AppointmentForm />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/agent/appointments" element={<AgentAppointmentsPage />} />
        <Route path="/appointments/approved" element={<ApprovedAppointmentsPage />} />
        <Route path="/appointments/:appointmentId/upload-documents" element={<UploadDocumentsPage />} />
        <Route path="/appointments/:appointmentId/view-documents" element={<ViewDocumentsPage />} />
        <Route path="/appointments/:appointmentId/documents" element={<AppointmentDocumentsPage />} />
        <Route path="/agents/:id/add-payment" element={<AddPaymentPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/agent/payments" element={<AgentPaymentsPage />} />
        <Route path="/agents" element={<AgentProfiles />} />
        <Route path="/students" element={<StudentProfiles />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;


