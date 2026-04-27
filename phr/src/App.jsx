import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import ViewDoctorDetails from './screens/viewDoctorDetails';
import ViewNote from './screens/viewNote';
import ViewReport from './screens/viewReport';
import Profile from './screens/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>       
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/view-doctor-details" element={<ViewDoctorDetails />} />
        <Route path="/view-note" element={<ViewNote />} />
        <Route path="/view-report" element={<ViewReport />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
