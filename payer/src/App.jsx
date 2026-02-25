import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./Screens/home"
import AddCustomer from "./Screens/add_customer"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/add-customer' element={ <AddCustomer/> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
