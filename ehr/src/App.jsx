import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Screens/home.jsx';
import AddPatient from './Screens/addPatient.jsx';
import Signup from './Screens/signup.jsx';
import Login from './Screens/login.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/ehr/add-patient' element={<AddPatient />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
