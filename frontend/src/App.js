import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import Requests from "./pages/Requests";
import Connections from "./pages/Connections";
import Chat from "./pages/Chat";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/matches" element={<Matches />} />
         <Route path="/requests" element={<Requests />} /> 
        <Route path="/connections" element={<Connections />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
