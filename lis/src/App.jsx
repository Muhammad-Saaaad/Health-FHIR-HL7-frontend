import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Screens/home.jsx';
import SignUp from './Screens/signup.jsx';
import Login from './Screens/login.jsx';
import PatientDetail from './Screens/patientDetail.jsx';
import PendingList from './Screens/pendingList.jsx';
import PendingTestDetail from './Screens/pendingTestDetail.jsx';
import AcceptedTests from './Screens/acceptedTests.jsx';
import LabResult from './Screens/labResult.jsx';
import ViewReport from './Screens/viewReport.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path='/home' element={<PendingList />} />
          <Route path='/pending-list' element={<PendingList />} />
          <Route path='/lab-test' element={<AcceptedTests />} />
          <Route path='/pending-test/:nic/:vid' element={<PendingTestDetail />} />
          <Route path='/records' element={<Home />} />
          <Route path='/record' element={<Navigate to="/records" replace />} />
          <Route path='/lab-result/:testReqId' element={<LabResult />} />
          <Route path='/view-report/:reportId' element={<ViewReport />} />
          <Route path='/view-report' element={<ViewReport />} />
          <Route path='/patient/:nic' element={<PatientDetail />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;