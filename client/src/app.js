import logo from './logo.svg';
import './App.css';
import React , { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing'; // Adjust the path as necessary
import Navbar from './components/Navbar'; // Import Navbar component
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import History from './components/history';
import Dashboard from './components/dashboard';
import CommonRoomPage from './components/commonRoomPage';
import ConfirmInvitePage from "./commonRoom/confirmInvitePage";

function App() {
  
  return (
    <Router>
      <Navbar  /> 

      <div className="bg-white p-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/common-rooms" element={<CommonRoomPage />} />
          <Route path="/confirm-invite/:roomId" element={<ConfirmInvitePage />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App; 
