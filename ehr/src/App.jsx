import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Screens/home.jsx';
import AddPatient from './Screens/addPatient.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ehr/add-patient' element={<AddPatient />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
