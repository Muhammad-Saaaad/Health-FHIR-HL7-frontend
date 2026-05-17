import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "./screen/dashboard"
import ServerDetails from "./screen/serverDetails"
import AddServer from "./screen/addServer"
import AddEndPoint from "./screen/addendpoint"
import AllChannels from "./screen/allChannels"
import AddChannels from "./screen/addChannels"
import EditChannel from "./screen/editChannel"
import ChannelDetails from "./screen/channelsDetails"
import LogMessage from "./screen/logMessage"
import ViewLogs from "./screen/viewLogs"
import Login from "./screen/login"
import SignUp from "./screen/signup"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/server-details" element={<ServerDetails />} />
          <Route path="/add-server" element={<AddServer />} />

          <Route path="/add-endpoint" element={<AddEndPoint />} />
          <Route path="/logs" element={<ViewLogs />} />
          <Route path="/log-message" element={<LogMessage />} />
          
          <Route path="/all-channels" element={<AllChannels />} />
          <Route path="/add-channels" element={<AddChannels />} />
          <Route path="/edit-channel" element={<EditChannel />} />
          <Route path="/channel-details" element={<ChannelDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
