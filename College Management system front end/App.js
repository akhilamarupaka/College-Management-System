// import './App.css';
import Student_Home from './Student/Student_Home';
import Student_Reports from './Student/Student_Reports';
import Chat_student from './Student/Chat_student';
import Course from './Student/Course';
import User_profile from './Student/User_profile';
import Course_announcements from './Student/Course_announcements';
import Landingpage from './Landingpage';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Course_grades from './Student/Course_grades';
import Course_modules from './Student/Course_modules';
import Course_assesments from './Student/Course_assessments';

import Instructor_Page from './Instructor/Instructor_Page';
import Instructor_Reports from './Instructor/Instructor_Reports';
import Instructor_chat from './Instructor/Instructor_chat';
import Instructor_Profile from './Instructor/Instructor_Profile';
import Create_course from './Instructor/Create_course';
import Manage_course from './Instructor/Manage_course';
import Grade_course from './Instructor/Grade_course';
import Add_Module from './Instructor/Add_Module';
import Add_exam from './Instructor/Add_exam';
import Make_announcement from './Instructor/Make_announcement';
import Instructor_programs_landing_page from './Instructor/Instructor_programs_landing_page';
import QAOPage from './QAO/QAOPage';
import QAOLandingPage from './QAO/QAOLandingPage';
import Chat_QAO from './QAO/Chat_QAO';
import QAO_emails from './QAO/QAO_emails';
import QAO_feedback from './QAO/QAO_feedback';
import QAO_Profile from './QAO/QAO_Profile';
import QAO_reports from './QAO/QAO_reports';
import Create_policy from './QAO/Create_policy';
import Manage_policy from './QAO/Manage_policy';

import AdminPage from './Admin/AdminPage';
import AdminLandingPage from './Admin/AdminLandingPage';
import AdminChat from './Admin/AdminChat';
import AdminProfile from './Admin/AdminProfile';
import UserRoles from './Admin/UserRoles';
import ManageUsers from './Admin/ManageUsers';
import UserPermissions from './Admin/UserPermissions';
import UserActivity from './Admin/UserActivity';

import ContactUs from './ContactUs';
import Programs from './Programs';
import Login from './Login';
import SignUp from './SignUp';
import Forgot from './Forgot';
import ResetPassword from './ResetPassword';


function App() {

  function ProtectedRoute({ role, element }) {
    const userRole = localStorage.getItem('role'); 
    console.log(userRole);
    const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userid= localStorage.getItem('ID');
    if (isAuthenticated && userRole === role) {
      return element;
    } else {
      // Redirect to a forbidden page or show an access denied message
      return <Navigate to="/access-denied" />;
    }
  }
  

  return (
    <Router>
      <Routes>
        <Route path="/access-denied" element={<p>Access Denied</p>} />

        {/* Student Routes */}
        <Route path="/Student" element={<ProtectedRoute role="Student" element={<Student_Home />} />} />
        <Route path="/Student_Reports" element={<ProtectedRoute role="Student" element={<Student_Reports />} />} />
		<Route path="/Chat_student" element={<ProtectedRoute role="Student" element={<Chat_student />} />} />
		<Route path="/Course/:Course_ID" element={<ProtectedRoute role="Student" element={<Course/>} />} />

		<Route path="/User_profile" element={<ProtectedRoute role="Student" element={<User_profile/>} />} />
		<Route path="/Course_announcements/:Course_ID" element={<ProtectedRoute role="Student" element={<Course_announcements/>} />} />
		<Route path="/Course_grades/:Course_ID" element={<ProtectedRoute role="Student" element={<Course_grades/>} />} />
		<Route path="Course_modules/:Course_ID" element={<ProtectedRoute role="Student" element={<Course_modules/>} />} />
		<Route path="Course_assesments/:Course_ID" element={<ProtectedRoute role="Student" element={<Course_assesments/>} />} />
	
        {/* Instructor Routes */}
        <Route path="/Instructor_LandingPage" element={<ProtectedRoute role="Instructor" element={<Instructor_programs_landing_page/>} />} />
        <Route path="/Instructor_Reports" element={<ProtectedRoute role="Instructor" element={<Instructor_Reports/>} />} />
        <Route path="/Instructor_Profile" element={<ProtectedRoute role="Instructor" element={<Instructor_Profile />} />} />
        <Route path="/Instructor" element={<ProtectedRoute role="Instructor" element={<Instructor_Page />} />} />
        <Route path="/Instructor_chat" element={<ProtectedRoute role="Instructor" element={<Instructor_chat/>} />} />
        <Route path="/Create_course" element={<ProtectedRoute role="Instructor" element={<Create_course/>} />} />
        <Route path="/Manage_course" element={<ProtectedRoute role="Instructor" element={<Manage_course/>} />} />
        <Route path="/Grade_course" element={<ProtectedRoute role="Instructor" element={<Grade_course />} />} />
        <Route path="/Add_Module" element={<ProtectedRoute role="Instructor" element={<Add_Module/>} />} />
        <Route path="/Add_exam" element={<ProtectedRoute role="Instructor" element={<Add_exam/>} />} />
        <Route path="/Make_announcement" element={<ProtectedRoute role="Instructor" element={<Make_announcement/>} />} />



        {/* QAO Routes */}
        <Route path="/QAOPage" element={<ProtectedRoute role="Quality Assurance Officer" element={<QAOPage />} />} />
		  <Route path="/QAOLandingPage" element={<ProtectedRoute role="Quality Assurance Officer" element={<QAOLandingPage/>} />} />
		  <Route path="/Chat_QAO" element={<ProtectedRoute role="Quality Assurance Officer" element={<Chat_QAO/>} />} />
		  <Route path="/QAO_emails" element={<ProtectedRoute role="Quality Assurance Officer" element={<QAO_emails/>} />} />
		  <Route path="/QAO_feedback" element={<ProtectedRoute role="Quality Assurance Officer" element={<QAO_feedback/>} />} />
		  <Route path="/QAO_Profile" element={<ProtectedRoute role="Quality Assurance Officer" element={<QAO_Profile/>} />} />
		   <Route path="/QAO_reports" element={<ProtectedRoute role="Quality Assurance Officer" element={<QAO_reports/>} />} />
		    <Route path="/Create_policy" element={<ProtectedRoute role="Quality Assurance Officer" element={<Create_policy/>} />} />
			 <Route path="/Manage_policy" element={<ProtectedRoute role="Quality Assurance Officer" element={<Manage_policy/>} />} />
		     

	   {/* Admin Routes */}
        <Route path="/AdminPage" element={<ProtectedRoute role="Administrator" element={<AdminPage />} />} />
        <Route path="/AdminLandingPage" element={<ProtectedRoute role="Administrator" element={<AdminLandingPage/>} />} />
        <Route path="/AdminChat" element={<ProtectedRoute role="Administrator" element={<AdminChat/>} />} />
        <Route path="/AdminProfile" element={<ProtectedRoute role="Administrator" element={<AdminProfile/>} />} />
        <Route path="/UserRoles" element={<ProtectedRoute role="Administrator" element={<UserRoles/>} />} />
        <Route path="/ManageUsers" element={<ProtectedRoute role="Administrator" element={<ManageUsers/>} />} />
        <Route path="/UserPermissions" element={<ProtectedRoute role="Administrator" element={<UserPermissions/>} />} />
        <Route path="/UserActivity" element={<ProtectedRoute role="Administrator" element={<UserActivity/>} />} />


        {/* Other Public Routes */}
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Programs" element={<Programs />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Forgot" element={<Forgot/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />

      </Routes>
    </Router>
  );
}

export default App;

