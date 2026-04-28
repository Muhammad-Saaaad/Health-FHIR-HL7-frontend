import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Home from "./Screens/home"
import AddCustomer from "./Screens/add_customer"
import SignUp from "./Screens/signup";
import Login from "./Screens/login";
import PendingClaims from "./Screens/pendingClaims";
import CheckClaim from "./Screens/check_claim";
import ViewCustomer from "./Screens/viewCustomer";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/home' element={ <Home/> } />
          <Route path='/view-customer' element={ <ViewCustomer/> } />
          <Route path='/add-customer' element={ <AddCustomer/> } />
          <Route path='/all-pending-claims' element={ <PendingClaims/> } />
          <Route path='/claim/:claimId' element={ <CheckClaim/> } /> {/* use :namee when you want to send the value via path*/}
        </Routes>
      </Router>
    </>
  )
}

export default App
