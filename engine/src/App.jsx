import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Dashboard from "./screen/dashboard"
import ServerDetails from "./screen/serverDetails"
import AddServer from "./screen/addServer"
import AddEndPoint from "./screen/addendpoint"
import AllChannels from "./screen/allChannels"
import AddChannels from "./screen/addChannels"
import ChannelDetails from "./screen/channelsDetails"
import Login from "./screen/login"
import SignUp from "./screen/signup"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/server-details" element={<ServerDetails />} />
          <Route path="/add-server" element={<AddServer />} />
          <Route path="/add-endpoint" element={<AddEndPoint />} />
          <Route path="/all-channels" element={<AllChannels />} />
          <Route path="/add-channels" element={<AddChannels />} />
          <Route path="/channel-details" element={<ChannelDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
