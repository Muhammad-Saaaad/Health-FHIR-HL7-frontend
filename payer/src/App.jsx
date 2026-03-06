import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./Screens/home"
import AddCustomer from "./Screens/add_customer"
import SignUp from "./Screens/signup";
import Login from "./Screens/login";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/home' element={ <Home/> } />
          <Route path='/add-customer' element={ <AddCustomer/> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
