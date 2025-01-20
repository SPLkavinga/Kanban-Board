import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/LandingPage" element={<LandingPage />} />     
      </Routes>
    </BrowserRouter>
  )
}

export default App
