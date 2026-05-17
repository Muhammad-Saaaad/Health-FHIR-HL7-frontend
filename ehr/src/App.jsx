import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Screens/home.jsx';
import AddPatient from './Screens/addPatient.jsx';
import Signup from './Screens/signup.jsx';
import Login from './Screens/login.jsx';

import AdminLogin from './Screens/adminLogin.jsx';
import AdminPanel from './Screens/adminPanel.jsx';
import ShowHospitals from './Screens/showHospitals.jsx';

import AddVisitNote from './Screens/AddVisitNote.jsx';
import ViewPatient from './Screens/viewPatient.jsx';
import ViewNote from './Screens/viewNote.jsx'
import ViewReport from './Screens/viewReport.jsx';
import Profile from './Screens/profile.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-login' element={<AdminLogin />} />

          <Route path='/admin-panel' element={<AdminPanel />} />
          <Route path='/hospitals' element={<ShowHospitals />} />
          
          <Route path='/home' element={<Home />} />
          <Route path='/ehr/add-patient' element={<AddPatient />} />
          <Route path='/ehr/add-visit-note' element={<AddVisitNote />} />
          <Route path='/ehr/view-patient' element={<ViewPatient />} />
          <Route path='/ehr/view-note' element={<ViewNote />} />
          <Route path='/ehr/view-report' element={<ViewReport />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
