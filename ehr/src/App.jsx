import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Screens/home.jsx';
import AddPatient from './Screens/addPatient.jsx';
import Signup from './Screens/signup.jsx';
import Login from './Screens/login.jsx';
import AddVisitNote from './Screens/AddVisitNote.jsx';
import ViewPatient from './Screens/viewPatient.jsx';
import ViewNote from './Screens/viewNote.jsx'
import ViewReport from './Screens/viewReport.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/home' element={<Home />} />
          <Route path='/ehr/add-patient' element={<AddPatient />} />
          <Route path='/ehr/add-visit-note' element={<AddVisitNote />} />
          <Route path='/ehr/view-patient' element={<ViewPatient />} />
          <Route path='/ehr/view-note' element={<ViewNote />} />
          <Route path='/ehr/view-report' element={<ViewReport />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
