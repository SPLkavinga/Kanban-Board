import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';
import Projects from "./Pages/Projects";
import TeamPage from "./Pages/TeamPage";

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/TeamPage" element={<TeamPage />} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App
