import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Screens/home.jsx';
import SignUp from './Screens/signup.jsx';
import Login from './Screens/login.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;